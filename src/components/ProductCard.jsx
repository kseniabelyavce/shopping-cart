import {addToCart} from "../backend.js";
import {Card, Text, Image, Badge, Group, useMantineTheme, Button} from "@mantine/core";

export default function ProductCard({title, description, img, amount, price, id, isCartOpened, setIsCartOpened}) {
    const theme = useMantineTheme();

    function onAddToCart() {
        if (!isCartOpened) {
            setIsCartOpened(true)
        }
        addToCart(id)
    }

    return (
        <Card withBorder radius="md" shadow="sm" padding="lg">
            <Card.Section>
                <Image
                    src={img}
                    height={160}
                    alt={title}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title}</Text>
                <Badge color={theme.colors.greyBlue[7]}>{price}$</Badge>
            </Group>

            <Text size="sm" c="dimmed">
                {description}
            </Text>

            <Button color="blue" mt="md" radius="md"  onClick={onAddToCart}>
                Add to cart
            </Button>
        </Card>
    )
}