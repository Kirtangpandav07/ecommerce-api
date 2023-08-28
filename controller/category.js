const CATEGORY =require('../model/category')

exports.Allcategory=async function(req, res, next) {
    try {
      const data = await CATEGORY.find()
      res.status(201).json({
        status:"success",
        message:"all category celected",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Addcategory=async function(req, res, next) {
    try {
      req.body.image=req.file.filename
      const data = await CATEGORY.create(req.body)
      res.status(201).json({
        status:"success",
        message:"new category celected",
        data:data
      })

    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Deletecategory=async function(req, res, next) {
    try {
      const data = await CATEGORY.findByIdAndDelete(req.params.id)
      res.status(201).json({
        status:"success",
        message:"category deleted",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Updatecategory=async function(req, res, next) {
    try {
      req.body.image=req.file.filename
      const data = await CATEGORY.findByIdAndUpdate(req.params.id,req.body)
      res.status(201).json({
        status:"success",
        message:"category updated",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }