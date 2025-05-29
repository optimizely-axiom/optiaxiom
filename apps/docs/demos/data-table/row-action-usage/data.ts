import { faker } from "@faker-js/faker";

faker.seed(123);

export const data = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  modified_at: faker.date.recent(),
  modified_by: faker.person.fullName(),
  name: faker.commerce.department() + " - " + faker.commerce.productName(),
}));
