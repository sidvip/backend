const express = require('express')
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express()
const port = 8000

app.use(cors({
    origin: 'chrome-extension://aobdobofgmceopekcehnnmnbcbjdhkmj',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

app.use(bodyparser.json());
app.post('/send-url', (req, res) => {
    console.log(req.body);
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})