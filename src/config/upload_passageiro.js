const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads', 'passageiros'),
        filename: function (req, file, callback) {
            var data = new Date();
            var localdate = data.getFullYear() + '_' + data.getMonth() + '_' + data.getDay() +'__'+
                data.getHours() + data.getMinutes() + data.getSeconds();
            callback(null, localdate + '.jpg');
        }
    })
};