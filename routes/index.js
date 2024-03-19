'use strict';
const { Console } = require('console');
var express = require('express');
const fs = require('fs');
var router = express.Router();

router.get('/', function (req, res) {
    const readFile = fs.readFileSync('\contacts.json', 'utf8');
    const parsedData = JSON.parse(readFile);
    res.render('index', { contacts: parsedData});
  
});

const urlencodedParser = express.urlencoded({extended: false});

router.get('/Add', function (req, res) {
    const readFile = fs.readFileSync('\contacts.json', 'utf8');
    const parsedData = JSON.parse(readFile);
    res.render('Add', { contacts: parsedData});
  
});

router.get('/Update', function (req, res) {
    const readFile = fs.readFileSync('\contacts.json', 'utf8');
    const parsedData = JSON.parse(readFile.toString());
    
    let oldUser = parsedData.find(item => item.id == req.query.id);
    res.render('Update', { contacts: parsedData, oldUser : oldUser});
  
});

router.post('/Update',urlencodedParser, function (req, res) {
    const readFile = fs.readFileSync('\contacts.json', 'utf8');
    const parsedData = JSON.parse(readFile);
    console.log(req.body);

    for (var i = 0; i < parsedData.length; i++) {
        if (parsedData[i].id == req.body.id) {
            parsedData[i].name = req.body.name;
            parsedData[i].phone = req.body.phone;
        }
      }

    fs.writeFileSync('\contacts.json', JSON.stringify(parsedData));

    res.redirect('/');
  
});


router.post('/Delete',urlencodedParser, function (req, res) {
    const readFile = fs.readFileSync('\contacts.json', 'utf8');
    const parsedData = JSON.parse(readFile);
    console.log(req.body);

    let newObject = parsedData.filter(obj => obj.id != req.body.id)
    newObject = JSON.stringify(newObject);
    fs.writeFileSync('\contacts.json', newObject);
    res.redirect('/');
  
});

router.post('/Add', urlencodedParser, function (req, res) {
    if(!req.body) return res.sendStatus(400);

    const readFile = fs.readFileSync('\contacts.json', 'utf8');
    const parsedData = JSON.parse(readFile);
    const contacts = parsedData;
    const newId = contacts[contacts.length - 1].id + 1;

    const newContact = {
        id: newId,
        name: req.body.userName,
        phone: req.body.phone
    };

    contacts.push(newContact);

    fs.writeFile('\contacts.json', JSON.stringify(contacts, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(err);
            return;
        }
    });
 
    res.redirect('/');
});
module.exports = router;
