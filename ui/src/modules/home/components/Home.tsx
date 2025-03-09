import { Card } from "@core/components/card/Card";
import { Container } from "@core/components/container/Container";
import { Text, Title } from "@core/components/typography/Typography";
import { Color } from "@core/utils/colors";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import { Drawer } from "@core/components/drawer/Drawer";
import { Selector } from "@core/components/input/Selector";
import { Counter } from "@core/components/input/Counter";
import { Button } from "@core/components/button/Button";
import { TimePicker, TimeSelection } from "@core/components/input/TimePicker";
import { useMemo, useState } from "react";

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
    const navigate = useNavigate();
    const currentDate = new Date();
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });

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
                <Card title="Food" size="md" onClick={() => navigate('/track/food')}>
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
            <Drawer isOpen={true} showCloseButton={true}>
                <div style={{ minHeight: '50svh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Selector onSelect={(item) => console.log(item)} title="Choose food" items={[{ title: 'Sandwich', emoji: '🥪' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }, { title: 'Pear', emoji: '🍐' }]} />
                    <Counter onChange={(count) => console.log(count)}></Counter>
                    <TimePicker color={Color.Background} onChange={({ hours, minutes }) => {
                        setTimeSelection({ hours: hours, minutes: minutes });
                    }} />
                    <Button onClick={() => []} color={Color.Primary}>Save</Button>
                </div>
            </Drawer>
        </Container>
    )
}
