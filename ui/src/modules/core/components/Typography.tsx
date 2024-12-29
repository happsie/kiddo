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
    const textSizeClass = getTextSizeClass(size);
    const animationClass = getAnimationClass(animation);
    const textStyleClass = getTextStyleClass(style);

    return (
        <h1 className={cls(textStyleClass, textSizeClass, animationClass)}
            style={{color: color ?? ''}}>{children}</h1>
    )
}

type TextProps = Omit<TitleProps, 'animation' | 'size'>

export const Text: React.FC<TextProps> = ({color, style = 'inter', children}) => {
    const textStyleClass = getTextStyleClass(style);
    return (
        <p className={cls(textStyleClass)} style={{color: color ?? ''}}>
            {children}
        </p>
    )
}

function getTextSizeClass(size: TextSize) {
    let textSize: string;
    switch (size) {
        case 'sm':
            textSize = styles.sm;
            break;
        case 'md':
            textSize = styles.md;
            break;
        case 'lg':
            textSize = styles.lg;
            break;
        case 'xl':
            textSize = styles.xl;
            break;
        default:
            textSize = styles.md;
    }
    return textSize;
}

function getAnimationClass(animationType?: TextAnimation) {
    let animation: string;
    switch (animationType) {
        case 'fade-in':
            animation = styles.fadeInAnimation;
            break;
        default:
            animation = '';
    }
    return animation;
}

function getTextStyleClass(style: TextStyle) {
    let textStyle: string;
    switch (style) {
        case 'pacifico':
            textStyle = styles.pacifico;
            break;
        case 'inter':
            textStyle = styles.inter;
            break;
        default:
            textStyle = styles.inter;
    }
    return textStyle;
}