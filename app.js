const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "cricketMatchDetails.db");

const app = express();

app.use(express.json());

const initializeDb = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () =>
      console.log("Server Runing at http://localhost:3000/")
    );
  } catch (error) {
    console.log(`DB error: ${error.message}`);
  }
};

initializeDb();

app.get("/create/", async (request, response) => {
  const create = `
    create table todo (
        id integer,
        todo varchar(250),
        priority varchar(10),
        status varchar(20)
    ) 
    `;
  console.log("Executed");
  await db.run(create);
  response.send("table creates");
});

app.get("/insert/", async (request, response) => {
  const insert = `
   insert into todo (id, todo, priority, status)
    values (1, "Watch Movie", "LOW", "TO DO")
   `;

  await db.run(insert);
  response.send("done");
});

app.get("/getdetails", async (request, response) => {
  const getQuery = `
    select * from todo;`;

  const val = db.all(getQuery);
  response.send(val);
});
