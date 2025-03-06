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
import { useMutation, useQuery } from "react-query";
import { deleteTrackType, fetchTrackingTypes } from "../queries/tracking";
import { TrackType } from "../tracking";

export const Food = () => {
    const [isOpen, toggle] = useDrawer();
    const currentDate = new Date();
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });
    const [selectedItem, setSelectedItem] = useState<TrackType | null>(null);
    const [portionCount, setPortionCount] = useState<number>(1);


    const { data } = useQuery({
        queryKey: ['trackTypes'],
        queryFn: fetchTrackingTypes,
    });

    const mutation = useMutation({
        mutationFn: (id: number) => {
            return deleteTrackType(id)
        }
    })

    const selectedDate = useMemo(() => {
        const date = new Date();
        date.setHours(timeSelection.hours);
        date.setMinutes(timeSelection.minutes);
        return date;
    }, [timeSelection]);

    useEffect(() => {
        console.log(selectedDate);
    }, [selectedDate]);


    function handleCardClick(item: TrackType) {
        setSelectedItem(item);
        if (isOpen) {
            return
        }
        toggle()
    }

    function onDelete() {
        if (!selectedItem) {
            return
        }
        mutation.mutate(selectedItem.id)
    }

    console.log(data)
    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'} color={Color.LightText} style="pacifico">Track Food</Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {data && data.map((item: TrackType, index: number) => (<Card onClick={() => handleCardClick(item)} size={'md'}
                    title={item.name} color={item.color} key={index}>
                    <span>{item.emoji}</span>
                </Card>))}
            </div>
            <Drawer isOpen={isOpen} toggle={toggle}>
                <div className={styles.drawerContent}>
                    <Title color={Color.LightText}>{selectedItem !== null ? `${selectedItem.name} ${selectedItem.emoji}` : ''}</Title>
                    <div>
                        <Title size="sm" color={Color.LightText}>How many portions?</Title>
                        <Counter fontSize="md" onChange={count => setPortionCount(count)} />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <TimePicker color={Color.Background} onChange={({ hours, minutes }) => {
                            setTimeSelection({ hours: hours, minutes: minutes });
                        }} />
                        <Button onClick={() => alert(`${portionCount} ${selectedDate.toString()} - ${JSON.stringify(selectedItem)}`)} color={Color.Primary}>Save</Button>
                        <Button variant="secondary" onClick={onDelete}>Delete</Button>
                    </div>
                </div>
            </Drawer>
        </Container>
    )
}
