const express = require('express');
const { json } = require('express/lib/response');
const app = express();
const Port = 9000
const fs = require('fs')

app.use(express.json())
app.use(express.static('src'))

const jsonProducts = fs.readFileSync('products.json', 'utf-8')


app.get('/getproducts', (req, res) => {
    res.json(jsonProducts)
})




// let basket = {}

// app.get('/basket/getBasket', (req, res) => {

// });

// app.post('/basket/addItem', (req, res) => {

// })

app.listen(Port, () => console.log(`listening on port ${Port}`))








