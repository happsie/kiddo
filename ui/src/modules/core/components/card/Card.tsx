import styles from './Card.module.css';
import cls from "classnames";

type CardSize = 'sm' | 'md' | 'lg';

export type CardProps = {
    children: React.JSX.Element | React.JSX.Element[];
    title?: React.JSX.Element;
    size?: CardSize;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({size = 'sm', className, title, onClick, children}) => {
    return (<div className={styles.cardParent} onClick={onClick}>
            <div className={cls(
                styles.card,
                className,
                {
                    [styles.sm]: size === 'sm',
                    [styles.md]: size === 'md',
                    [styles.lg]: size === 'lg'
                })}>
                {children}
            </div>
            {title ? <div className={styles.cardTitle}>{title}</div> : null}
        </div>
    )
}