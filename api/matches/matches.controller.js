const { 
    create, 
    insertMacOyuncu, 
    updateMacVeri,
    getMatchInfo,
    getMatchInfoOfPlayer
} = require('./matches.service');


module.exports = {
    createMatch: (req,res)=> {
        const body = req.body;
        create((err,results)=>{
            if(err){
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message: "Database baglanti hatasi"
                });
            }
            insertMacOyuncu(body,results.insertId,(err,results)=>{
                if(err){
                    console.log(err);
                }
                return res.status(200).json({
                    success: 1,
                    data: results
                });
            });
            return res.json({
                success: 1,
                mac_id: results.insertId,
                messsage: "Basarili sekilde mac olusturuldu."
            });
        });
        
    },
    updateMacVeri: (req,res)=>{
        const body = req.body;
        updateMacVeri(body, (err, results)=>{
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
    getInfo: (req,res)=>{
        const mac_id=req.params.mac_id;
        getMatchInfo(mac_id, (err, results) => {
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
                match_data: results
            });
        });
    },
    getMatchInfoOfPlayer: (req,res)=>{
        const user_id=req.params.mac_id;
        getMatchInfoOfPlayer(user_id, (err, results) => {
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
                match_data: results
            });
        });
    },


}