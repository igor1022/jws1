const express = require('express');
const mongoose = require('mongoose');
const db = require('./db');
const jws = require('jws');
const fs = require('fs-extra');
const server = express();
const RegisterModel = require('./models/Register');

const PORT = process.env.PORT || 3000;

const multer  = require("multer");
server.use(express.static('./public'));
var cookieParser = require('cookie-parser');
const { json } = require('express');
server.set('view engine', 'ejs');
server.set('views', './views');
const upload = multer({dest:'./uploads/'});

server.use(cookieParser('fdsaaaaaafdsfa'));

const autorize = { 
  uname: 'admin', 
  psw: '123',
  id: 27
};
const getPrivatKey = async () => {
  const privKey = await fs.readFile(`${__dirname}/priv.key`, 'utf-8');
  return privKey; 
}

const getPublicKey = async () => {
  const publicKey = await fs.readFile(`${__dirname}/pub.key`, 'utf-8');
  return publicKey; 
}

const createtoken = async (str) => {
  const privKey = await getPrivatKey();
  const signature = jws.sign({
      header: { alg: 'RS256' },
      payload: str,
      secret: privKey,
    });
  return signature;
}

server.get('/login', (req, res, next) => {
  res.render('login');
});

server.get('/register', (req, res, next) => {
  res.render('register');
});

server.post('/getLogin',  upload.none(), async (req, res, next) => {
    
    console.log(req.body);

    const doc = await RegisterModel.findOne({username: req.body.uname, password: req.body.psw});
    if (doc) {
      const token = await createtoken(`${req.body.uname}:${req.body.psw}`);
      console.log(token);
      res.cookie('authorize', token);
      res.send('ok');
      return;
    }
    res.send('not ok');
})

server.post('/sendregister', upload.none(), async(req, res, next) => {
  console.log(req.body);
  const doc = await RegisterModel.create({
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.uname,
    email: req.body.email,
    password: req.body.psw,
  });
})

const is_record = async (login, password) => {
  const doc = await RegisterModel.findOne({username: login, password: password});
  if (doc) {
    return true;
  }
  return false;
}

server.get('/', (req, res, next) => {
    const str = jws.decode(req.cookies.authorize);
    if (!str) {
      res.redirect('/login');
    }
    const arr = str.payload.split(':');
    console.log(arr);
    if (!is_record(arr[0], arr[1])) {
      res.redirect('/login');
    }
    res.render('main');
});

server.use('*', (req, res) => {
    res.render('not_found');
})

console.log(PORT);

server.listen(PORT);