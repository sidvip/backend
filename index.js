const express = require('express')
const { Client } = require('pg');

const axios = require('axios');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000

app.use(cors({
    origin: "*", // add chrome estension url
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
const client = new Client({ connectionString: 'postgres://default:lVaf7WMOKJ8Y@ep-soft-bread-a44ca8gy.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require' });
app.get('/add-url', async (req, res) => {
    const { email, url } = req.query;
    try {
        const d = await client.query(`CREATE TABLE IF NOT EXISTS url_tracker (url varchar(255), email varchar(255));`);
        console.log(d);
        const data = await client.query(`INSERT INTO url_tracker (Url, email) VALUES (${url}, ${email});`);
        console.log(data);
        res.send(data || []);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})

app.get('/history', async (req, res) => {
    const { search, email } = req.query;
    const data = await client.query(`CREATE TABLE IF NOT EXISTS url_tracker (url varchar(255), email varchar(255));`);
    console.log(data);
    axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${email}`)
        .then(async (response) => {
            if (!search) {
                const { rows } = await client.query(`SELECT * from url_tracker WHERE email='${response?.data?.email}';`);
                console.log(rows);
                return res.json(rows || []);
            } else {
                const { rows } = await client.query(`SELECT * from url_tracker WHERE email='${response?.data?.email}' AND Url LIKE '${'%' + search + '%'}';`);
                console.log(rows);
                return res.json(rows || []);
            }
        }).catch((error) => {
            console.log(error);
        })
})

app.get('/', (req, res) => {
    res.status(200).send('Backend is up and running ');
})

client.connect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})


module.exports = app;