import { Kysely } from 'kysely';
import { SQLocalKysely } from 'sqlocal/kysely';
import { Database } from './databaseSchema';

export const sqlocalDb = new SQLocalKysely('database.sqlite3');

export const db = new Kysely<Database>(
	{ 
		dialect: sqlocalDb.dialect
	}
);