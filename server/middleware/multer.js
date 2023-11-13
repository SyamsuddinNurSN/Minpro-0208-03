const multer = require('multer')

module.exports = {
    multerUpload: () => {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, './public')
            },

            filename: (req, file, cb) => {
                cb(null,
                    'PIMG' + '-' + Date.now() + Math.round(Math.random() * 1000000) + '.' +
                    file.mimetype.split('/')[1]
                )

                // PIMG-202310300293245345.jpg
            }
        })

        const fileFilter = (req, file, cb) => {
            const extFilter = ['jpg', 'jpeg', 'png', 'webp']
            const checkExt = extFilter.includes(file.mimetype.split('/')[1].toLowerCase())

            if (checkExt) {
                cb(null, true)
            } else {
                cb(new Error('File format not match'))
            }
        }

        return multer({ storage, fileFilter })
    }
}