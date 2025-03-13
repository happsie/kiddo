import { useLocation, useNavigate } from "react-router";
import { useCallback } from "react";
import styles from './Menu.module.css';
import cls from 'classnames';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faList,
    faHouse,
    faGear,
} from '@fortawesome/free-solid-svg-icons'
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Color } from "../../utils/colors.ts";

export type MenuItem = {
    icon: IconDefinition,
    navigate: string;
    color?: string;
}

export type ContextMenuProps = {
    show: boolean;
    menuItems: MenuItem[];
}

export const Menu: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const isSelected = useCallback((path: string) => {
        return location.pathname == path;
    }, [location.pathname])

    return (
        <nav className={styles.nav}>
            <ol className={styles.navItems}>
                <li onClick={() => navigate('/settings')}
                    className={isSelected('/settings') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faGear} color={Color.SoftBlue} size={'lg'} />
                </li>
                <li onClick={() => navigate('/')}
                    className={isSelected('/') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faHouse} color={Color.Background} size={'lg'} />
                </li>

                <li onClick={() => navigate('/history')}
                    className={isSelected('/history') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faList} color={Color.Background} size={'lg'} />
                </li>
            </ol>
        </nav>
    );
}
