/*
Author : Unnat Mistry
Github : https://github.com/unnatmistry
Date : December 2021
*/

const express = require("express");
const mongoose = require('mongoose');
const fs = require("fs");
const { match } = require("assert");
const app = express();
const port = 80;
app.use(express.urlencoded());
const localhost = 'localhost';
// const localhost =  'beelinq.link';


//////////////////////


// Configure mongodb
mongoose.connect(`mongodb://${localhost}/beelinq`, { useNewUrlParser: true, useUnifiedTopology: true });
// Use below in online website
// mongoose.connect(`mongodb://localhost:27017/beelinq`, {"auth":{"authSource":"admin" },"user":YOUR_USERNAME,"pass":YOUR_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (console.error.bind(console, 'connection error:')));



/////////////////////


// Connect to database and database schema
db.once('open', function () {
  console.log("Database connected...");
  isConnected = true;
  const accSchema = new mongoose.Schema({
    date: String,
    email: String,
    password: String
  });

  const withdrawSchema = new mongoose.Schema({
    date: String,
    email: String,
    contactno: String
  });

  const linkSchema = new mongoose.Schema({
    date: String,
    iniLink: String,
    finalLink: String,
    email: String,
    click: Number
  });

  const linkDe = mongoose.model('link', linkSchema);
  const account = mongoose.model('account', accSchema);
  const withdraw = mongoose.model('withdraw', withdrawSchema);

  // EXPRESS SPECIFIC STUFF
  app.use('/static', express.static('static')) // For serving static files

  // PUG SPECIFIC STUFF
  app.set('view engine', 'pug') // Set the template engine as pug
  app.set('views', './views')


  //Mongoose end

  app.use(express.urlencoded());


  ///////////////////


  // get and post websites as per request and response

  app.get('/', (req, res) => {
    // res.status(200).end(home);
    res.status(200).render('home.pug', { 'copyValue': "" });

  })

  app.post('/', (req, res) => {
    let ran = Math.round(Math.random() * 100000000);
    if (req.body.link != "") {

      linkDe.find({ iniLink: req.body.link, email: req.body.email }, function (err, arr) {
        if (arr == "") {
          //   console.log(req.body.email);
          const linkDetails = new linkDe({ date: Date().toString(), iniLink: req.body.link, finalLink: `http://${localhost}/tagId=${ran}`, email: req.body.email, click: 0 });
          linkDetails.save(function (err, fluffy) {
            if (err) return console.error(err);
            // fluffy.speak();
          })
          res.setHeader("Content-Type", "text/html");
          res.status(200).render('home.pug', { 'copyValue': `http://${localhost}/tagId=${ran}` });
        }
        else {
          arr.forEach(function (user) {
            res.status(200).render('home.pug', { 'copyValue': user.finalLink });
          });
        }
      })
    }
  })


  app.get('/login', (req, res) => {
    res.status(200).render('login.pug', { 'error': "" });
  });

  app.get('/newAcc', (req, res) => {
    res.status(200).render('newAcc.pug', { 'error': "" });
  });

  app.get('/payscale', (req, res) => {
    res.status(200).render('payscale.pug');
  });


  app.get('/:tagId', (req, res) => {
    str = `http://${localhost}/${req.params.tagId}`
    linkDe.find({ finalLink: `http://${localhost}/${req.params.tagId}` }, function (err, arr) {
      if (err) {
        res.status(404).send("Page not found...")
      }
      else {
        arr.forEach(function (user) {
          res.status(200).render('blog.pug', { 'goLink': user.iniLink });
        });
      }
    })
  })


  app.get('/:tagId/:uid', (req, res) => {
    if (req.params.uid.split('=')[1] == req.params.tagId.split('=')[1] - 9388492) {

      linkDe.find({ finalLink: `http://${localhost}/${req.params.tagId}` }, function (err, arr) {
        if (err) {
          res.status(404).send("Page not found...")
        }
        else {
          mongoose.set('useFindAndModify', false);
          linkDe.findOneAndUpdate({ finalLink: `http://${localhost}/${req.params.tagId}` },
            { $inc: { 'click': 1 } },
            { new: true },
            function (err, response) {
            });
          arr.forEach(function (user) {
            res.status(200).render('blog2.pug', { 'ahref': user.iniLink });
          });
        }
      })
    }
  })

  app.post('/newAcc', (req, res) => {
    let loginEmail = req.body.email;
    account.find({ email: loginEmail }, function (err, arr) {
      if (req.body.email != req.body.reemail) {
        res.status(200).render('newAcc.pug', { 'error': "Emails don't match..." });
      }
      else if (req.body.password != req.body.repassword) {
        res.status(200).render('newAcc.pug', { 'error': "Passwords don't match..." });
      }


      else if (req.body.email == req.body.reemail && req.body.password == req.body.repassword && arr != "") {
        res.status(200).render('newAcc.pug', { 'error': "Email already exists...Login..." });
      }

      else if (req.body.email == req.body.reemail && req.body.password == req.body.repassword) {
        const accountDetails = new account({ date: Date().toString(), email: req.body.email, password: req.body.password });
        accountDetails.save(function (err, fluffy) {
          if (err) return console.error(err);
        })

        res.status(200).render('newAcc.pug', { 'error': "Successfully Registered...Login..." });
      }
    })
  });

  app.post('/login', (req, res) => {
    let loginEmail = req.body.email;
    let loginpassword = req.body.password;
    let copyVal = req.body.copyVal
    account.find({ email: loginEmail, password: loginpassword }, function (err, arr) {
      if (arr == "") {
        res.status(200).render('login.pug', { 'error': "Invalid email or password..." });
      }
      else {
        let params = "";
        let click = 0;
        let tlinks = 0;
        linkDe.find({ email: loginEmail }, function (err, arr) {
          arr.forEach(function (user) {
            click += user.click;
            tlinks += 1;
          })

          res.status(200).render('afterLogin.pug', { 'email': loginEmail, 'copyValue': copyVal, 'click': click, 'earn': Math.round(click * 0.05 * 100) / 100, 'tlinks': tlinks, 'warning': '' });

        });

        app.post('/afterLogin', (req, res) => {
          let ran = Math.round(Math.random() * 100000000);
          if (req.body.link != "") {

            linkDe.find({ iniLink: req.body.link, email: req.body.email }, function (err, arr) {
              if (arr == "") {
                const linkDetails = new linkDe({ date: Date().toString(), iniLink: req.body.link, finalLink: `http://${localhost}/tagId=${ran}`, email: req.body.email, click: 0 });
                linkDetails.save(function (err, fluffy) {
                  if (err) return console.error(err);
                })
                res.setHeader("Content-Type", "text/html");

                res.status(200).render('afterLogin.pug', { 'copyValue': `http://${localhost}/tagId=${ran}` });
              }
              else {
                arr.forEach(function (user) {

                  res.status(200).render('afterLogin.pug', { 'copyValue': user.finalLink });
                });
              }
            })
          }
        })

        app.post('/withdraw', (req, res) => {
          if (req.body.no != req.body.reno) {
            res.status(200).render('afterLogin.pug', { 'email': loginEmail, 'copyValue': "", 'click': click, 'earn': Math.round(click * 0.05 * 100) / 100, 'tlinks': tlinks, 'warning': "Numbers don't match..." });
          }
          else if (req.body.no == req.body.reno) {

            const withdrawDetails = new withdraw({ date: Date().toString(), email: loginEmail, contactno: req.body.no });
            withdrawDetails.save(function (err, fluffy) {
              if (err) return console.error(err);
            })
            res.setHeader("Content-Type", "text/html");
            res.status(200).render('afterLogin.pug', { 'email': loginEmail, 'copyValue': "", 'click': click, 'earn': Math.round(click * 0.05 * 100) / 100, 'tlinks': tlinks, 'warning': "Response submitted successfully..." });

          }
        })
      }
    });
  });
});


// App listening on port
app.listen(port, () => {
  console.log("We are connected...")
}) 