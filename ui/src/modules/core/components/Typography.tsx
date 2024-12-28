import styles from './Typography.module.css';
import cls from "classnames";

type TextSize = 'sm' | 'md' | 'lg' | 'xl';

type TextAnimation = 'fade-in';

type TextStyle = 'pacifico';

export type TitleProps = {
    children: string;
    color?: string;
    size?: TextSize;
    animation?: TextAnimation;
    style?: TextStyle;
}

export const Title: React.FC<TitleProps> = ({color, size = 'md', animation, style = 'pacifico', children}) => {
    const textSizeClass = getTextSizeClass(size);
    const animationClass = getAnimationClass(animation);
    const textStyleClass = getTextStyleClass(style);

    return (
        <h1 className={cls(textStyleClass, textSizeClass, animationClass)}
            style={{color: color ?? ''}}>{children}</h1>
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
        default:
            textStyle = styles.pacifico;
    }
    return textStyle;
}