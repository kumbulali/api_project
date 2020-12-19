const pool = require('../../config/database');

module.exports={
    create: (data, callBack) => {
        pool.query(
            'insert into kayitlar(username, email, password) values(?,?,?)',[
                data.username,
                data.email,
                data.password
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUsers: callBack => {
        pool.query(
            'select id, username, email, reg_date from kayitlar',[],(error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByUserId: (id, callBack) => {
        pool.query(
            'select id, username, email, reg_date from kayitlar where id = ?', [id], (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    getUserByUsername: (username, callBack) => {
        pool.query(
            'select id, username, email, reg_date from kayitlar where username = ?', [username], (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateUser: (data, callBack) => {
        pool.query(
            'update kayitlar set username=?, email=?, password=? where id=?',[
                data.username,
                data.email,
                data.password,
                data.id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUserById: (id, callBack) => {
        pool.query(
            'delete from kayitlar where id=?',[
                id
            ],
            (error, results, fields)=> {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    deleteUserByUsername: (username,callBack) => {
        pool.query(
            'delete from kayitlar where username=?',[
                username
            ],
            (error, results, fields)=> {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getUserByEmail: (email, callBack) => {
        pool.query(
        `select * from kayitlar where email = ?`,
        [email],
        (error, results, fields) => {
            if (error) {
            callBack(error);
            }
            return callBack(null, results[0]);
        }
        );
    },
};