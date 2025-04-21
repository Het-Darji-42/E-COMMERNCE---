const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../../model/UserModel/user.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const cloudinary = require('../../config/clodinary')
const fs = require('fs')


const Register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    const existedUser = await userModel.findOne({ username, email });
      if (existedUser) {
        
          if (req.file && req.file.path) {
              fs.unlinkSync(req.file.path)
          }
          
      return res.status(400).json({
        message: "User Already Existed",
      });
    }

    
      const uploadResult = await cloudinary.uploader.upload(req.file.path, { 
          folder : "Ecom_Profile_Image"
      })
    
      fs.unlinkSync(req.file.path)
      
    const hashPassword = await bcrypt.hash(password, 10);

    const createUser = await userModel.create({
      username,
      email,
      password: hashPassword,
        role,
        profileImage : uploadResult.secure_url,
    });

    return res.status(201).json({
      message: "User Created Successfully",
      user: createUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "SERVER SIDE ERROR",
      error: error.message,
    });
  }
};



const Login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUser = await userModel.findOne({ username });
    if (!isUser) {
      return res.status(400).json({
        message: "Invalid Credential : U",
      });
    }

    const ComparePassword = await bcrypt.compare(password, isUser.password);
    if (!ComparePassword) {
      return res.status(400).json({
        message: "Invalid Credential : p",
      });
    }

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign({ authID: isUser._id, role: isUser.role }, secret, {
      expiresIn: "10d",
    });

    return res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        username: isUser.username,
        email: isUser.email,
        role: isUser.role,
        //   profileImage : isUser.profileImage
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "SERVER SIDE ERROR",
      error: error.message,
    });
  }
};

module.exports = { Login, Register };
