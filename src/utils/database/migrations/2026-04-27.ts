import type { Kysely, Migration } from "kysely";

export const Migration20260427: Migration = {
	async up(db: Kysely<any>){
		await db.schema.createTable("user")
		.addColumn("id", "integer", (cb) => cb.primaryKey().autoIncrement())
		.addColumn("username", "text", (cb) => cb.notNull().unique())
		.addColumn("tier", "text", (cb) => cb.notNull())
		.execute();
	},
	async down(db: Kysely<any>){
		await db.schema.dropTable("user").execute();
	}
}