import mongoose from "mongoose";

let geometry = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    coordinates: {
        type: [[[Number,Number]]],
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

let boundSchema = new mongoose.Schema({
    id: {type: String, require: true},
    bounding: featureCollection,
    name: String,
    area: String,
    createdAt: Date,
    img: {type: String, required: true} 
})

const boundModel = mongoose.model("Bound", boundSchema);

export default boundModel;