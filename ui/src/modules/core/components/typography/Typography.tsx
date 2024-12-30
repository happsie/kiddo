import styles from './Typography.module.css';
import cls from "classnames";

type TextSize = 'sm' | 'md' | 'lg' | 'xl';

type TextAnimation = 'fade-in';

type TextStyle = 'pacifico' | 'inter';

export type TitleProps = {
    children: string;
    color?: string;
    size?: TextSize;
    animation?: TextAnimation;
    style?: TextStyle;
}

export const Title: React.FC<TitleProps> = ({color, size = 'lg', animation, style = 'pacifico', children}) => {
    return (
        <h1 className={cls({
                [styles.sm]: size === 'sm',
                [styles.md]: size === 'md',
                [styles.lg]: size === 'lg',
                [styles.xl]: size === 'xl',
            },
            {
                [styles.pacifico]: style === 'pacifico',
                [styles.inter]: style === 'inter'
            },
            {
                [styles.fadeInAnimation]: animation === 'fade-in'
            })}
            style={{color: color ?? ''}}>{children}</h1>
    )
}

type TextProps = Omit<TitleProps, 'animation' | 'size'>

export const Text: React.FC<TextProps> = ({color, style = 'inter', children}) => {
    return (
        <p className={cls({
            [styles.pacifico]: style === 'pacifico',
            [styles.inter]: style === 'inter'
        },)} style={{color: color ?? ''}}>
            {children}
        </p>
    )
}