const bcrypt = require('bcrypt')
const USER=require('../model/user')
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: process.env.Nodemailer_User,
    pass: process.env.Nodemailer_Password
  }
});

async function main(mail) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from:process.env.Nodemailer_User, // sender address
    to: mail, // list of receivers
    // subject: "Hello ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: "<b>Hello guys?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

exports.allsighnupuser=async function(req, res, next) {
    try {
      if (!req.body.fname || !req.body.lname || !req.body.email  ||  !req.body.password ) {
        throw new Error("pleace enter valid feilds")
      }
      req.body.password=await bcrypt.hash(req.body.password,10)
      const data=await USER.create(req.body)
      await main(req.body.email)
      res.status(201).json({
        status:"success",
        message:"signup successfully",
        data:data
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.allloginuser=async function(req, res, next) {
    try {
  
      console.log(req.body.password);
     const cheakUser=await USER.findOne({email:req.body.email})
     if (!cheakUser) {
      throw new Error("INVALID EMAIL")
     }
  
     const cheakPass= await bcrypt.compare(req.body.password,cheakUser.password)
     if (!cheakPass) {
      throw new Error("INVALID PASSWORD")
     }
  
      res.status(201).json({
        status:"success",
        message:"login successfully",
        data:cheakUser
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }

  exports.alluser=async function(req, res, next) {
    try {
      const data =await USER.find(req.body)
      res.status(200).json({
        status:"success",
        message:"all data successfully ",
        data:data
      })
    } catch (error) {
      res.status(404).json({
        status:"fail",
        message:error.message
      })
    }
  }