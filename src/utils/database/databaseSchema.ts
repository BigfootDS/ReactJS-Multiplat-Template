import { UserTable } from "./schema/UserSchema";

export interface Database {
	user: UserTable;
}