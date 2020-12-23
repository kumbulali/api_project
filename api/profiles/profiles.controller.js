const {
        getProfileByUserId,
        updateProfile,
} = require('./profiles.service');


module.exports = {

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