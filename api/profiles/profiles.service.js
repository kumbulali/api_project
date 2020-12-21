const pool = require('../../config/database');

module.exports = {

    create: (data, callBack) => {
        pool.query(
            'insert into profiller(user_id, ad, soyad, bos_gunler, il, ilce, mahalle, yas, boy, kilo) values(?,?,?,?,?,?,?,?,?,?)',[
                data.user_id,
                data.ad,
                data.soyad,
                data.bos_gunler,
                data.il,
                data.ilce,
                data.mahalle,
                data.yas,
                data.boy,
                data.kilo
            ],
            (error, results, fields) => {
                if (error) {
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    getProfileByUserId: (user_id, callBack) => {
        pool.query(
            'select ad, soyad, bos_gunler, il, ilce, mahalle, yas, boy, kilo from profiller where user_id = ?', [user_id], (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateProfile: (data, callBack) => {
        pool.query(
            'update profiller set ad=?, soyad=?, bos_gunler=?, il=?, ilce=?, mahalle=?, yas=?, boy=?, kilo=? where user_id=?',[
                data.ad,
                data.soyad,
                data.bos_gunler,
                data.il,
                data.ilce,
                data.mahalle,
                data.yas,
                data.boy,
                data.kilo,
                data.user_id
            ],
            (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            }
        );
    },
    checkAvailability: (user_id, callBack) => {
        pool.query(
            'select * from kayitlar where id=?', [user_id],
            (error, results, fields) => {
                if(error){
                    return callBack(null, results[0]);
                }
                return callBack(null,results[0]);
            }
        )
    }

}