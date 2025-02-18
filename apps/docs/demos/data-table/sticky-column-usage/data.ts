import { faker } from "@faker-js/faker";

faker.seed(123);

export const data = Array.from({ length: 50 }, (_, index) => ({
  amount: faker.finance.amount(),
  email: faker.internet.email(),
  firstName: faker.person.firstName(),
  id: index + 1,
  jobTitle: faker.person.jobTitle(),
  lastName: faker.person.lastName(),
  username: faker.internet.username(),
}));
