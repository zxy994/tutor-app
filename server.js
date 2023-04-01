const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

// Mount user routes
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send('ok')
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
app.listen(3000, () => {
    console.log('Server started on port 3000');
});
