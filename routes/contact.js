let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// create a reference to the db schema
let contactModel = require('../models/contact');

/* GET Contact List page - READ Operation */
router.get('/', (req, res, next) =>{
    contactModel.find((err, contactList) => {
        if(err) {
            return console.error(err);
        }
        else {
           // console.log(contactList);

            res.render('contacts/index', {
                title: 'Contact List',
                contactList: contactList
            });
            
        }
    });
});

/* Get Route for the Add Page
*/
router.get('/add', (req,res,nexr) => {
    res.render('contacts/add',{
        title : 'Add New Contact'
    })
});


// POST route for processing the Add Page 
router.post('/add',(req, res, next) => {
    // console.log(req.body.FirstNameTextField);
    let newContact = contactModel({
        "firstName": req.body.FirstNameTextField,
        "lastName": req.body.LastNameTextField,
        "age": req.body.AgeTextField
    })

    contactModel.create(newContact, (err, contactModel) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            // refresh the contact page 
            res.redirect('/contact-list');
        }
    })
});

module.exports = router;