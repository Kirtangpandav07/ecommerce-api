const PRODUCT=require('../model/product')


exports.Allproduct=async function(req, res, next) {
    try {
      const data = await PRODUCT.find().populate('category')
      res.status(201).json({
        status:"success",
        message:"all product celected",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Addproduct=async function(req, res, next) {
    try {
      

      const thum = req.files.thumbnail
      thum.map((el)=>{
        req.body.thumbnail=el.filename
      })
      
  
  
      req.body.images = []
          const file = req.files.images
  
          file.map((el) => {
              console.log(el.filename);
              req.body.images.push(el.filename)
          })
  
         
  
  
      // req.body.image=req.file.filename
      const data =await PRODUCT.create(req.body)
      res.status(201).json({
        status:"success",
        message:"product succesfully added",
        data:data
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Deleteproduct=async function(req, res, next) {
    try {
      const data =await PRODUCT.findByIdAndDelete(req.params.id)
      res.status(201).json({
        status:"success",
        message:"product succesfully deleted",
        data:data
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Updateproduct=async function(req, res, next) {
    try {
        const getdata=await PRODUCT.findById(req.params.id)
        const data = {...getdata._doc,...req.body}
  
         const thum = req.files.thumbnail
         thum.map((el)=>{
             req.body.thumbnail=el.filename
         })
                                                                
    

   
    if (req.files) {
        data.images=[];
        const file =req.files.images
        file.map((el)=>{
            data.images.push(el.filename)
        })
    }
  
      await PRODUCT.findByIdAndUpdate(req.params.id,req.body)
      res.status(201).json({
        status:"success",
        message:"product succesfully updated",
        
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Serchproduct=async function(req, res, next) {
    try {
      const data = await PRODUCT.find({title:{$eq: req.query.title}}).populate('category')
      res.status(201).json({
        status:"success",
        message:"serching successfully",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.Page1=async function(req, res, next) {
    try {
      const data = await PRODUCT.find().skip(0).limit(7)
      res.status(201).json({
        status:"success",
        message:"serching successfully",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }


  exports.Page2=async function(req, res, next) {
    try {
      const data = await PRODUCT.find().skip(7).limit(7)
      res.status(201).json({
        status:"success",
        message:"serching successfully",
        data:data
      })
  
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

 