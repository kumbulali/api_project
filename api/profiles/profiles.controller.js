const { create,
        getProfileByUserId,
        updateProfile,
        checkAvailability
} = require('./profiles.service');


module.exports = {

    createProfile: (req, res) => {
        const body = req.body;
        checkAvailability(body.user_id ,(err,results) => {
            
            if(err){
                console.log(err);
                return;
            }
            if(!results){
                return res.json({
                    success: 0,
                    message: "Kayit bulunamadi"
                });
            }
            if(JSON.stringify(results.id) === body.user_id){
                create(body, (err, results)=>{
            if(err != null){
                if(err.errno === 1062){
                return res.json({
                    success: 0,
                    message: "Bu bilgilere ait baska bir kayit mevcut. Lutfen bilgi degistirmek icin update sinifini kullanin."
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
            }


        });
        
        
    },
    updateProfile: (req, res) => {
        const body = req.body;
        updateProfile(body, (err,results) => {
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
    getProfileByUserId: (req, res) => {
        const id = req.params.id;
        getProfileByUserId(id, (err, results) => {
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

}