const User = require('../models/User');
const bcrypt = require('bcryptjs');
const login = async (req, res) => {
    const { username, password } = req.body;
    
    const user = await User.findOne({
        where: {
            username: username
        }
    });
    if(user){
        const isValid = bcrypt.compareSync(password, user.password);
        if(isValid){
            res.cookie('authkey', `${user.authkey}`, {
                maxAge: 86400 * 1000, 
                httpOnly: true, 
                secure: true
            }).json({
                status: 'success',
                message: 'User logged in successfully',
                user: user
            });
        }else{
            res.json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }
    }else{
        res.json({
            status: 'error',
            message: 'Invalid username or password'
        });
    }
}
module.exports = login;