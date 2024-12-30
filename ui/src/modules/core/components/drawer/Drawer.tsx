import styles from './Drawer.module.css';
import cls from "classnames";

export type DrawerProps = {
    children: React.JSX.Element | React.JSX.Element[];
    show: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({show, children}) => {
    return (
        <aside className={cls(styles.drawer, {[styles.drawerOpen]: show, [styles.drawerClose]: !show})}>
            {children}
        </aside>
    )
}