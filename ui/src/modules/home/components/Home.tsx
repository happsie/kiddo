import { Card } from "@core/components/card/Card";
import { Container } from "@core/components/container/Container";
import { Text, Title } from "@core/components/typography/Typography";
import { Color } from "@core/utils/colors";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import { Drawer } from "@core/components/drawer/Drawer";
import { Selector } from "@core/components/input/Selector";

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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Selector title="Choose food" items={[{ title: 'Sandwich', emoji: '🥪' }, { title: 'Pear', emoji: '🍐' }]} />
                </div>
            </Drawer>
        </Container>
    )
}
