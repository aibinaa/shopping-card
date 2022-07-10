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

let basket = []


app.get('/basket/getBasket', (req, res) => {
    res.json(basket)
});

app.post('/basket/addItem', (req, res) => {
    if (basket.length == 0 || !basket.find(e => e.id == req.body.id)) {
        console.log('first cond')
        req.body.qty +=1;
        basket.push(req.body)
    } else if (!!basket.find(e => e.id == req.body.id)) {
        console.log('second cond')
        const index = basket.findIndex(e => e.id == req.body.id)
        basket[index].qty += 1;
        basket[index].price += req.body.price;
    }

    res.json(req.body)

})

app.listen(Port, () => console.log(`listening on port ${Port}`))








