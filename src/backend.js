const availableProducts = [
    {
        title: "Product 1",
        description: "This is the description for Product 1.",
        price: 19.99,
        id: 123,
        img: "images/pizza.jpg"
    },
    {
        title: "Product 2",
        description: "This is the description for Product 2.",
        price: 29.99,
        id: 234,
        img: "images/pancakes.jpg"
    },
    {
        title: "Product 3",
        description: "This is the description for Product 3.",
        price: 39.99,
        id: 345,
        img: "images/sushi.jpg"
    }]


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









