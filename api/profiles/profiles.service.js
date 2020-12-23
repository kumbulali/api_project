const pool = require('../../config/database');

module.exports = {

    getProfileByUserId: (id, callBack) => {
        pool.query(
            'select ad, soyad, bos_gunler, il, ilce, mahalle, yas, boy, kilo from kayitlar where id = ?', [id], (error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results[0]);
            }
        );
    },
    updateProfile: (data, callBack) => {
        pool.query(
            'update kayitlar set ad=?, soyad=?, bos_gunler=?, il=?, ilce=?, mahalle=?, yas=?, boy=?, kilo=? where id=?',[
                data.ad,
                data.soyad,
                data.bos_gunler,
                data.il,
                data.ilce,
                data.mahalle,
                data.yas,
                data.boy,
                data.kilo,
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
    checkAvailability: (id, callBack) => {
        pool.query(
            'select * from kayitlar where id=?', [id],
            (error, results, fields) => {
                if(error){
                    return callBack(null, results[0]);
                }
                return callBack(null,results[0]);
            }
        )
    }

}