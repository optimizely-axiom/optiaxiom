import { faker } from "@faker-js/faker";

export const data = Array.from({ length: 50 }, (_, index) => ({
  amount: faker.finance.amount(),
  firstName: faker.person.firstName(),
  id: index + 1,
  lastName: faker.person.lastName(),
}));
