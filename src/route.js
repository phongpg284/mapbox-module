import express from "express";
import mongoose from "mongoose";
import userModel from "./modal";

const router = express.Router();
const User = userModel;

router.get("/users", (req, res) => {
    User.find((err, users) => {
        if (err) console.log(err)
        res.json(users)
    })
})

router.get("/users/:id", (req, res) => {
    User.findById(mongoose.Types.ObjectId(req.params.id), (err, user) =>{
        if(err) console.log(err)
        res.json(user)
    })
})

router.post("/users", (req, res) => {
    console.log(req.body,"hehe")
    const newUser = new User(req.body);
    console.log(newUser);
    newUser.save((err, user) => {
        if (err) console.log(err)
        res.json(user)
    })
})

export default router