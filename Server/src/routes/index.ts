const {Router} = require('express');
const router = new Router()
const signinTemplateCopy = require('../models/signinModel')
const bcrypt = require('bcrypt')
const session = require('express-session');
const ChatController = require('../api/controllers/chatController')


router.post('/signin', async (req, res) => {
console.log('post!');

    const saltPassword = await bcrypt.genSalt(10)//encrept the password... salt makes every password diffrent
    const securePassword = await bcrypt.hash(req.body.Password, saltPassword)

    const User = signinTemplateCopy
    User.findOne({ userName: req.body.userName }, (err, user) => {
        if (user) { //if user already exist we try to log in
            User.findOne({ userName: req.body.userName }, (err, user) => {
                if (user) {
                    bcrypt.compare(req.body.Password, user.Password, function (error, isMatch) {
                        if (error) {
                            throw error
                        } else if (!isMatch) {
                            console.log("Password doesn't match!")
                        } else {
                            console.log("Password matches!")

                            //do log in
                        }
                    })
                }
            })
        }
        else { // if user does not exist!
            const signedInUser = new signinTemplateCopy({
                userName: req.body.userName,
                Password: securePassword //change to securePassword
            })
  
            signedInUser.save()
                .then(data => { res.json(data) })
                .catch(err => { res.json(err) })
        }
    })
})

// router.post('/messages', async (req, res) => {
//     ChatController.sentMessage.save().then(data => { res.json(data) }).catch(err => { res.json(err) })
// });

//GET home page
router.get("/", function (req, res, next) {
  res.send("It Works!");
});


module.exports = router;
