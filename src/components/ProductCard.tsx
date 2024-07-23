import {addToCart, Product} from "../backend.ts";
import {Card, Text, Image, Badge, Group, useMantineTheme, Button} from "@mantine/core";

type ProductCardProps = (Product & {
    isCartOpened: boolean,
    setIsCartOpened: (arg: boolean) => void
})
export default function ProductCard({title, description, img, price, id, isCartOpened, setIsCartOpened}: ProductCardProps) {
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