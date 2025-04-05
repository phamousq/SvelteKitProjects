import db from '../../db/db.server';
import { historyTable } from '../../db/schema';

export const load = async () => {
	// Fetch all records from the table
	const records = await db.select().from(historyTable);

	return {
		records
	};
};
