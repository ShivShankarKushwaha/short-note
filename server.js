require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port =process.env.PORT || 5500;
mongoose.connect(process.env.MONGO_LINK)
    .then(() => console.log('Database connected'))
    .catch(error => console.error('Database connection error:', error));

const schema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});

const model = mongoose.model('collection', schema);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.send('hello');
});

app.post("/setdata", async (req, res) => {
    console.log('setdata API called');
    try {
        if (!req.body.name || !req.body.email || !req.body.message) {
            res.json({ status: 406 })
        }
        else {
            const user = new model({
                name: req.body.name,
                email: req.body.email,
                message: req.body.message
            });
            const response = await user.save();
            console.log(response);
            res.json({ status: 201 });
        }
    } catch (error) {
        console.log(error);
        console.log('Error inside setdata');
        res.json({ status: 400 });
    }
});
app.get("/getdata", async (req, res) => {
    let arr = await model.find({});
    arr = JSON.stringify(arr);
    res.json(arr);
})
app.delete('/deletedata', async (req, res) => {
    let responce = await model.deleteOne({ email: req.body.email });
    console.log(responce);
    res.json({ status: 200 });
})
app.put("/edit", async (req, res) => {
    try {
        console.log(req.body.email);
        console.log(req.body.message);
        let responce = await model.updateOne({ email: req.body.email }, { $set: { message: req.body.message } });
        console.log(responce);
        res.json({ status: 200 });
    } catch (error) {
        res.json({ status: 406 });
    }
})
app.post('/deleteall',async(req,res)=>
{
    try {
        let responce = await model.deleteMany({});
        res.json({status:200});
    } catch (error) {
        res.json({status:406});
    }
    
})
app.listen(port, () => {
    console.log('Server is running on port 5500');
});
