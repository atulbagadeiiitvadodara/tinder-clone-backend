const express = require("express");
const mongoose = require("mongoose");
const Cors = require("cors");

// import express from "express";
// import mongoose from 'mongoose';


//App config

const app = express();
const port = process.env.PORT || 8000;
const connection_url = 'mongodb+srv://admin:Sec@123456@cluster0.oc4xe.mongodb.net/tinderdb?retryWrites=true&w=majority';

//moddleware
app.use(express.json());
app.use(Cors());

//db config Sec@123456

const cardSchema = mongoose.Schema({
    name: String,
    imgUrl: String
});

const Cards = mongoose.model("cards", cardSchema);

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});


//API endpoint
app.get("/", (req, res) => res.status(200).send("Hello Server"));

app.post("/tinder/cards", (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (error, data) => {
        if(error){
            res.status(500).send(error);
        } else {
            res.status(201).send(data);
        }
    })
});

app.get("/tinder/cards", (req, res) => {

    Cards.find((error, data) => {
        if(error){
            res.status(500).send(error);
        } else {
            res.status(200).send(data);
        }
    })
});


//app listner
app.listen(port, () => console.log(`listening on port: ${port}`));