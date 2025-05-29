import { faker } from "@faker-js/faker";

faker.seed(123);

export const data = Array.from({ length: 5 }, (_, index) => ({
  amount: faker.finance.amount(),
  id: index + 1,
  name: faker.person.fullName(),
}));
