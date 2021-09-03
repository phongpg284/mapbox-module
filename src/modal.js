import mongoose from "mongoose";

let geometry = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: [[Number, Number, Number]],
        required: true
    }
})

let feature = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Feature'],
        required: true
    },
    properties: {},
    geometry: geometry
})

let featureCollection = new mongoose.Schema({
    type: {
        type: String,
        enum: ['FeatureCollection'],
        required: true
    },
    name: String,
    features: [feature]
})

let userSchema = new mongoose.Schema({
    id: {type: String, require: true},
    bounding: featureCollection,
    name: String
})

const userModel = mongoose.model("User", userSchema);

export default userModel;