import styles from './Card.module.css';
import cls from "classnames";
import { Text } from "@core/components/typography/Typography.tsx";
import { Color } from "@core/utils/colors.ts";

type CardSize = 'sm' | 'md' | 'lg';

export type CardProps = {
    children: React.JSX.Element | React.JSX.Element[];
    color?: typeof Color[keyof typeof Color];
    title?: string;
    size?: CardSize;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    size = 'sm',
    className,
    title,
    color = Color.Background,
    onClick,
    children
}) => {
    return (<div className={styles.cardParent} onClick={onClick}>
        <div className={cls(
            styles.card,
            className,
            {
                [styles.sm]: size === 'sm',
                [styles.md]: size === 'md',
                [styles.lg]: size === 'lg'
            })} style={{ borderColor: color }}>
            {children}
        </div>
        {title ? <Text color={Color.TextDark}>{title}</Text> : null}
    </div>
    )
}
