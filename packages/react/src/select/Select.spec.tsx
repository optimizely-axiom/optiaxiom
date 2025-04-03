import { describe, it } from "vitest";

import { Select } from "./Select";

const fakeState = <T,>(initialState: T) =>
  [initialState, (_: T) => {}] as const;

describe("Select component", () => {
  it("should value types correctly for string items", async () => {
    const languages = ["Bangla", "English"];

    const [numberValue, setNumberValue] = fakeState<number>(1);
    const [stringValue, setStringValue] = fakeState<string>(languages[0]);

    <>
      {/* 📁 string */}

      {/* ✅ should pass */}
      <Select
        items={languages}
        itemToValue={(language) => language}
        onValueChange={setStringValue}
        value={stringValue}
      />

      {/* ✅ should pass */}
      <Select
        items={languages}
        onValueChange={setStringValue}
        value={stringValue}
      />

      {/* 📁 number */}

      {/* ❌ should fail */}
      <Select
        items={languages}
        itemToValue={(language) => language}
        // @ts-expect-error -- value must be string
        onValueChange={setNumberValue}
        // @ts-expect-error -- value must be string
        value={numberValue}
      />

      {/* ❌ should fail */}
      <Select
        items={languages}
        // @ts-expect-error -- value must be string
        onValueChange={setNumberValue}
        // @ts-expect-error -- value must be string
        value={numberValue}
      />
    </>;
  });

  it("should value types correctly for const string items", async () => {
    const languages = ["Bangla" as const, "English" as const];

    const [stringValue, setStringValue] = fakeState<string>(languages[0]);
    const [constValue, setConstValue] = fakeState<"Bangla" | "English">(
      languages[0],
    );

    <>
      {/* 📁 const */}

      {/* ✅ should pass */}
      <Select
        items={languages}
        itemToValue={(language) => language}
        onValueChange={setConstValue}
        value={constValue}
      />

      {/* ✅ should pass */}
      <Select
        items={languages}
        onValueChange={setConstValue}
        value={constValue}
      />

      {/* 📁 string */}

      {/* ❌ should fail */}
      <Select
        items={languages}
        itemToValue={(language) => language}
        onValueChange={setStringValue}
        // @ts-expect-error -- value must match item
        value={stringValue}
      />

      {/* ❌ should fail */}
      <Select
        items={languages}
        onValueChange={setStringValue}
        // @ts-expect-error -- value must match item
        value={stringValue}
      />
    </>;
  });

  it("should value types correctly for object items", async () => {
    type Book = {
      author: string;
      disabled: boolean;
      id: string;
      title: string;
    };

    const books = [
      {
        author: "Harper Lee",
        disabled: false,
        id: "book-1",
        title: "To Kill a Mockingbird",
      },
      {
        author: "Lev Tolstoy",
        disabled: false,
        id: "book-2",
        title: "War and Peace",
      },
    ];

    const [stringValue, setStringValue] = fakeState<string>(books[0].id);
    const [bookValue, setBookValue] = fakeState<Book>(books[0]);

    <>
      {/* 📁 string */}

      {/* ✅ should pass */}
      <Select
        items={books}
        itemToValue={(book) => book.id}
        onValueChange={setStringValue}
        value={stringValue}
      />

      {/* ❌ should fail */}
      <Select
        items={books}
        // @ts-expect-error -- value must be string
        itemToValue={(book) => book}
        onValueChange={setStringValue}
        value={stringValue}
      />

      {/* ❌ should fail */}
      {/* @ts-expect-error -- value defaults to Book */}
      <Select
        items={books}
        onValueChange={setStringValue}
        value={stringValue}
      />

      {/* 📁 Book */}

      {/* ❌ should fail */}
      <Select
        items={books}
        itemToValue={(book) => book.id}
        // @ts-expect-error -- value must be string
        onValueChange={setBookValue}
        // @ts-expect-error -- value must be string
        value={bookValue}
      />

      {/* ❌ should fail */}
      <Select
        items={books}
        // @ts-expect-error -- value must be string
        itemToValue={(book) => book}
        // @ts-expect-error -- value must be string
        onValueChange={setBookValue}
        // @ts-expect-error -- value must be string
        value={bookValue}
      />

      {/* ❌ should fail */}
      <Select
        items={books}
        // @ts-expect-error -- value must be string
        onValueChange={setBookValue}
        // @ts-expect-error -- value must be string
        value={bookValue}
      />
    </>;
  });
});
