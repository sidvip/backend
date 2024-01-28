const express = require('express')
const { sql, createClient } = require('@vercel/postgres');

const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use(cors({
    origin: 'chrome-extension://aobdobofgmceopekcehnnmnbcbjdhkmj', // add chrome estension url
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const client = createClient({
    // connectionString: 'postgres://default:{password}@{host}/{database}',
})

app.use(bodyparser.json());
app.post('/send-url', async (req, res) => {
    try {
        const data = await client.sql`INSERT INTO history (Url, User_id) VALUES (${req.body.url}, 1);`;
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
})


app.get('/', async (req, res) => {
    const { search } = req.query;
    if (search) {
        return res.redirect(`/search?search=${search}`);
    }
    try {
        const { rows } = await client.sql`SELECT * from history;`;
        res.render('./search.ejs', { rows: rows });
    } catch (err) {
        res.send(err);
    } finally {
        // client.end();
    }
})

app.get('/search', async (req, res) => {
    const { search } = req.query;
    const { rows } = await client.sql`SELECT * from history WHERE Url LIKE ${'%' + search + '%'};`;
    console.log(search);
    res.render('./search.ejs', { rows: rows });
})

client.connect().then(() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
})