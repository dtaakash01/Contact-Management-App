const express = require('express');
const connectDB = require('./config/db.js')

connectDB();



const app = express();

//Middleware
app.use(express.json({extended: false}))

const PORT = process.env.PORT || 5000;

app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

app.get('/', (req,res) => res.send("Local host 5000 / backend"))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))