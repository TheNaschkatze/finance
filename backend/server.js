const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;
const userRoutes = express.Router();
let User = require('./user.model');
const route = require('./buyins/buyins.routes');

app.use(cors());
app.use(bodyParser.json());
app.use('/buyins', route);

mongoose.connect('mongodb+srv://thenaschkatze:21guitarra@cluster0.rr4hf.mongodb.net/finance?retryWrites=true&w=majority', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})


userRoutes.route('/').get(function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    });
});

userRoutes.route('/:id').get(function (req, res) {
    let id = req.params.id;
    User.findById(id, function (err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(function (req, res) {
    let todo = new User(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});
//https://stackoverflow.com/questions/22966854/structure-of-express-mongoose-app
app.use('/users', userRoutes);
app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
const path = require('path');
app.use(express.static(path.join(__dirname, 'client/build')));
