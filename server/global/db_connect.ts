const mysql = require("mysql");

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "catalog_onliner",
});

// Connect to the MySQL database
db.connect((err: Error) => {
  if (err) {
    throw err;
  }
  console.log("MySQL connected");
});

module.exports = {
  db,
};
