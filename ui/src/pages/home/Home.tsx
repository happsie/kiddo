import { Card } from "@components/card/Card";
import { Container } from "@components/container/Container";
import { Text, Title } from "@components/typography/Typography";
import { Color } from "../../utils/colors";
import styles from "./Home.module.css";
import { Drawer } from "@components/drawer/Drawer";
import { Selector } from "@components/input/Selector";
import { Counter } from "@components/input/Counter";
import { Button } from "@components/button/Button";
import { TimePicker, TimeSelection } from "@components/input/TimePicker";
import { useMemo, useState } from "react";
import { useDrawer } from "@components/drawer/useDrawer";

function greetingMessage(): string {
    const now = new Date()
    if (now.getHours() < 12) {
        return "Good morning, Jesper ☀️";
    }
    if (now.getHours() < 17) {
        return "Good afternoon, Jesper 🌞";
    }
    return "Good evening, Jesper 🌕"
}

export const Home = () => {
    const currentDate = new Date();
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });
    const [toggled, toggle] = useDrawer();

    const selectedDate = useMemo(() => {
        const date = new Date();
        date.setHours(timeSelection.hours);
        date.setMinutes(timeSelection.minutes);
        return date;
    }, [timeSelection]);


    return (
        <Container>
            <div className={styles.hero}>
                <Title style="pacifico" color={Color.Text} size="xl">Home</Title>
                <Text color={Color.Text}>{greetingMessage()}</Text>
            </div>
            <div style={{ position: 'absolute', top: '20svh', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Card title="Food" size="md" onClick={() => toggle()}>
                    <span>🍲</span>
                </Card>
                <Card title="Bottle" size="md">
                    <span>🍼</span>
                </Card>
                <Card title="Sleep" size="md">
                    <span>😴</span>
                </Card>
                <Card title="Diapers" size="md">
                    <span>💩</span>
                </Card>
            </div>
            <Drawer isOpen={toggled} showCloseButton={true} toggle={toggle}>
                <div style={{ minHeight: '50svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <Selector onSelect={(item) => console.log(item)} title="Choose food" items={[{ title: 'Sandwich', emoji: '🥪' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }]} />
                        <TimePicker color={Color.Background} onChange={({ hours, minutes }) => {
                            setTimeSelection({ hours: hours, minutes: minutes });
                        }} />
                    </div>
                    <div>
                        <Text size="xs">How many portions?</Text>
                        <Counter onChange={(count) => console.log(count)}></Counter>
                    </div>
                    <Button onClick={() => []} color={Color.Primary}>Save</Button>
                </div>
            </Drawer>
        </Container>
    )
}
