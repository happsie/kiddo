import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Drawer.module.css';
import cls from "classnames";
import { useEffect, useState } from "react";
import { Color } from '../../utils/colors';
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { Text } from '../typography/Typography';

export type DrawerState = boolean | undefined;

export type DrawerProps = {
    children: React.JSX.Element | React.JSX.Element[];
    isOpen: DrawerState;
    showCloseButton?: boolean;
    toggle?: () => void;
    color?: typeof Color[keyof typeof Color];
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, showCloseButton = true, toggle, color = Color.Primary, children }) => {
    const [animation, setAnimation] = useState<string>('')

    useEffect(() => {
        if (isOpen !== undefined) {
            setAnimation(isOpen ? styles.drawerOpen : styles.drawerClose)
        }
    }, [isOpen])

    return (
        <aside className={cls(styles.drawer, animation)}>
            <div className={styles.header}>
                <div />
                <div>
                    <Text align='center'>Food details</Text>
                </div>
                {showCloseButton ?
                    (<div>
                        <FontAwesomeIcon icon={faClose} color={Color.Primary}
                            onClick={toggle} size={'xl'} className={styles.closeIcon} />
                    </div>) : <div />}
            </div>
            {children}
        </aside>
    )
}
