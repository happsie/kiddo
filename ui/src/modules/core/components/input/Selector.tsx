import styles from "./Selector.module.css"
import { Text } from "../typography/Typography";
import { Color } from "@core/utils/colors";
import { useState } from "react";
import cls from "classnames"

export type SelectorProps = {
    title: string;
    items: {
        title: string;
        emoji: string;
    }[]
}

export const Selector: React.FC<SelectorProps> = ({ title, items }: SelectorProps) => {
    const [expand, setExpand] = useState(false);

    return (
        <div className={cls({
            [styles.selector]: true
        })} onClick={() => setExpand(!expand)}>
            <div className={cls({ [styles.selected]: true }, { [styles.expanded]: expand === true })}>
                <Text color={Color.TextDark} size="xs">{title}</Text>
            </div>
            {expand && items.length > 0 ? items.map(item => (
                <div className={styles.item}>
                    {item.emoji} {item.title}
                </div>
            )) : null
           }
        </div>
    );
}
