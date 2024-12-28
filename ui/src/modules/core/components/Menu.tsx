import {useLocation, useNavigate} from "react-router";
import {useCallback, useEffect, useMemo, useState} from "react";
import styles from './Menu.module.css';
import cls from 'classnames';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faList,
    faHouse,
    faPersonBreastfeeding,
    faUtensils,
    faPoop,
    faBed,
    faCapsules,
    faGear,
    faChartLine
} from '@fortawesome/free-solid-svg-icons'
import {IconDefinition} from "@fortawesome/fontawesome-svg-core";

export type MenuItem = {
    icon: IconDefinition,
    navigate: string;
    color?: string;
}

export type ContextMenuProps = {
    show: boolean;
    menuItems: MenuItem[];
}

const ContextMenu: React.FC<ContextMenuProps> = ({show, menuItems}) => {
    const navigate = useNavigate();
    return (
        <ol className={styles.trackMenu} style={{display: show ? 'flex' : 'none'}}>
            {menuItems.map((item, index) => (
                <li key={index} className={styles.trackMenuItem} onClick={() => navigate(item.navigate)}>
                    <FontAwesomeIcon icon={item.icon} color={item.color ?? '#f9ecf9'}/>
                </li>
            ))}
        </ol>
    );
}

export const Menu: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showTrackMenu, setShowTrackMenu] = useState(false);

    const isSelected = useCallback((path: string) => {
        return location.pathname == path;
    }, [location.pathname])

    useEffect(() => {
        setShowTrackMenu(false);
    }, [location.pathname]);

    // TODO: Leave this as memo, we will probably have menu items loaded from user settings later
    const trackMenuItems = useMemo<MenuItem[]>(() => ([
        {
            icon: faCapsules,
            navigate: '/track/medicin'
        },
        {
            icon: faBed,
            navigate: '/track/sleep'
        },
        {
            icon: faUtensils,
            navigate: '/track/food'
        },
        {
            icon: faPersonBreastfeeding,
            navigate: '/track/breast-feeding'
        },
        {
            icon: faPoop,
            navigate: '/track/poop'
        }
    ]), [])

    return (
        <nav className={styles.nav}>
            <ol className={styles.navItems}>
                <li onClick={() => navigate('/settings')}
                    className={isSelected('/settings') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faGear} color={'#f9ecf9'}/>
                </li>
                <li onClick={() => navigate('/statistics')}
                    className={isSelected('/statistics') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faChartLine} color={'#f9ecf9'}/>
                </li>
                <li className={showTrackMenu ? cls(styles.navItem, styles.contextMenuSelected) : styles.navItem}
                    onClick={() => setShowTrackMenu(!showTrackMenu)}>
                    <FontAwesomeIcon icon={faPlus} color={'#f9ecf9'}
                                     className={showTrackMenu ? styles.trackMenuOpen : styles.trackMenuClose}/>
                    <ContextMenu show={showTrackMenu} menuItems={trackMenuItems}/>
                </li>
                <li onClick={() => navigate('/history')}
                    className={isSelected('/history') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faList} color={'#f9ecf9'}/>
                </li>
                <li onClick={() => navigate('/')}
                    className={isSelected('/') ? cls(styles.navItem, styles.selected) : styles.navItem}>
                    <FontAwesomeIcon icon={faHouse} color={'#f9ecf9'}/>
                </li>
            </ol>
        </nav>
    );
}