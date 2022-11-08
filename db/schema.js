const mysql = require('mysql2');
require('dotenv').config();

main();

async function main()
{
    try {
        const db = await mysql.createConnection(
            {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PW
            }
        )
        db.connect();
        console.log("Connected to db");
        db.query("DROP DATABASE IF EXISTS ??", process.env.DB_NAME);
        console.log(`DROPPED IF EXISTS ${process.env.DB_NAME}`);
        db.query("CREATE DATABASE ??", process.env.DB_NAME, () => {
            console.log(`Created Database ${process.env.DB_NAME}`);
            process.exit(0);
        });
    }
    catch(e) {
        console.error(e);
    }
}