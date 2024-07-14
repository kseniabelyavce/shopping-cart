import {addToCart} from "../backend.js";


export default function ProductCard({title, description, img, amount, price, id, isCartOpened, setIsCartOpened}) {
    function onAddToCart() {
        if (!isCartOpened) {
            setIsCartOpened(true)
        }
        addToCart(id)
    }


    return (
        <div style={{display: "flex", alignItems: "center", width: "100%"}}>
            <img src={img} style={{width: "100px", height: "100px", marginRight: "15px", justifyContent: "space-between"}}/>

            <div style={{display: "flex", flexDirection: "column", alignSelf: "flex-start"}}>
                <h3 style={{margin: 0, padding: 0}}>{title}</h3>
                <p style={{margin: 0, padding: 0}}>{description}</p>
                <div style={{display: "flex", marginTop: "15%", justifyContent: "space-between"}}>
                    <p style={{ margin: 0, padding: 0}}>{price}$</p>
                    <button className="add-to-cart_button" onClick={onAddToCart}>Add to cart</button>
                </div>
            </div>

            {amount && <div style={{alignSelf: "flex-start", marginLeft: "auto", marginRight: "80px", padding: "10px", backgroundColor: "white"}}>{amount}</div>}
        </div>
    )
}