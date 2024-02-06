const express =require('express');
const cors = require('cors');

const app = express();

app.use("/assets",express.static("assets"));

app.use(cors());

const PORT = process.env.PORT || 3000;

// app.get('/',(req, res) => {

//     res.json({message: 'Restful API BACKEND Using Express'});

// });

app.get('/', (req, res) => {

    //res.json({ message: 'Restfull API Backend Using ExpresJS' });
    res.sendFile(__dirname + "/page.html");
    
    });
    

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});