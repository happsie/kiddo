import {Text, Title} from "@core/components/typography/Typography.tsx";
import {Container} from "@core/components/container/Container.tsx";
import {Color} from "@core/utils/colors.ts";
import {Card} from "@core/components/card/Card";
import {useState} from "react";
import {Drawer} from "@core/components/drawer/Drawer.tsx";
import styles from './Food.module.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from '@fortawesome/free-solid-svg-icons'

export const Food = () => {
    const [showDrawer, setShowDrawer] = useState(false);
    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'}>Select Food</Title>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                <Card onClick={() => setShowDrawer(!showDrawer)} size={'md'}
                      title={<Text color={Color.Primary}>Breastfeeding</Text>}>
                    <span>👩‍🍼</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Banana</Text>}>
                    <span>🍌</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Food</Text>}>
                    <span>🍲</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Bottle</Text>}>
                    <span>🍼</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Breastfeeding</Text>}>
                    <span>👩‍🍼</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Banana</Text>}>
                    <span>🍌</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Food</Text>}>
                    <span>🍲</span>
                </Card>
                <Card size={'md'} title={<Text color={Color.Primary}>Bottle</Text>}>
                    <span>🍼</span>
                </Card>
            </div>
            <Drawer show={showDrawer}>
                <div className={styles.drawerContent}>
                    <div className={styles.drawerHeader}>
                        <Title color={Color.Background} style={'inter'}>Enter details</Title>
                        <FontAwesomeIcon icon={faClose} color={Color.Background} className={styles.drawerClose}
                                         onClick={() => setShowDrawer(false)} size={'lg'}/>
                    </div>
                </div>
            </Drawer>
        </Container>
    )
}