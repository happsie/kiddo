import styles from './Button.module.css';
import cls from "classnames";
import { Color } from "@core/utils/colors.ts";

export interface Button {
    children: string | React.JSX.Element | React.JSX.Element[];
    onClick: () => void;
    variant?: 'primary' | 'secondary'
    color?: typeof Color[keyof typeof Color];
}

export const Button: React.FC<Button> = ({ onClick, color = Color.Primary, variant = 'primary', children }) => {
    const primaryStyling = {
        backgroundColor: color,
    }
    const secondaryStyling = {
        border: `1px solid ${color}`,
        color: color
    }
    return (
        <button onClick={onClick} className={cls(styles.button, {
            [styles.primary]: variant === 'primary',
            [styles.secondary]: variant === 'secondary',
        })}
            style={variant === 'primary' ? primaryStyling : secondaryStyling}>{children}</button>
    )
}
