const {register} = require('../Controllers/usersControler');
const {login} = require('../Controllers/usersControler');
const {setAvatar} = require('../Controllers/usersControler');
const {getAllUsers} =  require('../Controllers/usersControler');

const router = require('express').Router();

router.post('/register',register)
router.post('/login',login)
router.post("/setavatar/:id", setAvatar);
router.get('/allusers/:id',getAllUsers)

module.exports = router;