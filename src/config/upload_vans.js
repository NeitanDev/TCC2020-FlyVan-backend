const multer = require('multer');
const path = require('path');

module.exports = {
    storage: new multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', 'uploads', 'vans'),
        filename: function (req, file, callback) {
            var data = new Date();
            var localdate = data.getFullYear() + (data.getMonth() + 1) + data.getDate() + '_' +
                data.getHours() + data.getMinutes() + data.getSeconds();
            callback(null, localdate + '.jpg');
        }
    })
};