import { faker } from "@faker-js/faker";

faker.seed(123);

export const data = Array.from({ length: 10 }, (_, index) => ({
  amount: faker.finance.amount(),
  firstName: faker.person.firstName(),
  id: index + 1,
  lastName: faker.person.lastName(),
}));
