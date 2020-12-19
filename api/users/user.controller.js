const { 
    create, 
    getUsers, 
    getUserByUserId, 
    getUserByUsername, 
    updateUser,
    deleteUserById, 
    deleteUserByUsername,
    getUserByEmail
} = require("./user.service");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");


module.exports = {
    createUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (err, results)=>{
            if(err != null){
                if(err.errno === 1062){
                return res.json({
                    success: 0,
                    message: "Bu bilgilere ait baska bir kullanici mevcut. Bilgileri kontrol edip tekrar deneyin."
                })
            }
            }
            
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database baglanti hatasi"
                });
            }
            return res.status(200).json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUserId: (req, res) => {
        const id = req.params.id;
        getUserByUserId(id, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Kayit bulunamadi"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserByUsername: (req, res) => {
        const username = req.params.username;
        getUserByUsername(username, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Kayit bulunamadi"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUserByEmail: (req, res) => {
        const email = req.params.email;
        getUserByUsername(email, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Kayit bulunamadi"
                });
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    getUsers: (req,res) => {
        getUsers((err,results)=> {
            if(err){
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    },
    updateUser: (req, res) => {
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateUser(body, (err,results) => {
            if(err){
                console.log(err);
                return;
            }
            if(results.affectedRows === 0){
                return res.json({
                    success: 0,
                    message: "Id bulunamadi"
                });
            }
            return res.json({
                success: 1,
                message: "Basariyla guncellendi"
            });
        });
    },
    deleteUserById: (req, res) => {
        const id = req.params.id;
        deleteUserById(id, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(results.affectedRows === 0){
                return res.json({
                    success: 0,
                    message: "Kayit bulunamadi"
                });
            }
            return res.json({
                success: 1,
                message: "Kullanici basariyla silindi"
            })
        })
    },
    deleteUserByUsername: (req,res) => {
        const username = req.params.username;
        deleteUserByUsername(username, (err, results)=> {
            if(err){
                console.log(err);
                return;
            }
            if(results.affectedRows === 0){
                return res.json({
                    success: 0,
                    message: "Kayit bulunamadi"
                });
            }
            return res.json({
                success: 1,
                message: "Kullanici basariyla silindi"
            })
        })
    },
    login: (req, res) => {
        const body = req.body;
        getUserByEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                success: 0,
                message: "Gecersiz email veya sifre"
                });
            }
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const jsontoken = sign({ result: results }, process.env.PRIVATE_KEY, {
                expiresIn: "1h"
                });
                return res.json({
                success: 1,
                message: "Giris basarili",
                token: jsontoken
                });
            } else {
                return res.json({
                success: 0,
                message: "Gecersiz email veya sifre"
                });
            }
            });
    },

}