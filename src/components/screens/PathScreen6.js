import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext";
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { Button } from "../shared/Button";
import { PathSreen } from "../shared/PathScreen";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const ButtonStyled = styled(Button)`
    position: absolute;
    top: 50%;
    left: ${({$ratio}) => $ratio * 26}px;
    transform: translateY(-50%);
    white-space: pre-line;
    width: ${({$ratio}) => $ratio * 120}px;
    height: ${({$ratio}) => $ratio * 100}px;
`;

export const PathScreen6 = () => {
    const {next} = useProgress();
    const ratio = useSizeRatio();

    return (
        <Wrapper>
             <PathSreen activeElement={5} />
             <ButtonStyled $ratio={ratio} onClick={next}>ПЛАНЕТА{'\n'}ГОТОВА</ButtonStyled>
        </Wrapper>
    )
}