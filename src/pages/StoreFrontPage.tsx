import {useEffect, useState} from "react";
import {getAllProducts, Product} from "../backend.ts";
import ProductCard from "../components/ProductCard.js";
import { Container, SimpleGrid} from "@mantine/core";

type StoreFrontPage = {
    isCartOpened: boolean,
    setIsCartOpened: (arg: boolean) => void
}
export default function StoreFrontPage({setIsCartOpened, isCartOpened}: StoreFrontPage) {
    const [products, setProducts] = useState<Product[]>();

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