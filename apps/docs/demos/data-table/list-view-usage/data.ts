export type Item = {
  id: number;
  name: string;
  owner: string;
  status: "Draft" | "Ready";
};

const owners = ["Ada Lovelace", "Grace Hopper", "Alan Turing"];

export const data: Item[] = Array.from({ length: 24 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  owner: owners[index % owners.length],
  status: index % 3 === 0 ? "Draft" : "Ready",
}));
