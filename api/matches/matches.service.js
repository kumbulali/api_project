const pool = require('../../config/database');

module.exports = {

    create: (callBack) => {
        pool.query('INSERT INTO maclar(mac_tarih) values(default);',[],(error,results)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null, results);
        });
    },
    insertMacOyuncu: (data, mac_id, callBack)=> {
        
        for (i in data.takim1){
            pool.query('INSERT INTO mac_oyuncu(mac_id, user_id, takim) values(?,?,1);',[mac_id,data.takim1[i]],(error,results)=>{
                if(error){
                    return callBack(error);
                }
            });
        }
        for (i in data.takim2){
            pool.query('INSERT INTO mac_oyuncu(mac_id, user_id, takim) values(?,?,2);',[mac_id,data.takim2[i]],(error,results)=>{
                if(error){
                    return callBack(error);
                }
            });
        }
        return null;

    },
    updateMacVeri: (data, callBack) => {
        pool.query('update maclar set mac_skor1=?, mac_skor2=?, mac_kazanan=? where mac_id=?',
        [   
            data.mac_skor1,
            data.mac_skor2,
            data.mac_skor1>data.mac_skor2?1:data.mac_skor2>data.mac_skor1?2:0,
            data.mac_id,
        ],(error, results, fields) => {
                if(error){
                    return callBack(error);
                }
                return callBack(null, results);
            });
    },
    getMatchInfo: (mac_id, callBack) => {
        pool.query('SELECT maclar.mac_id,mac_tarih,mac_skor1,mac_skor2,mac_kazanan,takim,GROUP_CONCAT(DISTINCT username) AS oyuncular FROM kayitlar,maclar,mac_oyuncu WHERE maclar.mac_id = ? AND maclar.mac_id=mac_oyuncu.mac_id AND kayitlar.id=mac_oyuncu.user_id GROUP BY takim;',[mac_id],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    },
    getMatchInfoOfPlayer: (user_id, callBack) => {
        pool.query('SELECT id,username,maclar.mac_id,maclar.mac_skor1,maclar.mac_skor2,maclar.mac_tarih,maclar.mac_kazanan,mac_oyuncu.takim FROM kayitlar,maclar,mac_oyuncu WHERE mac_oyuncu.user_id=40 AND maclar.mac_id=mac_oyuncu.mac_id AND kayitlar.id=mac_oyuncu.user_id;',[user_id],(error,results,fields)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        });
    }
    
}