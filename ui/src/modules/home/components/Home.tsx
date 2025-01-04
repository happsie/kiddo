import { Button } from "@core/components/button/Button";
import { TimePicker, TimeSelection } from "@core/components/input/TimePicker"
import { useEffect, useMemo, useState } from "react"

export const Home = () => {
    const currentDate = new Date();
    const [timeSelection, setTimeSelection] = useState<TimeSelection>({ hours: currentDate.getHours(), minutes: currentDate.getMinutes() });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        console.log(selectedDate);
    }, [timeSelection]);

    const selectedDate = useMemo(() => {
        const date = new Date();
        date.setHours(timeSelection.hours);
        date.setMinutes(timeSelection.minutes);
        return date;
    }, [timeSelection]);

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100svh'}}>
            <div style={{ position: 'relative'}}>
                <TimePicker isOpen={isOpen} onChange={({ hours, minutes }) => {
                    setTimeSelection({ hours: hours, minutes: minutes });
                }} />
                <Button onClick={() => setIsOpen(!isOpen)}>{`${selectedDate.getHours().toString().padStart(2, '0')}:${selectedDate.getMinutes().toString().padStart(2, '0')}`}</Button>
            </div>
        </div>
    )
}
