import styles from "./Selector.module.css"
import { Text } from "../typography/Typography";
import { Color } from "../../utils/colors";
import { useState } from "react";
import cls from "classnames"

export type SelectorProps = {
    title: string;
    items: SelectItem[];
    onSelect: (item: SelectItem) => void;
}

export type SelectItem = {
    name: string;
    emoji: string;
}

export const Selector: React.FC<SelectorProps> = ({ title: name, items, onSelect }: SelectorProps) => {
    const [expand, setExpand] = useState(false);
    const [selected, setSelected] = useState<SelectItem | null>(null)

    function onSelectItem(item: SelectItem) {
        setSelected(item);
        setExpand(false);
        onSelect(item);
    }

    return (
        <div className={styles.selector}>
            <div className={styles.selected} onClick={() => setExpand(!expand)}>
                <Text color={Color.TextDark} size="xs">{selected ? `${selected.name} ${selected.emoji}` : name}</Text>
            </div>
            <div className={cls(styles.items, { [styles.expanded]: expand === true })}>
                {expand && items.length > 0 ? items.map((item: SelectItem, index: number) => (
                    <div className={styles.item} onClick={() => onSelectItem(item)} key={index}> 
                        <Text color={Color.TextDark} size="xs">{item.name}</Text> <span>{item.emoji}</span>
                    </div>
                )) : null
                }
            </div>
        </div>
    );
}
