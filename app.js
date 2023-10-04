const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./router/Router")
const app = express();


app.use(express.json())

app.use("/api" , userRoutes) // base url
// when ever i get the "/api" comes in url it redirect to the userRoutes then it will append to them

const mongoDBURL = "mongodb+srv://harshu:harshu24@cluster0.dptfkt0.mongodb.net/Blogapp?retryWrites=true&w=majority";

mongoose.connect(mongoDBURL)
.then(() => {
    // Start the Express app to listen on port 5050
    app.listen(5050, () => {
        console.log("Server is running on port 5050");
    });
    console.log("Connected to the database");
})
.catch((err) => {
    console.error("Error connecting to the database:", err);
});


