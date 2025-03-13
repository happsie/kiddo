import styles from './Button.module.css';
import cls from "classnames";
import { Color } from "../../utils/colors.ts";

export interface Button {
    children: string | React.JSX.Element | React.JSX.Element[];
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'selector';
    color?: typeof Color[keyof typeof Color];
}

export const Button: React.FC<Button> = ({ onClick, color = Color.Primary, variant = 'primary', children }) => {
    let styling = {};

    if (variant === 'primary') {
        styling = {
            backgroundColor: color,
        };
    }
    if (variant === 'secondary') {
        styling = {
            border: `1px solid ${color}`,
            color: color
        };
    }

    return (
        <button onClick={onClick} className={cls(styles.button, {
            [styles.primary]: variant === 'primary',
            [styles.secondary]: variant === 'secondary',
            [styles.selector]: variant === 'selector',
        })} style={styling}>{children}</button>
    )
}
