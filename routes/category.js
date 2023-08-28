var express = require('express');
var router = express.Router();
const multer  = require('multer')

const Allcategory=require('../controller/category')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/category')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })


/* GET users listing. */
router.get('/allcategory',Allcategory.Allcategory);

  router.post('/addcategory',upload.single('image'),Allcategory.Addcategory);

  router.delete('/deletecategory/:id',Allcategory.Deletecategory);


  router.patch('/updatecategory/:id',upload.single('image'),Allcategory.Updatecategory);



module.exports = router;
