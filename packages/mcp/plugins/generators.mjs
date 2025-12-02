import { tokens } from "@optiaxiom/globals";
import { getDocs } from "@optiaxiom/shared";
import { readFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  parseDemosFromFiles,
  parseLightDark,
  parsePropDefinition,
  remToPx,
  toKebabCase,
} from "./parsers.mjs";
import { shouldGenerateScreenshot } from "./screenshots.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @typedef {import('playwright').BrowserContext} BrowserContext
 * @typedef {import('../src/types.js').ComponentInfo} ComponentInfo
 * @typedef {import('../src/types.js').DeprecationInfo} DeprecationInfo
 * @typedef {import('../src/types.js').DesignTokens} DesignTokens
 * @typedef {import('../src/types.js').Guide} Guide
 * @typedef {import('../src/types.js').IconInfo} IconInfo
 * @typedef {import('../src/types.js').Metadata} Metadata
 */

/**
 * @param {BrowserContext} context
 * @returns {Promise<Record<string, ComponentInfo>>}
 */
export async function generateComponents(context) {
  const docs = getDocs();
  /** @type {Record<string, ComponentInfo>} */
  const components = {};

  // First pass: create all component metadata
  for (const doc of docs) {
    const name = doc.displayName.replace("@optiaxiom/react/", "");
    const group =
      "group" in doc.tags && typeof doc.tags.group === "string"
        ? doc.tags.group
        : undefined;

    if ((group || name) === "Listbox") {
      continue;
    }

    const baseDescription =
      doc.description || `${name} component from Axiom Design System`;
    const description = shouldGenerateScreenshot(name)
      ? `${baseDescription}\n\n📸 See the 'usage' example screenshot to visualize how this looks.`
      : baseDescription;

    /** @type {ComponentInfo} */
    const component = {
      description,
      import: `import { ${name} } from '${
        "experimental" in doc.tags
          ? `@optiaxiom/react/unstable`
          : `@optiaxiom/react`
      }';`,
      name,
      props: Object.fromEntries(
        doc.props.map((prop) => [prop.name, parsePropDefinition(prop)]),
      ),
    };

    if ("since" in doc.tags && typeof doc.tags.since === "string") {
      component.since = doc.tags.since;
    }
    if (group) {
      component.group = group;
    }
    if ("category" in doc.tags && typeof doc.tags.category === "string") {
      component.category = doc.tags.category
        .split("\n")
        .map((c) => c.trim())
        .filter(Boolean);
    }
    if ("deprecated" in doc.tags && typeof doc.tags.deprecated === "string") {
      component.deprecated = parseDeprecation(doc.tags.deprecated);
    }

    components[component.name] = component;
  }

  // Second pass: build component groups and set docsUrl
  /** @type {Map<string, string[]>} */
  const componentsByGroup = new Map();

  // Collect all components in each group
  for (const component of Object.values(components)) {
    if (component.group) {
      const groupedComponents = componentsByGroup.get(component.group) ?? [];
      groupedComponents.push(component.name);
      componentsByGroup.set(component.group, groupedComponents);
    }
  }

  // Update components with group information, docsUrl, and inherit "since" and "category" from parent
  for (const component of Object.values(components)) {
    if (component.group) {
      // If this is the primary component (name matches group), add components array
      if (component.name === component.group) {
        component.components = componentsByGroup.get(component.group) || [];
      } else {
        // This is a sub-component, inherit from parent
        const parentComponent = components[component.group];
        if (parentComponent) {
          // Inherit "since" if not defined
          if (parentComponent.since && !component.since) {
            component.since = parentComponent.since;
          }
          // Inherit "category" if not defined
          if (parentComponent.category && !component.category) {
            component.category = parentComponent.category;
          }
        }
      }

      // Set docsUrl to point to the group component
      component.docsUrl = `https://optimizely-axiom.github.io/optiaxiom/components/${toKebabCase(component.group)}`;
    } else {
      // No group, use own name for docsUrl
      component.docsUrl = `https://optimizely-axiom.github.io/optiaxiom/components/${toKebabCase(component.name)}`;
    }
  }

  // Third pass: Parse all component demos in parallel (includes screenshot capture)
  await Promise.all(
    Object.values(components)
      .filter(
        // Only include examples for primary components (no group, or name matches group)
        (component) => !component.group || component.name === component.group,
      )
      .map(async (component) => {
        component.examples = await parseDemosFromFiles(
          // Special case: ToastProvider demos are in "toast" folder
          component.name === "ToastProvider" ? "Toast" : component.name,
          context,
        );
      }),
  );

  return components;
}

/**
 * @returns {Promise<Record<string, Guide>>}
 */
export async function generateGuides() {
  const guidesDir = join(
    __dirname,
    "..",
    "..",
    "..",
    "apps",
    "docs",
    "app",
    "(docs)",
    "guides",
  );

  const guides = [
    {
      name: "getting-started",
      path: join(guidesDir, "page.mdx"),
      title: "Getting Started",
    },
    {
      name: "css-imports",
      path: join(guidesDir, "css-imports", "page.mdx"),
      title: "CSS Imports",
    },
    {
      name: "css-layers",
      path: join(guidesDir, "css-layers", "page.mdx"),
      title: "CSS Layers",
    },
    {
      name: "icons",
      path: join(guidesDir, "icons", "page.mdx"),
      title: "Icons",
    },
  ];

  /** @type {Record<string, Guide>} */
  const result = {};

  for (const guide of guides) {
    const content = await readFile(guide.path, "utf-8");
    result[guide.name] = {
      content: stripMDXComponents(content),
      name: guide.name,
      title: guide.title,
    };
  }

  return result;
}

/**
 * @returns {Promise<Record<string, IconInfo>>}
 */
export async function generateIcons() {
  const iconNames = [
    "IconAgent",
    "IconBoxGear",
    "IconPopOut",
    "IconSparkles",
    "IconSubAgent",
    "IconAlignCenter",
    "IconAlignJustify",
    "IconAlignLeft",
    "IconAlignRight",
    "IconAngleDown",
    "IconAngleRight",
    "IconArrowDown",
    "IconArrowDownAZ",
    "IconArrowDownShortWide",
    "IconArrowDownWideShort",
    "IconArrowDownZA",
    "IconArrowLeft",
    "IconArrowLeftFromLine",
    "IconArrowLeftLong",
    "IconArrowLeftToLine",
    "IconArrowRight",
    "IconArrowRightArrowLeft",
    "IconArrowRightFromBracket",
    "IconArrowRightFromLine",
    "IconArrowRightLong",
    "IconArrowRightSolid",
    "IconArrowRightToBracket",
    "IconArrowRightToLine",
    "IconArrowRotateLeft",
    "IconArrowRotateRight",
    "IconArrowsFromDottedLine",
    "IconArrowsFromLine",
    "IconArrowsLeftRight",
    "IconArrowsMaximize",
    "IconArrowsMinimize",
    "IconArrowsRepeat",
    "IconArrowsRotate",
    "IconArrowsUpDownLeftRight",
    "IconArrowTrendDown",
    "IconArrowTrendUp",
    "IconArrowTurnDownLeft",
    "IconArrowTurnUp",
    "IconArrowUp",
    "IconArrowUpRightFromSquare",
    "IconAsterisk",
    "IconAt",
    "IconBadgePercent",
    "IconBallPile",
    "IconBan",
    "IconBarcode",
    "IconBars",
    "IconBarsSort",
    "IconBarsStaggered",
    "IconBell",
    "IconBellSlash",
    "IconBold",
    "IconBolt",
    "IconBook",
    "IconBookmarkSolid",
    "IconBookOpen",
    "IconBooks",
    "IconBorderAll",
    "IconBorderNone",
    "IconBox",
    "IconBoxArchive",
    "IconBoxesStacked",
    "IconBoxOpen",
    "IconBracketsCurly",
    "IconBriefcase",
    "IconBrowser",
    "IconBrowsers",
    "IconBug",
    "IconBullhorn",
    "IconBullseyePointer",
    "IconCalendar",
    "IconCalendarClock",
    "IconCalendarDays",
    "IconCaretDownSolid",
    "IconCaretUpSolid",
    "IconCartCircleCheck",
    "IconCartMinus",
    "IconCartPlus",
    "IconCartShopping",
    "IconCartShoppingFast",
    "IconChartColumn",
    "IconChartLine",
    "IconChartMixed",
    "IconCheck",
    "IconCheckCircleSolid",
    "IconCheckDouble",
    "IconChevronDown",
    "IconChevronLeft",
    "IconChevronRight",
    "IconChevronUp",
    "IconCircle",
    "IconCircleArrowDown",
    "IconCircleArrowUp",
    "IconCircleCheck",
    "IconCircleCheckSolid",
    "IconCircleChevronDown",
    "IconCircleDollar",
    "IconCircleDot",
    "IconCircleExclamation",
    "IconCircleHalfStrokeSolid",
    "IconCircleInfo",
    "IconCircleMinus",
    "IconCirclePause",
    "IconCirclePlay",
    "IconCirclePlus",
    "IconCircleQuestion",
    "IconCircleSmallSolid",
    "IconCircleSolid",
    "IconCircleStop",
    "IconCircleUser",
    "IconCircleXmark",
    "IconCircleXmarkSolid",
    "IconClipboard",
    "IconClipboardCheck",
    "IconClock",
    "IconClockRotateLeft",
    "IconClone",
    "IconCode",
    "IconCodeBranch",
    "IconColumns3",
    "IconComment",
    "IconCommentPlus",
    "IconComments",
    "IconCopy",
    "IconCube",
    "IconCubes",
    "IconDatabase",
    "IconDesktop",
    "IconDiagramSubtask",
    "IconDiagramVenn",
    "IconDiamond",
    "IconDisplay",
    "IconDollarSign",
    "IconDownload",
    "IconDroplet",
    "IconDSolid",
    "IconEllipsisSolid",
    "IconEllipsisStroke",
    "IconEllipsisStrokeVertical",
    "IconEnvelope",
    "IconEnvelopeOpen",
    "IconEraser",
    "IconExpand",
    "IconEye",
    "IconEyeSlash",
    "IconFacebookF",
    "IconFile",
    "IconFileArrowUp",
    "IconFileChartPie",
    "IconFileExclamation",
    "IconFileExport",
    "IconFileImage",
    "IconFileImport",
    "IconFileLines",
    "IconFilePdf",
    "IconFilePen",
    "IconFilePlus",
    "IconFiles",
    "IconFileSpreadsheet",
    "IconFileVideo",
    "IconFileWord",
    "IconFileZipper",
    "IconFilter",
    "IconFilterSlash",
    "IconFlag",
    "IconFlagPennant",
    "IconFlask",
    "IconFloppyDisk",
    "IconFolder",
    "IconFolderArrowDown",
    "IconFolderBlank",
    "IconFolderBookmark",
    "IconFolderClosed",
    "IconFolderImage",
    "IconFolderOpen",
    "IconFolderPlus",
    "IconFolders",
    "IconFolderTree",
    "IconFolderUser",
    "IconGalleryThumbnails",
    "IconGauge",
    "IconGear",
    "IconGift",
    "IconGlassesRound",
    "IconGlobe",
    "IconGoogle",
    "IconGrid",
    "IconGrid2",
    "IconGrid2Plus",
    "IconGridDividers",
    "IconGrip",
    "IconGripLinesVertical",
    "IconGripVertical",
    "IconHandPointer",
    "IconHashtag",
    "IconHeading",
    "IconHighlighter",
    "IconHorizontalRule",
    "IconHouse",
    "IconHouseBlank",
    "IconHouzz",
    "IconImage",
    "IconImageLandscape",
    "IconImagePortrait",
    "IconImages",
    "IconImageSlash",
    "IconInboxFull",
    "IconInputNumeric",
    "IconInputPipe",
    "IconInputText",
    "IconInstagram",
    "IconItalic",
    "Icon00",
    "Icon360Degrees",
    "IconKey",
    "IconKeySkeletonLeftRight",
    "IconLanguage",
    "IconLaptopMobile",
    "IconLayerGroup",
    "IconLeftToLine",
    "IconLightbulb",
    "IconLineHeight",
    "IconLink",
    "IconLinkedinIn",
    "IconLinkHorizontal",
    "IconLinkHorizontalSlash",
    "IconLinkSlash",
    "IconList",
    "IconListCheck",
    "IconListDropdown",
    "IconListOl",
    "IconListTree",
    "IconListUl",
    "IconLocationDot",
    "IconLock",
    "IconLockOpen",
    "IconMagnifyingGlass",
    "IconMagnifyingGlassMinus",
    "IconMagnifyingGlassPlus",
    "IconMegaphone",
    "IconMemoPad",
    "IconMessageBot",
    "IconMessageLines",
    "IconMessages",
    "IconMobile",
    "IconMoneyBill",
    "IconMoneyCheckPen",
    "IconMonitorWaveform",
    "IconMugHot",
    "IconMusic",
    "IconObjectsAlignBottom",
    "IconObjectsAlignCenterVertical",
    "IconObjectsAlignTop",
    "IconOctagonMinus",
    "IconPaintRoller",
    "IconPanorama",
    "IconPaperclip",
    "IconPaperPlaneTop",
    "IconPaste",
    "IconPause",
    "IconPen",
    "IconPenField",
    "IconPenLine",
    "IconPenSlash",
    "IconPenToSquare",
    "IconPeopleSimple",
    "IconPhone",
    "IconPinterestP",
    "IconPipe",
    "IconPipeSection",
    "IconPlay",
    "IconPlus",
    "IconPresentationScreen",
    "IconPuzzlePiece",
    "IconQuoteRight",
    "IconRectangleList",
    "IconRectangleWide",
    "IconReply",
    "IconRightFromLine",
    "IconRobot",
    "IconRocket",
    "IconRss",
    "IconScissors",
    "IconScrewdriverWrench",
    "IconSearch",
    "IconServer",
    "IconShapes",
    "IconShareNodes",
    "IconShieldCheck",
    "IconShip",
    "IconSidebar",
    "IconSitemap",
    "IconSlider",
    "IconSliders",
    "IconSlidersSimple",
    "IconSnapchat",
    "IconSortSolid",
    "IconSpinner",
    "IconSplit",
    "IconSquare",
    "IconSquareCheck",
    "IconSquareDashed",
    "IconSquarePlus",
    "IconSquarePollHorizontal",
    "IconSquareUser",
    "IconStairs",
    "IconStar",
    "IconStore",
    "IconStrava",
    "IconStrikethrough",
    "IconSubscript",
    "IconSunBright",
    "IconSuperscript",
    "IconTableCells",
    "IconTableLayout",
    "IconTablet",
    "IconTag",
    "IconTerminal",
    "IconText",
    "IconThumbsDown",
    "IconThumbsDownSolid",
    "IconThumbsUp",
    "IconThumbsUpSolid",
    "IconThumbtack",
    "IconThumbtackSolid",
    "IconTiktok",
    "IconTimelineArrow",
    "IconToggleOff",
    "IconToolbox",
    "IconTrashCan",
    "IconTriangleExclamation",
    "IconTruck",
    "IconTruckMedical",
    "IconTSolid",
    "IconTumblr",
    "IconTwitter",
    "IconUnderline",
    "IconUpload",
    "IconUser",
    "IconUserCheck",
    "IconUserGroup",
    "IconUserLock",
    "IconUserPen",
    "IconUserPlus",
    "IconUserRobot",
    "IconUsers",
    "IconUserSlash",
    "IconUserXmark",
    "IconVials",
    "IconVideo",
    "IconVimeoV",
    "IconWavePulse",
    "IconWeibo",
    "IconWeixin",
    "IconWindowRestore",
    "IconXmark",
    "IconYoutube",
  ];

  return Object.fromEntries(
    iconNames.map((name) => [
      name,
      {
        import: `import { ${name} } from '@optimizely/axiom-icons';`,
        name,
      },
    ]),
  );
}

/**
 * @returns {Promise<Metadata>}
 */
export async function generateMetadataFile() {
  const packageJsonPath = join(__dirname, "..", "package.json");
  const packageJson = JSON.parse(await readFile(packageJsonPath, "utf-8"));
  const axiomPackageJson = JSON.parse(
    await readFile(
      join(__dirname, "..", "..", "react", "package.json"),
      "utf-8",
    ),
  );

  return {
    // Use mtime of package.json for deterministic timestamps
    generatedAt: (await stat(packageJsonPath)).mtime.toISOString(),
    generator: {
      name: packageJson.name,
      version: packageJson.version,
    },
    source: {
      package: axiomPackageJson.name,
      version: axiomPackageJson.version,
    },
  };
}

/**
 * @returns {Promise<DesignTokens>}
 */
export async function generateTokens() {
  return {
    borderRadius: Object.fromEntries(
      Object.entries(tokens.borderRadius).map(([token, value]) => [
        token,
        token === "full" ? value : remToPx(value),
      ]),
    ),
    boxShadow: tokens.boxShadow,
    colors: Object.fromEntries(
      Object.entries(tokens.colors)
        .map(([token, value]) => {
          const hex = parseLightDark(value);
          return hex ? [token, hex] : null;
        })
        .filter((entry) => entry !== null),
    ),
    duration: tokens.duration,
    fontFamily: tokens.fontFamily,
    fontSize: Object.fromEntries(
      Object.entries(tokens.fontSize).map(([token, value]) => {
        return [
          token,
          {
            fontSize: remToPx(value.fontSize),
            lineHeight: remToPx(value.lineHeight),
          },
        ];
      }),
    ),
    maxSize: Object.fromEntries(
      Object.entries(tokens.maxSize).map(([token, value]) => [
        token,
        remToPx(value),
      ]),
    ),
    size: Object.fromEntries(
      Object.entries(tokens.size).map(([token, value]) => [
        token,
        remToPx(value),
      ]),
    ),
    zIndex: tokens.zIndex,
  };
}

/**
 * Parse `@deprecated` tag following the pattern:
 *
 * @example
 * "since X.X.X use {@link ComponentName} instead"
 *
 * @param {string} deprecatedTag - The raw deprecated tag value
 * @returns {DeprecationInfo}
 */
function parseDeprecation(deprecatedTag) {
  // Pattern: "since X.X.X use {@link ComponentName} instead"
  const sinceMatch = deprecatedTag.match(/since\s+([\d.]+)/);
  const replacementMatch = deprecatedTag.match(/\{@link\s+(\w+)\s*\}/);

  return {
    replacement: replacementMatch ? replacementMatch[1] : undefined,
    since: sinceMatch ? sinceMatch[1] : deprecatedTag,
  };
}

/**
 * Clean MDX content for better AI consumption
 * @param {string} content
 * @returns {string}
 */
function stripMDXComponents(content) {
  // Remove import statements
  content = content.replace(/^import .+$/gm, "");

  // Remove JSX components that won't make sense to AI
  content = content.replace(/<Cards .+\/>/g, "");
  content = content.replace(/<Steps>/g, "");
  content = content.replace(/<\/Steps>/g, "");
  content = content.replace(/<Heading>/g, "");
  content = content.replace(/<\/Heading>/g, "");

  // Simplify Alert components - keep content but remove JSX
  content = content.replace(/<Alert[^>]*>/g, "\n> **Note:** ");
  content = content.replace(/<\/Alert>/g, "\n");

  // Remove paragraph tags
  content = content.replace(/<p[^>]*>/g, "");
  content = content.replace(/<\/p>/g, "\n");

  // Remove style attributes
  content = content.replace(/style=\{[^}]+\}/g, "");

  // Clean up multiple newlines
  content = content.replace(/\n{3,}/g, "\n\n");

  return content.trim();
}
