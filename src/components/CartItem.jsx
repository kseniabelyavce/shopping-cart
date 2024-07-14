import {addOneItemToCart, removeFromCart, removeOneItemFromCart} from "../backend.js";

export default function CartItem({title, description, img, amount, price, id}) {
    return (
        <div style={{display: "flex", alignItems: "center", width: "100%"}}>
            <img src={img} style={{width: "100px", height: "100px", marginRight: "15px", justifyContent: "space-between"}}/>

            <div style={{display: "flex", flexDirection: "column", alignSelf: "flex-start"}}>
                <h3 style={{margin: 0, padding: 0}}>{title}</h3>
                <p style={{margin: 0, padding: 0}}>{description}</p>
                <div style={{display: "flex", marginTop: "15%", justifyContent: "space-between"}}>
                    <p style={{ margin: 0, padding: 0}}>{price}$</p>
                    <button onClick={() => removeOneItemFromCart(id)}>-</button>
                    <button onClick={() => addOneItemToCart(id)}>+</button>
                    <button onClick={() => removeFromCart(id)}>Remove from cart</button>
                </div>
            </div>

            {amount && <div style={{alignSelf: "flex-start", marginLeft: "auto", marginRight: "80px", padding: "10px", backgroundColor: "white"}}>{amount}</div>}
        </div>
    )
}