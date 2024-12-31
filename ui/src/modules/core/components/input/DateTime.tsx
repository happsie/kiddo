import styles from './DateTime.module.css';

export const DateTimePicker = () => {
    return (
        <input className={styles.dateTime} type="datetime-local" defaultValue={new Date().toLocaleString()}/>
    )
}