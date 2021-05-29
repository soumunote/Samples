const { Pool, Client } = require('pg');
const path = require('path');
const { readFile } = require('fs/promises');

(async () => {
  
  const settings = JSON.parse(await readFile(path.join(__dirname, 'settings.json'), 'utf8'));

  const client = new Client(settings);
  await client.connect();

  const result = await client.query('select * from tm_user');
  for (const row of result.rows) {
    console.log(row['name']);
  }

})();
