import { faker } from "@faker-js/faker";

faker.seed(123);

const itemsByGroup = Array.from({ length: 2 }, (_, i) =>
  Array.from({ length: 2 }, (_, j) => ({
    amount: faker.finance.amount(),
    id: `${i + 1}.${j + 1}`,
    items: [],
    name: faker.commerce.productName(),
  })),
);

export const data = Array.from({ length: itemsByGroup.length }, (_, index) => ({
  amount: itemsByGroup[index]
    .reduce((acc, item) => acc + Number(item.amount), 0)
    .toFixed(2),
  id: `${index + 1}`,
  items: itemsByGroup[index],
  name: faker.commerce.department(),
}));
