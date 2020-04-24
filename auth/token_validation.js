const { verify }  = require('jsonwebtoken');

module.exports = {
    checktoken: (req, res, next) => {
        let token = req.get("autorization");

        if(token) {
            token = token.slice(7)
            verify(token, "qwe1234", (error, decoded) => {
                if(error) {
                    res.json({
                        success:0,
                        message: "invalid token"
                    })
                }else {
                    next()
                }
            })
        }
        else {
            res.json({
                success:0,
                message:"access delined!!"
            })
        }
    }
}