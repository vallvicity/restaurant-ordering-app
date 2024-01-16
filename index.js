import { menuArray } from './data.js'

const containerEl = document.getElementById('container')
const heroEl = document.getElementById('hero')
const itemBtn = document.getElementById('item-btn')
const orderList = document.getElementById('order-list')
const modal = document.getElementById('modal')
const payFormEl = document.getElementById('pay-form')

let orderedItemsArr = []
heroEl.innerHTML = renderElements()

document.getElementById('container').addEventListener('click', function(e) {
    if (e.target.id) {
        for (let item of menuArray) {
            if (item.id == e.target.id) {
                if (!orderedItemsArr.includes(item)) {
                    orderedItemsArr.push(item)
                    renderItem(orderedItemsArr)
                }
            }
        }
    }    
    if (e.target.dataset.id ) {
        const itemsLeft = orderedItemsArr.filter(
            order => order.id != e.target.dataset.id
        )
        orderedItemsArr = itemsLeft
        renderItem(orderedItemsArr)
    }
    if (e.target.dataset.action) {
        modal.style.display = 'flex'
    }
})

payFormEl.addEventListener('submit', function(e) {
    e.preventDefault()
    const payFormData = new FormData(payFormEl)
    const name = payFormData.get('fullName')
    modal.style.display = 'none'
    orderList.innerHTML = `
        <div class="payment-done">
            <h2>Thanks ${name}! Your order is on its way!</h2>
        </div>`
})

function renderElements() {
   const menuItems = menuArray.map(element => {
        return `
        <div class="element">
            <h1 class="element-icon">${element.emoji}</h1>
            <div class="element-description">
                <h1>${element.name}</h1>
                <p>${element.ingredients}</p>
                <h2>$${element.price}</h2>
            </div>
            <button id='${element.id}' class="item-btn">+</button>
        </div>
        `
    })
    return menuItems
}


function renderItem(arr) {
    if (arr.length) {
        orderList.innerHTML = `<h2 id="ordered-container">Your order</h2>`
        const orderItemEl = document.getElementById('ordered-container')
        arr.map(order => {
             orderItemEl.innerHTML += `
                <div class='ordered-item'>
                <div class="item-description">
                    <h3>${order.name}</h3>
                    <button id="remove-order" data-id="${order.id}">remove</button>
                </div>
                <h3>$${order.price}</h3>
            </div>
        `
        })
        const prices = arr.map(element => element.price)
        const totalPrice = prices.reduce((total, currentValue) => total + currentValue) 
        orderList.innerHTML += `
        <div class="total-price">
            <h3>Total price:</h3>
            <h3>$${totalPrice}</h3>
        </div>
        <button data-action="order-btn" class="order-btn">Complete order</button>`
    } else {
        orderList.innerHTML = ``
    }
    
}