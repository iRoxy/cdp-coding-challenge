const express = require('express');
const cors = require('cors');
const User = require('./models/User.model');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDb = require('./connection');

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

app.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/user-create', async (req, res) => {
  const data = req.body;
  const user = new User({
    firstname: data.firstname,
    lastname: data.lastname,
    email_address: data.email_address,
    department: data.department,
  });
  await user.save().then(() => console.log('User created'));
  res.send('User created \n');
});

app.post('/delete-user', async (req, res) => {
  const user = req.body;
  await User.deleteOne({ _id: user._id }); // eslint-disable-line no-underscore-dangle
  res.send('User was successfully deleted');
});

app.post('/update-user', async (req, res) => {
  const user = req.body;
  const id = user._id; // eslint-disable-line no-underscore-dangle
  await User.findByIdAndUpdate(
    { _id: id },
    {
      firstname: user.firstname,
      lastname: user.lastname,
      email_address: user.email_address,
      department: user.department,
    },
    { new: true },
  );
  res.send('User was successfully deleted');
});

app.listen(PORT, () => {
  console.log('Your node js server is running on PORT:', PORT);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
