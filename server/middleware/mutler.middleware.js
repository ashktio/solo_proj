// const multer = require('multer')
// const path = require('path')
// const {GridFsStorage} = require('multer-gridfs-storage');

// const storage = new GridFsStorage({
//     url: 'mongodb://localhost/family-book',
//     options: {useUrlParser: true, useUnifiedTopology: true},
//     filename: (req, file, cb) =>{
//         console.log(file)
//         cb(null, Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage})

// module.exports = {
//     upload
// }
