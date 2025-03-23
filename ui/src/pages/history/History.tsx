import { Text } from "@components/typography/Typography"
import { Card } from "@components/card/Card";
import { Container } from "@components/container/Container";

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
        <Container>
            <div style={{ minWidth: '100%', padding: '.5em' }}>
                <Text align="center" style="pacifico">Today</Text>
                {items.map((item, index: number) => (
                    <Card size="wide" key={index}>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '1em', minWidth: '100%' }}>
                            <Text size="xs">{item.emoji}</Text>
                            <Text size="xs">{item.name}</Text>
                            <Text size="xs">{item.time}</Text>
                        </div>
                    </Card>
                ))}
            </div>
            <div style={{ minWidth: '100%', padding: '.5em' }}>
                <Text align="center" style="pacifico">Yesterday</Text>
                {items.map((item, index: number) => (
                    <Card size="wide" key={index}>
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '1em', minWidth: '100%' }}>
                            <Text size="xs">{item.emoji}</Text>
                            <Text size="xs">{item.name}</Text>
                            <Text size="xs">{item.time}</Text>
                        </div>
                    </Card>
                ))}
            </div>
        </Container>
    )
}
