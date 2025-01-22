import { Title } from "@core/components/typography/Typography.tsx";
import { Container } from "@core/components/container/Container.tsx";
import { Color } from "@core/utils/colors.ts";
import { Card } from "@core/components/card/Card";
import { Drawer } from "@core/components/drawer/Drawer.tsx";
import styles from './Food.module.css';
import { useDrawer } from "@core/hooks/useDrawer.ts";
import { Button } from "@core/components/button/Button.tsx";
import { useEffect, useMemo, useState } from "react";
import { TimePicker, TimeSelection } from "@core/components/input/TimePicker";
import { Counter } from "@core/components/input/Counter";

type Item = {
    title: string,
    emoji: string,
    type: 'liquid' | 'food' | 'fruit',
    color: string
}

const initialItems: Item[] = [{
    title: 'Breastfeeding',
    type: 'liquid',
    emoji: '👩‍🍼',
    color: Color.SoftPurple
}, {
    title: 'Banana',
    type: 'fruit',
    emoji: '🍌',
    color: Color.SoftGreen
}, {
    title: 'Food',
    type: 'food',
    emoji: '🍲',
    color: Color.SoftBlue
}, {
    title: 'Bottle',
    type: 'liquid',
    emoji: '🍼',
    color: Color.SoftPurple
}];

export const Food = () => {
    const [isOpen, toggle] = useDrawer();
    const [items, setItems] = useState<Item[]>(initialItems);
    const currentDate = new Date();
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);
    const [portionCount, setPortionCount] = useState<number>(1);

    const selectedDate = useMemo(() => {
        const date = new Date();
        date.setHours(timeSelection.hours);
        date.setMinutes(timeSelection.minutes);
        return date;
    }, [timeSelection]);

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);

    function filter(type: string) {
        if (type === 'ALL') {
            setItems(initialItems);
            return;
        }
        setItems(initialItems.filter(item => item.type === type));
    }

    function handleCardClick(item: Item) {
        setSelectedItem(item);
        // Let's leave the drawer open instead of re-opening it doing unecessary animations
        //if (selectedItem && item.type === selectedItem?.type) {
            toggle();
        //}
    }

    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'} color={Color.LightText} style="pacifico">Track Food</Title>
            <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Button onClick={() => filter('ALL')} color={Color.SoftBlue} variant='secondary'>All</Button>
                <Button onClick={() => filter('liquid')} color={Color.SoftPurple} variant='secondary'>Liquid</Button>
                <Button onClick={() => filter('fruit')} color={Color.SoftGreen} variant='secondary'>Fruit</Button>
                <Button onClick={() => filter('food')} color={Color.SoftBlue} variant='secondary'>Food</Button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {items && items.map((item, index) => (<Card onClick={() => handleCardClick(item)} size={'md'}
                    title={item.title} color={item.color} key={index}>
                    <span>{item.emoji}</span>
                </Card>))}
            </div>
            <Drawer isOpen={isOpen} toggle={toggle}>
                <div className={styles.drawerContent}>
                    <Title color={Color.LightText}>{selectedItem !== null ? `${selectedItem.title} ${selectedItem.emoji}` : ''}</Title>
                    <div>
                        <Title size="sm" color={Color.LightText}>How many portions?</Title>
                        <Counter fontSize="md" onChange={count => setPortionCount(count)} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <TimePicker color={Color.Background} onChange={({ hours, minutes }) => {
                            setTimeSelection({ hours: hours, minutes: minutes });
                        }} />
                        <Button onClick={() => alert(`${portionCount} ${selectedDate.toString()} - ${JSON.stringify(selectedItem)}`)} color={Color.Primary}>Save</Button>
                    </div>
                </div>
            </Drawer>
        </Container>
    )
}
