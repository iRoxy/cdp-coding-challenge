const express = require('express');
const User = require("./models/User.model");
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDb = require("./connection");
const PORT = 8080;
// const client = mongodb.MongoClient;

// client.connect(config.DB, function(err, db) {
//     if(err) {
//         console.log('database is not connected')
//     }
//     else {
//         console.log('connected!!')
//     }
// });

app.get("/", async (req, res) => {
    const users = await User.find();
    console.log('Server returned users: ', users);
    res.json(users);
});

app.post("/user-create", async (req, res) => {
    let data = req.body;
    const user = new User({ firstname: data.firstname, lastname: data.lastname, email_address: data.email_address, department: data.department });
    await user.save().then(() => console.log("User created"));
    console.log("we've hit the server...");
    res.send("User created \n");
});

app.post("/delete-user", async (req, res) => {
    let user = req.body;
    console.log('Server | User to Delete: ', req.body);
    await User.deleteOne({ _id: user._id });
    res.send("User was successfully deleted");åå
});

app.post("/update-user", async (req, res) => {
    let user = req.body;
    let id = user._id;
    console.log('Server | User to UPDATE: ', req.body);
    await User.findByIdAndUpdate(
        {_id: id }, 
        { firstname: user.firstname, lastname: user.lastname, email_address: user.email_address, department: user.department },
        { new: true });
    res.send("User was successfully deleted");
});

app.listen(PORT, function(){
    console.log('Your node js server is running on PORT:',PORT);

    connectDb().then(() => {
        console.log("MongoDb connected");
    });
});