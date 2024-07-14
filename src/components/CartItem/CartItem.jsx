import {addOneItemToCart, removeFromCart, removeOneItemFromCart} from "../../backend.js";
import { Button, Card, Group, Image, Text} from "@mantine/core";
import classes from "./CartItem.module.css"
export default function CartItem({title, description, img, amount, price, id}) {
    return (
        <Card withBorder shadow="sm" padding="xs">
            <div className={classes.cartItemInner}>
                <Image
                    classNames={{root: classes.cartImg}}
                    src={img}
                    h={90}
                    alt={title}
                />
                <div>
                    <Text fw={500}>{title}</Text>
                    <Text size="sm" c="dimmed">
                        {description}
                    </Text>
                    <div className={classes.btnWrapper}>
                        <span className={classes.amount}>{amount}</span>
                        <Button size="xs" variant="outline" onClick={() => removeOneItemFromCart(id)}>-</Button>
                        <Button size="xs" variant="outline" onClick={() => addOneItemToCart(id)}>+</Button>
                    </div>
                </div>
            </div>
            <Group gap="md" justify="space-between" align="center">
                <Button classNames={{root: classes.removeButton}}  onClick={() => removeFromCart(id)}>Remove from cart</Button>
                <Text>{price}$</Text>
            </Group>
        </Card>
    )
}