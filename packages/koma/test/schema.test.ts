import { describe, expect, it } from "vitest";
import {int, nullable, primary, table, text} from './../src/schema'

describe("schema", () => {
    it("create an integer column", () => {
        const column = int()

        expect(column.sql).toBe('int')
        expect(column.primary).toBe(false)
        expect(column.unique).toBe(false)
        expect(column.nullable).toBe(false)
    })

    it('creates a text column', () => {
    const column = text();

    expect(column.sql).toBe('text');
  });

  it('marks a column as primary', () => {
    const column = primary(int());

    expect(column.primary).toBe(true);
    expect(column.sql).toBe('int');
  });

  it('marks a column as nullable', () => {
    const column = nullable(int());

    expect(column.nullable).toBe(true);
    expect(column.sql).toBe('int');
  });

  it('creates a table', () => {
    const users = table('users', {
      id: primary(int()),
      name: text(),
    });

    expect(users.name).toBe('users');
    expect(users.columns.id.sql).toBe('int');
    expect(users.columns.id.primary).toBe(true);
    expect(users.columns.name.sql).toBe('text');
  });
})