const express = require('express')
const { Sequelize } = require('sequelize');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000

const sequelize = new Sequelize('verceldb', 'default', 'lVaf7WMOKJ8Y', {
    host: 'ep-soft-bread-a44ca8gy-pooler.us-east-1.postgres.vercel-storage.com',
    dialect: 'postgres'
});

app.use(cors({
    origin: 'chrome-extension://aobdobofgmceopekcehnnmnbcbjdhkmj',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyparser.json());
app.post('/send-url', async (req, res) => {
    console.log(req.body);
    const a = await sequelize.authenticate();
    res.send('Hello World!');
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})