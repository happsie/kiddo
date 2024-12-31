import styles from './Drawer.module.css';
import cls from "classnames";
import {useEffect, useState} from "react";

export type DrawerState = boolean | undefined;

export type DrawerProps = {
    children: React.JSX.Element | React.JSX.Element[];
    isOpen: DrawerState;
}

export const Drawer: React.FC<DrawerProps> = ({isOpen, children}) => {
    const [animation, setAnimation] = useState<string>('')

    useEffect(() => {
        if (isOpen !== undefined) {
            setAnimation(isOpen ? styles.drawerOpen : styles.drawerClose)
        }
    }, [isOpen])

    return (
        <aside className={cls(styles.drawer, animation)}>
            {children}
        </aside>
    )
}