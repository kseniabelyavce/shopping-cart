import {useEffect, useState} from "react";
import {
    checkout,
    clearCart,
    getCartItemsFullData,
    getNumberOfItemsInTheCart,
} from "../backend.js";
import CartItem from "./CartItem.jsx";
import {useToastNotification} from "../contexts/ToastContextProvider.jsx";

const cartStyles = {
    height: "100%",
    width: "23%",
    position: "fixed",
    top: "0",
    right: "0",
    paddingTop: "20px",
    paddingLeft: "10px",
    backgroundColor: "#F8F8F8",
    zIndex: "1000"
}

const overlayStyles = {
    position: "fixed",
    height: "100%",
    width: "100%",
    top: "0",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: "999",
    cursor: "pointer"
}

function getTotalPrice(items) {
    let price = 0;
    items.map(item => {
        price += item.price * item.amount
    })
    return price.toFixed(2);
}
export default function ShoppingCart({setIsCartOpened}) {
    const [cartItemsFullData, setCartItemsFullData] = useState();
    const [cartItemsTotal, setCartItemsTotal] = useState();
    const showToast = useToastNotification();

    function handleAreaClick() {
        setIsCartOpened(false);
    }
    async function updateCart() {
        const itemsTotal = await getNumberOfItemsInTheCart();
        const itemsFullData = await getCartItemsFullData();
        setCartItemsTotal(itemsTotal);
        setCartItemsFullData(itemsFullData)
    }

    useEffect(() => {
        updateCart();
        setInterval(updateCart, 100)
    }, [])

    async function onCheckout() {
        setIsCartOpened(false);
        const result = await checkout();

        if (result) {
            showToast('Your purchase was successful!', "success")
        } else {
            showToast('There was an error purchasing the items. Please try again', "error")
        }
    }

    if (!cartItemsFullData) return <div style={cartStyles}>Loading...</div>

    return (
        <>
            <div style={cartStyles}>
                {cartItemsTotal ?
                    <>
                        {cartItemsFullData.map((product) => {
                            return (
                                <div key={product.id} style={{display: "flex", marginBottom: "4px"}}>
                                    <CartItem {...product} isCart/>
                                </div>
                            )
                        })}
                        <div>Total price: {getTotalPrice(cartItemsFullData)}$</div>
                        <button onClick={() => clearCart()}>Clear cart</button>
                        <button onClick={() => onCheckout()}>Continue to Checkout</button>
                    </> : <div>The cart is empty</div>
                }


            </div>
            <div style={overlayStyles} onClick={handleAreaClick}/>
        </>

    )
}