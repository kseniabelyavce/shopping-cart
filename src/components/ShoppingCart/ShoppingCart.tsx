import {useEffect, useState} from "react";
import {
    CartItemFullData,
    checkout,
    clearCart,
    getCartItemsFullData,
    getNumberOfItemsInTheCart,
} from "../../backend.ts";
import CartItem from "../CartItem/CartItem.js";
import {ToastContextType, useToastNotification} from "../../contexts/ToastContextProvider.js";
import classes from "./ShoppingCart.module.css";
import {Button, Text, useMantineTheme} from "@mantine/core";

function getTotalPrice(items: CartItemFullData[]):string {
    let price = 0;
    items.map(item => {
        price += item.price * item.amount
    })
    return price.toFixed(2);
}

type ShoppingCartProps = {
    setIsCartOpened: (arg: boolean) => void;
}
export default function ShoppingCart({setIsCartOpened}: ShoppingCartProps) {
    const [cartItemsFullData, setCartItemsFullData] = useState<CartItemFullData[]>();
    const [cartItemsTotal, setCartItemsTotal] = useState<number>();
    const theme = useMantineTheme();
    const { showToastMessage } = useToastNotification() as ToastContextType;

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
            showToastMessage('Your purchase was successful!', "success")
        } else {
            showToastMessage('There was an error purchasing the items. Please try again', "error")
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
                                    <CartItem {...product}/>
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