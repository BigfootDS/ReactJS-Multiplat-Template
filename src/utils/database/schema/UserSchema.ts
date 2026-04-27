// Mostly based on:
// https://kysely.dev/docs/getting-started
// The SQLocal docs have the UserTable being made as a Type, not an Interface...
// There might be a mismatch in docs that will impact things further down the line.

import type { ColumnType, Generated, Insertable, Selectable, Updateable } from "kysely";

export interface UserTable {
	id: Generated<number>;
	username: string;
	tier: "free" | "premium" | "staff";

	// You can specify a different type for each operation (select, insert and
	// update) using the `ColumnType<SelectType, InsertType, UpdateType>`
	// wrapper. Here we define a column `created_at` that is selected as
	// a `Date`, can optionally be provided as a `string` in inserts and
	// can never be updated:
	created_at: ColumnType<Date, string | undefined, never>
}


// You should not use the table schema interfaces directly. Instead, you should
// use the `Selectable`, `Insertable` and `Updateable` wrappers. These wrappers
// make sure that the correct types are used in each operation.
//
// Most of the time you should trust the type inference and not use explicit
// types at all. These types can be useful when typing function arguments.
export type User = Selectable<UserTable>;
export type NewUser = Insertable<UserTable>;
export type UserUpdate = Updateable<UserTable>;
