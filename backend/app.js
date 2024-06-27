const express = require('express');
const topSellersInformation = require('./MOCK_DATA.json')
const cors = require('cors');


const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

app.get("/status", (req, res) => {
    const status = {
        "Status": "Running"
    };

    res.send(status);
});

app.get("/getTopSellers", (req, res) => {
    res.json(topSellersInformation);
});

app.get("/isTopSeller/:sku", (req, res) => {
    const sku = req.params.sku;
    const productSearching = topSellersInformation.filter(product => product.sku.toString() === sku) ?? [];
    let isTopSeller = false; 
    if (productSearching.length === 0) {
        res.status(406);
    } else {
        res.status(200);
    }

    res.json({
        product: productSearching,
        isTopSeller: ( productSearching.length !== 0 ) 
    });
    
});