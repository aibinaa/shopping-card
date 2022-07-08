const container = document.querySelector('.product-container')
function get() {
    fetch('/getproducts')
    .then(response => response.json())
    .then(data => { 
        const result = JSON.parse(data)
        console.log(result)
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
                console.log(product.id)
            })

        }) 
    })
}
get()


