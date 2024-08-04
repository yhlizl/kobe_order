import { initDb } from '../../utils/db';

export default async function handler(req: any, res: any) {
  try {
    await initDb();
    res.status(200).send('Database initialized');
  } catch (err) {
    console.error('Failed to initialize database:', err);
    res.status(500).send('Failed to initialize database');
  }
}
