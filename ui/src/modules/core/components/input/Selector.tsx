import styles from "./Selector.module.css"
import { Text } from "../typography/Typography";
import { Color } from "@core/utils/colors";
import { useState } from "react";
import cls from "classnames"

export type SelectorProps = {
    title: string;
    items: SelectItem[];
    onSelect: (item: SelectItem) => void;
}

export type SelectItem = {
    title: string;
    emoji: string;
}

export const Selector: React.FC<SelectorProps> = ({ title, items, onSelect }: SelectorProps) => {
    const [expand, setExpand] = useState(false);
    const [selected, setSelected] = useState<SelectItem | null>(null)

    function onSelectItem(item: SelectItem) {
        setSelected(item);
        setExpand(false);
        onSelect(item);
    }

    return (
        <div className={cls({
            [styles.selector]: true
        })} >
            <div className={cls({ [styles.selected]: true })} onClick={() => setExpand(!expand)}>
                <Text color={Color.TextDark} size="xs">{selected ? `${selected.title} ${selected.emoji}` : title}</Text>
            </div>
            <div className={cls(styles.items, { [styles.expanded]: expand === true })}>
                {expand && items.length > 0 ? items.map((item: SelectItem) => (
                    <div className={styles.item} onClick={() => onSelectItem(item)}>
                        <Text color={Color.TextDark} size="xs">{item.title}</Text> <span>{item.emoji}</span>
                    </div>
                )) : null
                }
            </div>
        </div>
    );
}
