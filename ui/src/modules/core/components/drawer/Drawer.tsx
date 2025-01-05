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
    color?: typeof Color[keyof typeof Color];
}

export const Drawer: React.FC<DrawerProps> = ({isOpen, showCloseButton = true, toggle, color = Color.Accent, children}) => {
    const [animation, setAnimation] = useState<string>('')

    useEffect(() => {
        if (isOpen !== undefined) {
            setAnimation(isOpen ? styles.drawerOpen : styles.drawerClose)
        }
    }, [isOpen])

    return (
        <aside className={cls(styles.drawer, animation)} style={{ border: `3px solid ${color}`, borderBottom: 'none'}}>
            {showCloseButton ?
            (<div className={styles.drawerTop}>
                <FontAwesomeIcon icon={faClose} color={Color.Light}
                        onClick={toggle} size={'lg'}/>
                </div>) : null}
            <div style={{ minHeight: '100%'}}>
                {children}
            </div>
        </aside>
    )
}