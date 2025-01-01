import {Title} from "@core/components/typography/Typography.tsx";
import {Container} from "@core/components/container/Container.tsx";
import {Color} from "@core/utils/colors.ts";
import {Card} from "@core/components/card/Card";
import {Drawer} from "@core/components/drawer/Drawer.tsx";
import styles from './Food.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from '@fortawesome/free-solid-svg-icons'
import {useDrawer} from "@core/hooks/useDrawer.ts";
import {DateTimePicker} from "@core/components/input/DateTime.tsx";
import {SecondaryButton, PrimaryButton} from "@core/components/button/Button.tsx";
import {useState} from "react";

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

    const filter = (type: string) => {
        if (type === 'ALL') {
            setItems(initialItems);
            return;
        }
        setItems(initialItems.filter(item => item.type === type));
    }

    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'} color={Color.LightText}>Track Food</Title>
            <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                <SecondaryButton onClick={() => filter('ALL')} color={Color.SoftBlue}>All</SecondaryButton>
                <SecondaryButton onClick={() => filter('liquid')} color={Color.SoftPurple}>Liquid</SecondaryButton>
                <SecondaryButton onClick={() => filter('fruit')} color={Color.SoftGreen}>Fruit</SecondaryButton>
                <SecondaryButton onClick={() => filter('food')} color={Color.SoftBlue}>Food</SecondaryButton>
            </div>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                {items && items.map((item, index) => (<Card onClick={toggle} size={'md'}
                                                            title={item.title} color={item.color} key={index}>
                    <span>{item.emoji}</span>
                </Card>))}
            </div>
            <Drawer isOpen={isOpen}>
                <div className={styles.drawerContent}>
                    <div className={styles.drawerHeader}>
                        <FontAwesomeIcon icon={faClose} color={Color.Background} className={styles.drawerClose}
                                         onClick={toggle} size={'lg'}/>
                    </div>
                    <Title style={'pacifico'}>Here goes some content!</Title>
                    <DateTimePicker />
                </div>
            </Drawer>
        </Container>
    )
}

/*
 * <Text>When did it happen?</Text>
                    <DateTimePicker/>
                    <Text>How many portions?</Text>
 */