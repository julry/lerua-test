import { useProgress } from "../../contexts/ProgressContext"
import { Button } from "../shared/Button";
import bg from '../../assets/images/taskBg.png';
import styled from "styled-components";

const Wrapper = styled.div`
    overflow: hidden;
    background: url(${bg}) no-repeat 0 0 / cover;
    width: 100%;
    height: 100%;
    ${({$blurred}) => $blurred ? 'filter: blur(0.5px)' : ''};
`;
export const Game4 = () => {
    const {next} = useProgress();
    return (
        <div>
            <Button onClick={next}>дальше</Button>
        </div>
    )
}