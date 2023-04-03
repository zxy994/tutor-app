const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const mime = require('mime');

// Set content type for files
mime.define({
    'text/javascript': ['js']
});

app.use(express.static('./public'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// Mount user routes
app.use('/api/user', userRoutes);


app.get('/*', (req, res) => {
    res.sendFile(__dirname + '/dist/bundle.js', (err) => {
        if (err) {
            res.status(500).send(err)
        }
    });
})



//connect to database
async function connectDB() {
    await mongoose.connect('mongodb://0.0.0.0:27017/myapp', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", () => {
        console.log("connected successfully")
    })
}

connectDB().catch(console.error);

// Start the server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
