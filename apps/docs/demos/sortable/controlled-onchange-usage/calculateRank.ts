export function calculateRank(
  data: Array<{ id: string; rank: number }>,
  source: string,
  items: string[],
) {
  const findItemRank = (id: string | undefined, fallbackRank: number) => {
    if (!id) {
      return fallbackRank;
    }

    return data.find((item) => item.id === id)?.rank ?? fallbackRank;
  };

  const newIndex = items.indexOf(source);

  const prevItemRank = findItemRank(items[newIndex - 1], 0);
  const nextItemRank = findItemRank(items[newIndex + 1], 40_000);

  return (prevItemRank + nextItemRank) / 2;
}
