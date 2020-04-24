const pool = require('../../config/database')

module.exports = {

    havanaccount: (data, backcall) => {
        pool.query(`select count(*) as total from registration where email="${data.email}"`, (error,result,fields)=>{
            if(error){
                console.log(error)
                return backcall(error)
            }
            
            return backcall(null,result)

        })
    },

    create: (data, callBack) => {
        
        pool.query(
            `insert into registration (firstName,lastName,gender,email,password,number) values(?,?,?,?,?,?)`
        ,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number
        ],
        (error,result,fields) => {
            if(error) {
                console.log(error)
               return callBack(error)
            }
            return callBack(null, result)
        })
    },

    getUsers: callBack => {
        pool.query(`select id,firstName,lastName,gender,email,number from registration`, 
        [],
        (err,result,fields) =>{
            if(err){
                console.log(err)
                return callBack(err)
            }
            return callBack(null, result)  
        })
    },

    getUserByUserId: (id, callBack) =>{
        pool.query(`select id,firstName,lastName,gender,email,number from registration where id=?`,
        [id],
        (err,result,fields) =>{
            if(err){
                console.log(err)
               return callBack(err)
            }
            return callBack(null,result[0])
        })
    },

    updateUser: (data, callBack) => {
        pool.query(`update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
        [
            data.first_name,
            data.last_name,
            data.gender,
            data.email,
            data.password,
            data.number,
            data.id
        ],
        (err,result,fields) => {
            if(err) {
                console.log(err)
                return callBack(err)
            }
            return callBack(null,result)
        }
        )
    },

    deleteUser: (data, callBack) => {
        pool.query(`delete from registration where id = ?`,
            [data.id],
            (err, result, fields) => {
                if(err) {
                    console.log(err)
                    return callBack(err)
                }
                return callBack(null, result)
            }
            )
    },

    getUserByUserEmail: (email, callBack) => {
        pool.query(`select * from registration where email = ?`,
        [email],
        (err, result, fields) => {
            if(err) {
                callBack(err)
            }
            return callBack(null, result[0])
        }
        )
    }
}