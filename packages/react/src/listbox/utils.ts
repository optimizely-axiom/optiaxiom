type Option = {
  group?: {
    hidden?: boolean;
    label: string;
    separator?: boolean;
  };
};

export const shouldShowSeparator = (
  group: Option["group"],
  prevItem: Option | undefined,
) => {
  const isFirstItem = !prevItem;
  return (
    !isFirstItem &&
    !isSameGroup(group, prevItem?.group) &&
    (group?.separator || prevItem?.group?.separator)
  );
};

export const shouldShowGroup = (
  group: Option["group"],
  prevItem: Option | undefined,
): group is NonNullable<Option["group"]> => {
  const show = !isSameGroup(group, prevItem?.group);
  return show && !!group && !group.hidden;
};

const isSameGroup = (group1: Option["group"], group2: Option["group"]) => {
  if (group1 === group2) {
    return true;
  }
  return group1?.label === group2?.label;
};
