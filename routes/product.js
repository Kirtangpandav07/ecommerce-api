var express = require('express');
var router = express.Router();
const multer  = require('multer')

const ALLPRODUCT=require('../controller/product')





const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/product')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
    
  }
})

const upload = multer({ storage: storage })

const cpUpload = upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'images', maxCount: 8 }])

/* GET users listing. */
router.get('/allproduct',ALLPRODUCT.Allproduct);


router.post('/addproduct',cpUpload,ALLPRODUCT.Addproduct);


router.delete('/deleteproduct/:id',ALLPRODUCT.Deleteproduct);

router.patch('/updateproduct/:id',cpUpload,ALLPRODUCT.Updateproduct);

router.get('/srechproduct',ALLPRODUCT.Serchproduct);


router.get('/page1',ALLPRODUCT.Page1);

router.get('/page2',ALLPRODUCT.Page2);






module.exports = router;
