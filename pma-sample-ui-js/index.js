const fs = require('fs')
const https = require('https')
const express = require('express');
const app = express();

const server = https.createServer({
        key: fs.readFileSync(`${__dirname}/key.pem`),
        cert: fs.readFileSync(`${__dirname}/cert.pem`),
    }, app);


app.use(express.static('public'))
server.listen(3000, (err) => {
    if(err) {
        console.error(`exiting because: ${err.message}`);
        process.exit(1)
    }

    console.log('listening on 3000');
})