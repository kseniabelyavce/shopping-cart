const availableProducts = [
    {
        title: "Chair 1",
        description: "This is the description for chair.",
        price: 19.99,
        id: 123,
        img: "images/Chair21.jpg"
    },
    {
        title: "Chair 2",
        description: "This is the description for chair.",
        price: 29.99,
        id: 234,
        img: "images/Chair22.jpg"
    },
    {
        title: "Chair 3",
        description: "This is the description for chair.",
        price: 39.99,
        id: 345,
        img: "images/Chair23.jpg"
    },
    {
        title: "Chair 4",
        description: "This is the description for chair.",
        price: 19.99,
        id: 456,
        img: "images/Chair24.jpg"
    },
    {
        title: "Chair 5",
        description: "This is the description for chair.",
        price: 19.99,
        id: 567,
        img: "images/Chair25.jpg"
    },
    {
        title: "Chair 6",
        description: "This is the description for chair.",
        price: 29.99,
        id: 568,
        img: "images/Chair26.jpg"
    },
    {
        title: "Chair 7",
        description: "This is the description for chair.",
        price: 29.99,
        id: 569,
        img: "images/Chair27.jpg"
    },
    {
        title: "Chair 8",
        description: "This is the description for chair.",
        price: 29.99,
        id: 570,
        img: "images/Chair28.jpg"
    },
]


export async function getAllProducts() {
    return new Promise((resolve) => resolve(availableProducts))
}

export async function getCartItemsFullData() {
    const cartItems = await getCartItems();
    const cartItemsIds = Object.keys(cartItems);
    const thirtyDaysAgo = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
    const nonExpiredItems = cartItemsIds.filter(itemId => cartItems[itemId].created >= thirtyDaysAgo);
    const cartItemsProductData = availableProducts.filter(({id}) => {
        return nonExpiredItems.includes(id.toString())
    })
    const cartItemsFullData = cartItemsProductData.map(item => {
        return {...item, ...cartItems[item.id]}
    })
    return new Promise((resolve) => resolve(cartItemsFullData))
}

export async function addToCart(productId) {
    const cart = await getCartItems();
    cart[productId] = cart[productId] || {amount: 0, created: Date.now()};
    cart[productId].amount += 1;
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function removeFromCart(productId) {
    const cart = await getCartItems();
    delete cart[productId]
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function getCartItems() {
    return new Promise((resolve) => {
        let jsonCart = localStorage.getItem('cart');
        let cart = {};
        if (jsonCart) {
            cart = JSON.parse(jsonCart);
        }
        resolve(cart);
    })
}

export async function getNumberOfItemsInTheCart() {
    const cart = await getCartItems();
    return new Promise( (resolve) => {
        resolve(Object.keys(cart).length);
    })
}

export async function removeOneItemFromCart(productId) {
    const cart = await getCartItems();
    cart[productId].amount -= 1
    if (cart[productId].amount < 1) {
        delete cart[productId];
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function addOneItemToCart(productId) {
    const cart = await getCartItems();
    cart[productId].amount += 1
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function clearCart() {
    localStorage.setItem('cart', JSON.stringify({}))
}

export async function checkout() {
    await clearCart();
    return new Promise((resolve) => {
        resolve('success')
    })
}









