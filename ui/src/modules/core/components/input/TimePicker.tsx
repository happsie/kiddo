import { useEffect, useRef, useState } from 'react';
import { Text } from '../typography/Typography';
import styles from './TimePicker.module.css';
import { Button } from '../button/Button';
import { Color } from '@core/utils/colors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const minutes = [...Array(60).keys()];
const hours = [...Array(24).keys()];

export type TimeSelection = {
    hours: number;
    minutes: number;
}

export type TimePickerProps = {
    color?: typeof Color[keyof typeof Color];
    hour?: number;
    minute?: number;
    onChange: (timeSelection: TimeSelection) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({ hour = new Date().getHours(), minute = new Date().getMinutes(), color = Color.Secondary, onChange }) => {
    const [selectedTime, setSelectedTime] = useState<TimeSelection>({
        hours: hour,
        minutes: minute,
    });
    const [isOpen, setIsOpen] = useState(false);

    function handleSelectTime(values: Partial<TimeSelection>): void {
        const newSelectedTime = { ...selectedTime, ...values };
        setSelectedTime(newSelectedTime);
        onChange(newSelectedTime);
    }

    function ListItem({ selected, item, onClick }: { selected: boolean, item: number, onClick: () => void }) {
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

    function getButtonContent() {
        if (isOpen) {
            return <FontAwesomeIcon icon={faPlus} color={color}
                className={styles.timePickerOpen}
                size={'lg'} />
        }
        return `${selectedTime.hours.toString().padStart(2, '0')}:${selectedTime.minutes.toString().padStart(2, '0')}`
    }

    return (
        <div className={styles.timePickerParent}>
            <div className={styles.timePicker} style={{ display: isOpen ? 'flex' : 'none', backgroundColor: color }}>
                <ol>
                    {hours.map(hour => <ListItem selected={hour === selectedTime.hours} key={hour} item={hour} onClick={() => handleSelectTime({ hours: hour })} />)}
                </ol>
                <ol>
                    {minutes.map(minute => <ListItem selected={minute === selectedTime.minutes} key={minute} item={minute} onClick={() => handleSelectTime({ minutes: minute })} />)}
                </ol>
            </div>
            <Button variant="secondary" color={Color.Primary} onClick={() => setIsOpen(!isOpen)}>{getButtonContent()}</Button>
        </div>
    )
}