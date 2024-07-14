import {useEffect, useState} from "react";
import {getNumberOfItemsInTheCart} from "../../backend.js";


export default function Header({isCartOpened, setIsCartOpened}) {
    const [cartItemsTotal, setCartItemsTotal] = useState();

    async function updateCartItemsAmount() {
        const itemsTotal = await getNumberOfItemsInTheCart();
        setCartItemsTotal(itemsTotal);
    }

    useEffect(() => {
        updateCartItemsAmount();
        setInterval(updateCartItemsAmount, 100)
    }, [])


    return <header  style={{ padding: "15px"}}>
        <button onClick={() => setIsCartOpened(!isCartOpened)}>Cart: {cartItemsTotal}</button>
    </header>
}
