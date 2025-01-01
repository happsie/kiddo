import styles from './Button.module.css';
import cls from "classnames";
import {Color} from "@core/utils/colors.ts";

export interface Button {
    children: string;
    onClick: () => void;
    color?: typeof Color[keyof typeof Color];
}

export const PrimaryButton: React.FC<Button> = ({onClick, color = Color.Primary, children}) => {
    return (
        <button onClick={onClick} className={cls(styles.button, styles.primary)}
                style={{backgroundColor: color}}>{children}</button>
    )
}

export const SecondaryButton: React.FC<Button> = ({color = Color.Secondary, onClick, children}) => {
    return (
        <button onClick={onClick} className={cls(styles.button, styles.secondary)}
                style={{border: `1px solid ${color}`, color: color}}>{children}</button>
    )
}