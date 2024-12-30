import {Text, Title} from "../../core/components/typography/Typography.tsx";
import {Container} from "../../core/components/container/Container.tsx";

export const Food = () => {
    return (
        <Container>
            <Title size={'xl'} animation={'fade-in'}>Track Food</Title>
            <Text>What type of food would you like to track?</Text>
        </Container>
    )
}