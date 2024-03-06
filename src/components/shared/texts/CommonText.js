import styled from "styled-components";
import { useSizeRatio } from "../../../contexts/SizeRatioContext";

const Text = styled.p`
    font-size: ${({$ratio, $isBig}) => ($isBig ? 16 : 14) * $ratio}px;
    line-height: 100%;
`;

export const CommonText = (props) => {
    const ratio = useSizeRatio();

    return <Text {...props} $ratio={ratio} $isBig={props.isBig}/>
}
