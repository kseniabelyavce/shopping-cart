export type Product = {
    title: string,
    description: string,
    price: number,
    id: number,
    img: string
}
const availableProducts: Product[] = [
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

export async function getAllProducts(): Promise<Product[]> {
    return new Promise((resolve) => resolve(availableProducts))
}

export type CartItemFullData = (Product & CartItem);

export async function getCartItemsFullData(): Promise<CartItemFullData[]> {
    const cartItems = await getCartItems();
    const cartItemsIds = Object.keys(cartItems);
    const thirtyDaysAgo = new Date(new Date().getTime() - (30 * 24 * 60 * 60 * 1000));
    const nonExpiredItems = cartItemsIds.filter(itemId => cartItems[Number(itemId)].created >= thirtyDaysAgo);
    const cartItemsProductData = availableProducts.filter(({id}) => {
        return nonExpiredItems.includes(id.toString())
    })
    const cartItemsFullData = cartItemsProductData.map(item => {
        return {...item, ...cartItems[item.id]}
    })
    return new Promise((resolve) => resolve(cartItemsFullData))
}

export async function addToCart(productId: number) {
    const cart = await getCartItems();
    cart[productId] = cart[productId] || {amount: 0, created: Date.now()};
    cart[productId].amount += 1;
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function removeFromCart(productId: number) {
    const cart = await getCartItems();
    delete cart[productId]
    localStorage.setItem('cart', JSON.stringify(cart))
}


type CartItem = {
    amount: number,
    created: Date,
}
export async function getCartItems(): Promise<{ [key: number]: CartItem }> {
    return new Promise((resolve) => {
        // eslint-disable-next-line prefer-const
        let jsonCart = localStorage.getItem('cart');
        let cart: { [key: number]: CartItem } = {};
        if (jsonCart) {
            cart = JSON.parse(jsonCart);
        }
        resolve(cart);
    })
}

export async function getNumberOfItemsInTheCart(): Promise<number> {
    const cart = await getCartItems();
    return new Promise((resolve) => {
        resolve(Object.keys(cart).length);
    })
}

export async function removeOneItemFromCart(productId: number) {
    const cart = await getCartItems();
    cart[productId].amount -= 1
    if (cart[productId].amount < 1) {
        delete cart[productId];
    }
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function addOneItemToCart(productId: number) {
    const cart = await getCartItems();
    cart[productId].amount += 1
    localStorage.setItem('cart', JSON.stringify(cart))
}

export async function clearCart() {
    localStorage.setItem('cart', JSON.stringify({}))
}

export async function checkout(): Promise<string> {
    await clearCart();
    return new Promise((resolve) => {
        resolve('success')
    })
}









