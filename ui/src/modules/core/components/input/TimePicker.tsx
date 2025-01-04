import { useEffect, useRef, useState } from 'react';
import { Text } from '../typography/Typography';
import styles from './TimePicker.module.css';

const minutes = [...Array(60).keys()];
const hours = [...Array(24).keys()];

export type TimeSelection = {
    hours: number;
    minutes: number;
}

export type TimePickerProps = {
    isOpen: boolean;
    hour?: number;
    minute?: number;
    onChange: (timeSelection: TimeSelection) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ hour = new Date().getHours(), minute = new Date().getMinutes(), isOpen, onChange }) => {
    const [selectedTime, setSelectedTime] = useState<TimeSelection>({
        hours: hour,
        minutes: minute,
    });
    function handleSelectTime(values: Partial<TimeSelection>): void {
        const newSelectedTime = { ...selectedTime, ...values };
        setSelectedTime(newSelectedTime);
        onChange(newSelectedTime);
    }

    const ListItem = ({ selected, item, onClick }: { selected: boolean, item: number, onClick: () => void }) => {
        const liRef = useRef<HTMLLIElement | null>(null);

        useEffect(() => {
            const { current } = liRef;
            let timeout = undefined;
            if (selected && current !== null) {
                // Why do we need to do this?
                timeout = setTimeout(() => {
                    current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                }, 100)
            }
            return () => clearTimeout(timeout)
        }, [liRef]);

        return <li onClick={onClick} ref={liRef} className={selected ? styles.selected : ''}><Text>{item.toString().padStart(2, '0')}</Text></li>
    }

    return (
        <div className={styles.timePicker} style={{display: isOpen ? 'flex' : 'none'}}>
            <ol>
                {hours.map(hour => <ListItem selected={hour === selectedTime.hours} key={hour} item={hour} onClick={() => handleSelectTime({ hours: hour })} />)}
            </ol>
            <ol>
                {minutes.map(minute => <ListItem selected={minute === selectedTime.minutes} key={minute} item={minute} onClick={() => handleSelectTime({ minutes: minute })} />)}
            </ol>
        </div>
    )
}