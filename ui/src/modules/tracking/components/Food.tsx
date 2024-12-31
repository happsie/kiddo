import {Text, Title} from "@core/components/typography/Typography.tsx";
import {Container} from "@core/components/container/Container.tsx";
import {Color} from "@core/utils/colors.ts";
import {Card} from "@core/components/card/Card";
import {Drawer} from "@core/components/drawer/Drawer.tsx";
import styles from './Food.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from '@fortawesome/free-solid-svg-icons'
import {useDrawer} from "@core/hooks/useDrawer.ts";
import {DateTimePicker} from "@core/components/input/DateTime.tsx";

export const Food = () => {
    const [isOpen, toggle] = useDrawer();
    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'}>Select Food</Title>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <Card onClick={toggle} size={'md'}
                      title={"Breastfeeding"}>
                    <span>👩‍🍼</span>
                </Card>
                <Card size={'md'} title={"Banana"}>
                    <span>🍌</span>
                </Card>
                <Card size={'md'} title={"Food"}>
                    <span>🍲</span>
                </Card>
                <Card size={'md'} title={"Bottle"}>
                    <span>🍼</span>
                </Card>
            </div>
            <Drawer isOpen={isOpen}>
                <div className={styles.drawerContent}>
                    <div className={styles.drawerHeader}>
                        <FontAwesomeIcon icon={faClose} color={Color.Background} className={styles.drawerClose}
                                         onClick={toggle} size={'lg'}/>
                    </div>
                    <Text>When did it happen?</Text>
                    <DateTimePicker/>
                    <Text>How many portions?</Text>
                </div>
            </Drawer>
        </Container>
    )
}