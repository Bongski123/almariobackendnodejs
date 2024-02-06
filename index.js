const express =require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/',(req, res) => {

    res.json({message: 'Restful API BACKEND Using Express'});

});

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});