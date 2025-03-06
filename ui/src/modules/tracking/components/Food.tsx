import { Title } from "@core/components/typography/Typography.tsx";
import { Container } from "@core/components/container/Container.tsx";
import { Color } from "@core/utils/colors.ts";
import { Card } from "@core/components/card/Card";
import { Drawer } from "@core/components/drawer/Drawer.tsx";
import styles from './Food.module.css';
import { useDrawer } from "@core/hooks/useDrawer.ts";
import { Button } from "@core/components/button/Button.tsx";
import { useMemo, useState } from "react";
import { TimePicker, TimeSelection } from "@core/components/input/TimePicker";
import { Counter } from "@core/components/input/Counter";
import { useMutation, useQuery } from "react-query";
import { createTrackType, deleteTrackType, fetchTrackingTypes } from "../queries/tracking";
import { TrackType, TrackTypeRequest } from "../tracking";

export const Food = () => {
    const [isOpen, toggle] = useDrawer();
    const currentDate = new Date();
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });
    const [selectedItem, setSelectedItem] = useState<TrackType | null>(null);
    const [portionCount, setPortionCount] = useState<number>(1);
    const [isOpen2, toggle2] = useDrawer(); // TODO: better name
    const [newItem, setNewItem] = useState<TrackTypeRequest>({}) // TODO: better name

    const { data } = useQuery({
        queryKey: ['trackTypes'],
        queryFn: fetchTrackingTypes,
    });

    const deleteMutation = useMutation({
        mutationFn: (id: number) => {
            return deleteTrackType(id)
        }
    })

    const createMutation = useMutation({
        mutationFn: (request: TrackTypeRequest) => {
            return createTrackType(request)
        }
    })


    const selectedDate = useMemo(() => {
        const date = new Date();
        date.setHours(timeSelection.hours);
        date.setMinutes(timeSelection.minutes);
        return date;
    }, [timeSelection]);

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
        deleteMutation.mutate(selectedItem.id)
    }

    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'} color={Color.LightText} style="pacifico">Track Food</Title>
            <Button variant="primary" onClick={toggle2}>Create</Button>
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
            <Drawer isOpen={isOpen2} toggle={toggle2}>
                <div className={styles.drawerContent}>
                    <Title color={Color.LightText}>Create new track item</Title>
                    <div>
                        <Title size="sm" color={Color.LightText}>Name</Title>
                        <input type="text" placeholder="Name" onChange={e => setNewItem({ ...newItem, name: e.currentTarget.value })}></input>
                    </div>
                    <div>
                        <Title size="sm" color={Color.LightText}>Emoji</Title>
                        <input type="text" placeholder="Emoji" onChange={e => setNewItem({ ...newItem, emoji: e.currentTarget.value })}></input>
                    </div>
                    <div>
                        <Title size="sm" color={Color.LightText}>Color</Title>
                        <input type="text" placeholder="Color" onChange={e => setNewItem({ ...newItem, color: e.currentTarget.value })}></input>
                    </div>
                    <div>
                        <Title size="sm" color={Color.LightText}>Metric type</Title>
                        <input type="text" placeholder="Metric type" onChange={e => setNewItem({ ...newItem, metricType: 'this' })}></input>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Button onClick={() => {
                            createMutation.mutate(newItem)
                            toggle2()
                        }} color={Color.Primary}>Create</Button>
                    </div>
                </div>
            </Drawer>
        </Container>
    )
}
