const express = require("express")
const User = require("../Module/User")
const router = express.Router()

const {body , validationResult} = require("express-validator")

// fetching
router.get("/users", async (req, res) => {
    const users = await User.find()
    res.status(200).json({
        message: "Found",
        users
    });
});
// create
// we uses middleware(express-validator) so it will validate the values which we want before it goes to DB.
// so the expensive of it will decreases if not it's the way writing the code in a bad way
router.post("/add",body("email").isEmail(), body("name").isAlpha(), body("password").isStrongPassword() ,async (req, res) => {
    try {

        const error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({error:error.array()})
        }
        const user = await User.create(req.body);
        res.status(200).json({
            message: "User created successfully",
            user
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

// Update we can patch or put 
router.put("/update/:id", async (req, res) => {
    try {
        const user = await User.updateOne({_id:req.params.id},
            { age:req.body.age, married : req.body.married},
            {runValidators:true});
        // req.params-->anything pass after ":" in url , req.body: anything pass on body
        // req.query-->anything pass after "?" in url
        // runValidators --> check the schema will updation also
        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

// delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const user = await User.deleteOne({_id:req.params.id});
        //params-->url , body: jsonbody
        // runValidators --> check the schema will updation also
        res.status(200).json({
            message: "User updated successfully",
            user
        });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

module.exports = router
