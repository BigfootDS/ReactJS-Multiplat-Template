import { Migrator } from "kysely";
import { db } from "./db";

// https://sqlocal.dev/kysely/migrations

export const migrator = new Migrator({
	db,
	provider: {
		async getMigrations() {
			const {migrations} = await import("./migrations/index");
			return migrations;
		}
	}
})