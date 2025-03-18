import { Text, Title } from "@components/typography/Typography"
import { Color } from "../../utils/colors"
import styles from './History.module.css';
import { Card } from "@components/card/Card";

export const History = () => {

    const items: { name: string, emoji: string, type: string, time: string } = [{
        name: "Banana",
        emoji: "🍌",
        type: "Food",
        time: "2025-03-18 20:01"
    }, {
        name: "Sandwich",
        emoji: "🥪",
        type: "Food",
        time: "2025-03-18 10:01"
    }]

    return (
        <>
            <div className={styles.hero} style={{ marginBottom: '1em' }}>
                <Title style="pacifico" color={Color.Text} size="xl">History</Title>
            </div>
            {items.map((item, index: number) => (
                <Card size="wide" key={index}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '1em', minWidth: '100%'}}>
                        <Text size="xl">{item.emoji}</Text>
                        <Text size="xs">{item.name}</Text>
                        <Text size="xs">{item.time}</Text>
                    </div>
                </Card>
            ))}
        </>
    )
}
