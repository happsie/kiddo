import { useState } from 'react';
import { Button } from '../button/Button';
import { Text, TextSize } from '../typography/Typography';
import styles from './Counter.module.css';

export type CounterProps = {
    fontSize: TextSize;
}

export const Counter: React.FC<CounterProps> = ({ fontSize }) => {
    const [count, setCount] = useState(1);

    function handleIncrease() {
        setCount(count + 1);
    }

    function handleDecrease() {
        setCount(count - 1);
    }

    return (
        <div className={styles.counter}>
            <Button variant='secondary' onClick={handleDecrease}>-</Button>
            <Text size={fontSize}>{count.toString()}</Text>
            <Button onClick={handleIncrease}>+</Button>
        </div>
    )
}