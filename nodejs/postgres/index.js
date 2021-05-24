import pg from 'pg';
import path from 'path';
import { readFile } from  'fs/promises';

const settings = path.join(__dirname, 'settings.json');

const client = new pg.Client(await readFile(settings));
await client.connect();
const result = await client.query('select * from tm_users');
for (const row of result.rows) {
  console.log(row['name']);
}


