import styles from './Container.module.css';

export type ContainerProps = {
    children: React.JSX.Element[];
}

/**
 * Container is the core of a page setting up a default margin and centers the child content on the screen.
 *
 * @param {React.JSX.Element} children - child components to be rendered within the container
 */
export const Container: React.FC<ContainerProps> = ({ children }) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    )
}