require('dotenv').config({ path: 'variables.env' });

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')
const HTTP_PORT = process.env.PORT || 5000;

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_APP_KEY,
  secret: process.env.PUSHER_APP_SECRET,
  cluster: process.env.PUSHER_APP_CLUSTER,
  encrypted: true,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)
  // Pass to next layer of middleware
  next()
})

//app.set('PORT', process.env.PORT || 5000);

app.post('/Retrospective/New', (req, res) => {
  const payload = req.body;
  pusher.trigger('retro-data', 'content', payload);
    res.sendStatus(200);
});

  app.get('*', (req, res) => {
    
    console.log(__dirname);
    console.log(req);
    console.log(res);
  });

app.listen(HTTP_PORT, err => {
  if (err) {
    console.error(err);
  } else {
    console.log('Listening at ' + HTTP_PORT);
  }
})
