const express = require('express')
const { createClient } = require('@vercel/postgres');

const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000

app.use(cors({
    origin: "*", // add chrome estension url
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const client = createClient({
    // connectionString: 'postgres://default:{password}@{host}/{database}',
})

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/add-url', async (req, res) => {
    const { email, url } = req.query;
    try {
        await client.sql`CREATE TABLE IF NOT EXISTS url_tracker (Url varchar(255), email varchar(255));`;
        const data = await client.sql`INSERT INTO url_tracker (Url, email) VALUES (${url}, ${email});`;
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

app.get('/history', async (req, res) => {
    const { search, email } = req.query;
    await client.sql`CREATE TABLE IF NOT EXISTS url_tracker (Url varchar(255), User_id varchar(255));`;
    if (!search) {
        const { rows } = await client.sql`SELECT * from url_tracker WHERE email = ${email};`;
        console.log(rows);
        return res.json(rows);
    } else {
        const { rows } = await client.sql`SELECT * from url_tracker WHERE email=${email} AND Url LIKE ${'%' + search + '%'};`;
        console.log(rows);
        return res.json(rows);
    }
})

client.connect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})