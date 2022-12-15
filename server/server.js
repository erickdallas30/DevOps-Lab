require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const Rollbar = require('rollbar');

const {SERVER_PORT, ROLLBAR_TOKEN} = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// include and initialize the rollbar library with your access token

var rollbar = new Rollbar({
  accessToken: ROLLBAR_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
})

// record a generic message and send it to Rollbar
rollbar.log('Hello world!')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.get('/lab', function(req, res) {
    try {
        fakeFunction()
        res.sendStatus(200)
    }catch(error) {
        rollbar.error('Not existing function call')
        res.sendStatus(400)
    }

})



// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

app.listen(SERVER_PORT, () => console.log(`Server running on Port ${SERVER_PORT}`));