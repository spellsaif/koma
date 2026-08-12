
export type SqlType = 
    | "int" | "bigint" | "text" | "varchar" | "boolean" 
    | "timestamp" | "date" | "json" | "uuid" | "real"


export interface Column<TS = unknown> {
   readonly _t: TS;
   readonly sql: SqlType;
   readonly primary: boolean;
   readonly nullable: boolean;
   readonly unique: boolean;
   readonly default?: unknown | (() => unknown);
   readonly references?: {table: string; column: string};
   readonly length?: number; 

}

// helper: type-preserving column factory
function col<TS>(sql: SqlType, extra: Partial<Column<TS>> = {}): Column<TS> {
    return {
        _t: undefined as unknown as TS,
        sql,
        primary: false,
        nullable: false, 
        unique: false,
        ...extra
    };
}

export const nullable= <C extends Column>(c: C): Column<C['_t'] | null> => 
    ({...c, nullable: true, _t: undefined as unknown as C['_t'] | null});


export const primary = <C extends Column>(c: C): C => ({...c, primary: true});
export const unique = <C extends Column>(c: C): C => ({...c, unique: true});

export const defaultTo = <C extends Column> (
    c: C, value: C['_t'] |  (() => C['_t'])
): C => ({...c, default: value});

export const references = <C extends Column> (
    c: C, table: string, column: string
): C => ({...c, references: {table, column}});

// column constructors
export const int = () => col<number>('int');
export const bigint = () => col<bigint>('bigint');
export const real = () => col<number>('real');
export const text      = ()          => col<string>('text');
export const varchar   = (len = 255) => col<string>('varchar', { length: len });
export const bool      = ()          => col<boolean>('boolean');
export const timestamp = ()          => col<Date>('timestamp');
export const date      = ()          => col<Date>('date');
export const uuid      = ()          => col<string>('uuid');
export const json      = <T = unknown>() => col<T>('json');

// table
export interface Table<Name extends string = string, Cols extends Record<string, Column> = Record<string, Column>> {
    readonly name: Name;
    readonly columns: Cols;
}

export function table<Name extends string, Cols extends Record<string, Column>>(
    name: Name, 
    columns: Cols
): Table<Name, Cols> {
    return {name, columns};
}

export type Schema = Record<string, Table>;

export function Schema<S extends Schema>(s: S): S {
    return s;
}

