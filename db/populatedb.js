const { Client } = require('pg');
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
username VARCHAR (255),
message VARCHAR (1000),
date VARCHAR (800)
);

INSERT INTO messages (username, message, date) 
VALUES 
('User 1', 'Test Message 1', '${new Date()}'),
('User 2', 'Test Message 2', '${new Date()}'),
('User 3', 'Test Message 3', '${new Date()}');
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString:
      'postgresql://earl:ahuur2Z1d2aBEJG0WipV2Mj5P1FfBaMn@dpg-d87ce5cm0tmc739ovnfg-a.oregon-postgres.render.com/messagedb_lwfe',
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  const { rows } = await client.query('SELECT * FROM messages');
  await client.end();
  console.log(rows);
  console.log('done');
}

async function deleteMessages() {
  console.log('deleting...');
  const client = new Client({
    connectionString:
      'postgresql://earl:ahuur2Z1d2aBEJG0WipV2Mj5P1FfBaMn@dpg-d87ce5cm0tmc739ovnfg-a.oregon-postgres.render.com/messagedb_lwfe',
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query('DROP TABLE messages');
  await client.end();
  console.log('done');
}

main();
// deleteMessages();
