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

// GET request - Display the Edit page
router.get('/edit/:id',(req, res, next) => {
    let id = req.params.id;
    
    contactModel.findById(id, (err, contactObject) => {
        if(err){
            console.log(err);
            res.end(err);
        }else
        {
            console.log("DB Instance "+ contactObject);
            // Show Edit Page 
            res.render('contacts/edit', {
                title : 'Edit Contact',
                contact: contactObject
                
            })
        }
    })
// POST request - Update the databse from the data from the Edit Page 
router.post('/edit/:id', (req, res, next) => {
    let id = req.params.id;

    let updateContact = contactModel({
        "_id" : id,
        "firstName": req.body.FirstNameTextField,
        "lastName": req.body.LastNameTextField,
        "age": req.body.AgeTextField
    })

    contactModel.update({_id: id }, updateContact, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/contact-list');
        }
    })
})
})
// GET request to perform the delete action


router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
    // console.log("Del ID => " +id);

    contactModel.remove({_id : id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/contact-list');
        }
    })
})
module.exports = router;