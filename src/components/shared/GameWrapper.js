import { useState } from "react";
import styled from "styled-components";
import bg from '../../assets/images/taskBg.png';
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { Additional } from "../shared/Additional";

const Wrapper = styled.div`
    overflow: hidden;
    background: url(${bg}) no-repeat 0 0 / cover;
    width: 100%;
    height: 100%;
    ${({$blurred}) => $blurred ? 'filter: blur(0.5px)' : ''};
    padding: ${({$ratio}) => $ratio * 28}px ${({$ratio}) => $ratio * 30}px;
`;

const Title = styled.h3`
    font-weight: 700;
    font-size: ${({$ratio}) => $ratio * 28}px;
    color: white;
    text-align: center;
`;

export const GameWrapper = ({blockInfo, isBlurred, level, children}) => {
    const [isIntro, setIsIntro] = useState(true);
    const ratio = useSizeRatio();

    return (
        <>
            <Wrapper $blurred={isIntro || isBlurred} $ratio={ratio}>
                <Title $ratio={ratio}>
                    ЭТАП {level}
                </Title>
                {children}
            </Wrapper>
            <Additional 
                shown={isIntro}
                onClick={() => setIsIntro(false)}
                blockInfo={blockInfo}
            />
        </>
    )
}