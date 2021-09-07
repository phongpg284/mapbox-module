import express from "express";
import mongoose from "mongoose";
import boundModel from "./modal/bounding";

const router = express.Router();
const Bound = boundModel;

router.get("/bounds", (req, res) => {
    Bound.find((err, users) => {
        if (err) console.log(err)
        res.json(users)
    })
})

router.get("/bounds/:id", (req, res) => {
    Bound.findById(mongoose.Types.ObjectId(req.params.id), (err, user) =>{
        if(err) console.log(err)
        res.json(user)
    })
})

router.post("/bounds", (req, res) => {
    console.log(req.body)
    const newBound = new Bound(req.body);
    newBound.save((err, bound) => {
        if (err) console.log(err)
        res.json(bound)
    })
})

export default router