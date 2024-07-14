import {useEffect, useState} from "react";
import {
    checkout,
    clearCart,
    getCartItemsFullData,
    getNumberOfItemsInTheCart,
} from "../../backend.js";
import CartItem from "../CartItem/CartItem.jsx";
import {useToastNotification} from "../../contexts/ToastContextProvider.jsx";
import classes from "./ShoppingCart.module.css";
import {Button, Text, useMantineTheme} from "@mantine/core";

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
    const theme = useMantineTheme();
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

    if (!cartItemsFullData) return <div>Loading...</div>

    return (
        <>
            <div className={classes.shoppingCartWrapper}>
                {cartItemsTotal ?
                    <>
                        {cartItemsFullData?.map((product) => {
                            return (
                                <div key={product.id} style={{display: "flex", marginBottom: "4px"}}>
                                    <CartItem {...product} isCart/>
                                </div>
                            )
                        })}
                        <Text>Total price: {getTotalPrice(cartItemsFullData)}$</Text>
                        <div className={classes.controlsBtnWrapper}>
                            <Button variant="outline" color={theme.colors.greyBlue[8]} onClick={() => clearCart()}>Clear cart</Button>
                            <Button color={theme.colors.greyBlue[8]} onClick={() => onCheckout()}>Continue to Checkout</Button>
                        </div>
                    </>
                    :
                    <Text className={classes.emptyText} size="xl" fw={600} ta="center">The cart is empty...</Text>
                }
            </div>
            <div className={classes.overlayWrapper} onClick={handleAreaClick}/>
        </>

    )
}