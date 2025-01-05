import { Title } from "@core/components/typography/Typography";
import { Color } from "@core/utils/colors";

export const Home = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100svh'}}>
            <Title style="pacifico" color={Color.LightText}>Home</Title>
        </div>
    )
}
