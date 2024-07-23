import classes from "./Header.module.css";
import { IconShoppingCart } from '@tabler/icons-react';
import {ActionIcon, Title} from "@mantine/core";

type HeaderProps = {
    isCartOpened: boolean,
    setIsCartOpened: (arg: boolean) => void
}
export default function Header({isCartOpened, setIsCartOpened}: HeaderProps) {
    return (
        <header className={classes.header}>
            <Title className={classes.title}>Your store</Title>
            <ActionIcon color="black" className={classes.iconWrapper} variant="transparent" size="xl" onClick={() => setIsCartOpened(!isCartOpened)}>
                <IconShoppingCart className={classes.icon}/>
            </ActionIcon>
        </header>
    )
}
