import {useEffect, useState} from "react";
import {getAllProducts} from "../backend.js";
import ProductCard from "../components/ProductCard.jsx";
import { Container, SimpleGrid} from "@mantine/core";

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
        <Container h={50} fluid>
            <SimpleGrid cols={4} spacing="lg">
                {products?.map((product) => {
                    return (
                        <ProductCard  key={product.id} {...product} setIsCartOpened={setIsCartOpened} isCartOpened={isCartOpened}/>
                    )
                })}
            </SimpleGrid>
        </Container>
    )

}