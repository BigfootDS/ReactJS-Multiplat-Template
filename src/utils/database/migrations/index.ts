import { Migration } from "kysely";
import { Migration20260427 } from "./2026-04-27";

export const migrations: Record<string, Migration> = {
	"2026-04-27": Migration20260427
}