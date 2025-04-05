import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';
export const historyTable = pgTable('history', {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	Datetime: varchar({ length: 255 }).notNull(),
	Correctness: varchar({ length: 255 }).notNull(),
	TimeTaken: varchar({ length: 255 }).notNull(),
	Notes: varchar({ length: 255 }).notNull(),
	Source: varchar({ length: 255 }).notNull()
});
