const container = document.querySelector('.product-container')
function get() {
    fetch('/getproducts')
        .then(response => response.json())
        .then(data => {
            const result = JSON.parse(data)
            return result.products.map(product => {
                const productLink = document.createElement('a')
                const productDiv = document.createElement('div')
                const productImg = document.createElement('img')
                const productName = document.createElement('h3')
                const productPrice = document.createElement('p')
                const productBtn = document.createElement('button')

                productLink.className = "group"
                productLink.append(productDiv)
                productDiv.className = "w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8"
                productDiv.append(productImg)
                productImg.src = product.img
                productImg.className = "w-full h-full object-center object-cover group-hover:opacity-75"

                productLink.append(productName)
                productName.className = "mt-4 text-sm text-gray-700"
                productName.innerText = product.name

                productLink.append(productPrice)
                productPrice.className = "mt-1 text-lg font-medium text-gray-900"
                productPrice.innerText = product.currency + product.price
                container.append(productLink)

                productLink.append(productBtn)
                productBtn.className = "bg-gray-800 mt-2 p-2 rounded-md text-lg text-white font-light"
                productBtn.innerText = "Add to card"

                productBtn.addEventListener('click', () => {
                    addItem(product)
                    getBasketCount()
                })
            })
        })
}
get()

const addItem = async (product) => {
    await fetch("/basket/addItem", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: JSON.stringify(product)
    })
}

const amount = document.querySelector('.amount')

const getBasketCount = async () => {
    const response = await fetch("/basket/getBasket")
    const result = await response.json()
    amount.innerHTML = result.length

}
getBasketCount()
const cartBox = document.querySelector('.cartBox')

const cart = document.querySelector('.cart')
cart.addEventListener('click', () => {
    getBasket()
    cartBox.className = "visible"
})

const closeBtn = document.querySelector('.closeCartBtn')
closeBtn.addEventListener('click', () => {
    cartBox.className = "hidden"
})

const getBasket = async () => {
    const response = await fetch('/basket/getBasket')
    const result = await response.json()
    console.log(result)

    const cartUList = document.querySelector('.cartUList')
    cartUList.innerHTML =''

    return result.map(product => {
        const cartDiv = document.createElement('div')
        const cartDiv2 = document.createElement('div')
        const cartDiv3 = document.createElement('div')
        const cartDiv4 = document.createElement('div')
        const cartImg = document.createElement('img')
        const cartName = document.createElement('h3')
        const cartPrice = document.createElement('p')
        const cartQuantity = document.createElement('p')
        const cartBtn = document.createElement('button')
        const cartList = document.createElement('li')
        // const cartContainer = document.querySelector('.cartContainer')

        cartList.className = "flex py-6"
        cartList.append(cartDiv)
        cartDiv.className = "h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
        cartDiv.append(cartImg)
        cartImg.src = product.img
        cartImg.className = "h-full w-full object-cover object-center"

        cartList.append(cartDiv2)
        cartDiv2.className = "ml-4 flex flex-1 flex-col"
        cartDiv2.append(cartDiv3)
        cartDiv3.className = "flex justify-between text-base font-medium text-gray-900"
        cartDiv3.append(cartName)
        cartName.innerText = product.name
        cartDiv3.append(cartPrice)
        cartPrice.innerText = product.currency + product.price
        cartPrice.className = "ml-4"

        cartDiv2.append(cartDiv4)
        cartDiv4.className = "flex flex-1 items-end justify-between text-sm"
        cartDiv4.append(cartQuantity)
        cartQuantity.innerText = `Qty: ${product.qty}`

        cartDiv4.append(cartBtn)
        cartBtn.className = "font-medium text-indigo-600 hover:text-indigo-500"
        cartBtn.innerText = "Remove"

        cartUList.append(cartList)

    })
}