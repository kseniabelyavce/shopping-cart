import {useEffect, useState} from "react";
import {getAllProducts} from "../backend.js";
import ProductCard from "../components/ProductCard.jsx";

export default function StoreFrontPage({setIsCartOpened, isCartOpened}) {
    const [products, setProducts] = useState();

    useEffect(() => {
        (async () => {
            const result = await getAllProducts();
            setProducts(result)
        })()

    }, [])

    if (!products) return <div>Loading...</div>

    return (

            <div style={{height: "100vh", flex: "2"}}>
                {products.map((product) => {
                    return (
                        <div key={product.id}>
                            <ProductCard {...product} setIsCartOpened={setIsCartOpened} isCartOpened={isCartOpened}/>
                        </div>
                    )
                })}
            </div>
    )

}