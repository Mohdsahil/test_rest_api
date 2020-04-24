const { create, havanaccount, getUsers, getUserByUserId, deleteUser, updateUser, getUserByUserEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync}  = require('bcrypt');  
const { sign } = require('jsonwebtoken');

module.exports = {

    createUser: (req,res) => {

        const body= req.body
       
        const salt = genSaltSync(10)
        body.password = hashSync(body.password,salt)


        havanaccount(body,(error,result) => {

            if(error) {
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message:"Database connection error"
                })
            }
            if(result[0].total>0) {
               
               return res.status(200).json({
                    success: 0,
                    message: "already have an account on this email"
                })
            } else {
                create(body, (err,results) => {
                    if(err) {
                        console.log(err)
                        return res.status(500).json({
                            success:0,
                            message: "Database connection error"
                        })
                    }
                    
                    return res.status(200).json({
                        success:1,
                        data:results
                    }
                    )
                })
            }
            
        })
        
        
    },

    getUserByUserId: (req, res) => {
        const id = req.params.id;

        getUserByUserId(id, (error, result) =>{
            if(error)  {
                console.log(error)
               return res.status(500),json({
                    success: 0,
                    message: "Some internel error try again later."
                })   
            }
            if(!result) {
             return   res.status(200).json({
                    success:1,
                    message: "Record not found"
                })
            }
            return res.status(200).json({
                success:1,
                data: result
            })

        })
    },

    getUsers: (req, res) => {
        getUsers((error, result) => {
            if(error) {
                console.log(error) 
                return res.status(500).json({
                    success:0,
                    message: "some internel error"
                })
            }
            return res.status(200).json({
                success:1,
                message: result
            })
        })
    },

    updateUser: (req, res) => {
        const body = req.body
        const salt = genSaltSync(10)
        body.password = hashSync(body.password, salt)
        updateUser(body, (error, result) =>{
            if(error) {
                console.log(error)
                return res.status(500).json({
                    success:0,
                    message: "Internel Error"
                })
            }
            if(!result) {
                return res.status(200).json({
                    success:0,
                    message:"faild to update user"
                })
            }
            return res.status(500).json({
                success:1,
                message: "successfully upate"
            })
        })
    },

    deleteUser: (req, res) => {
        const body = req.body
        deleteUser(body, (error, result) =>{
            if(error) {
                console.log(error)
                return res.status(500).json({
                    success: 0,
                    message: "internet error"
                })
            }
            if(!result) {
                return res.status(200).json({
                    success:1,
                    message: "record not found"
                })
            }
            return res.status(200).json({
                success:1,
                message: " user deleted successfully"
            })
        })
    },

    login: (req, res) => {
        const body = req.body
        getUserByUserEmail(body.email,(error, result) => {
            if(error) {
                console.log(error)
            }
            if(!result) {
                return res.json({
                    success:0,
                    message: "invalid email or password"
                })
            }
            const results = compareSync(body.password, result.password)
            if(results) {
                result.password = undefined
                const jsontoken = sign({results: result}, "qwe1234", {
                    expiresIn:"1h"
                })
                return res.json({
                    success: 1,
                    message: "login successfully",
                    token: jsontoken
                })
            }else {
                return res.json({
                    success:0,
                    message: "invali email or password"
                })
            }

        })

    }
};