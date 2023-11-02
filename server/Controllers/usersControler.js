const Users  = require('../Model/usersModel') ;
const bcrypt = require('bcrypt');
 
 module.exports.register = async (req,res,next) => {
try{
   const {username , email , password} = req.body ;

   const usernameCheck = await Users.findOne({ username })
   if(usernameCheck){
     res.json({msj :'the username is already used',status : false })
   }
   const emailCheck = await Users.findOne({ email })
   if(emailCheck){
     res.json({msj :'the email is already used',status : false })
   }
   const hashedPssword = await bcrypt.hash(password,10);
  
   const user = new Users({
     username,
     email,
     password : hashedPssword
   })
  await user.save()
  delete user.password;
  return res.json({ status: true, user });
}catch(ex){
   next(ex);
}
 }
 
 module.exports.login = async (req,res,next) => {
   try{
      const {username , password} = req.body ;
   const user = await Users.findOne({ username })
   if(!user)
      res.json({msj :'Incorrect password or username ',status : false })
   
   const isPsswordValid = await bcrypt.compare(password , user.password );
   if(!isPsswordValid)
      res.json({msj :'Incorrect password or username ',status : false })

   delete user.password;
   return res.json({ status: true, user });
   }catch(ex){
      next(ex);
   }
 }
 module.exports.setAvatar = async (req, res, next) => {
   try {
     const userId = req.params.id;
     const avatarImage = req.body.image;
     const userData = await Users.findByIdAndUpdate(
       userId,
       {
         isAvatarImageSet: true,
         avatarImage,
       },
       { new: true }
     );
     return res.json({
       isSet: userData.isAvatarImageSet,
       image: userData.avatarImage,
     });
   } catch (ex){
     next(ex);
   }
 };

 module.exports.getAllUsers = async (req, res, next) => {
   try{
      const users = await Users.find({_id :{$ne :req.params.id }}).select([
         "_id","username","email","avatarImage"
      ])
      return res.json(users);
   }catch(err){
      console.log(err);
      next();
   }
   
 }