import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Drawer.module.css';
import cls from "classnames";
import {useEffect, useState} from "react";
import { Color } from '@core/utils/colors';
import { faClose } from '@fortawesome/free-solid-svg-icons'

export type DrawerState = boolean | undefined;

export type DrawerProps = {
    children: React.JSX.Element | React.JSX.Element[];
    isOpen: DrawerState;
    showCloseButton?: boolean;
    toggle?: () => void;
}

export const Drawer: React.FC<DrawerProps> = ({isOpen, showCloseButton = true, toggle, children}) => {
    const [animation, setAnimation] = useState<string>('')

    useEffect(() => {
        if (isOpen !== undefined) {
            setAnimation(isOpen ? styles.drawerOpen : styles.drawerClose)
        }
    }, [isOpen])

    return (
        <aside className={cls(styles.drawer, animation)}>
            {showCloseButton ?
            (<div className={styles.drawerTop}>
                <FontAwesomeIcon icon={faClose} color={Color.Light}
                        onClick={toggle} size={'lg'}/>
                </div>) : null}
            {children}
        </aside>
    )
}