import { useState } from "react";
import styled from "styled-components";
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { MouseTransition, TouchTransition, DndProvider } from 'react-dnd-multi-backend';
import bg from '../../assets/images/taskBg.png';
import { blurredStyle } from "../../constants/styles";
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { Additional } from "../shared/Additional";
import { AnimatedBottom, ButtonBottom } from "./Button";

const Wrapper = styled.div`
    overflow: ${({$overflow}) => $overflow ?? 'hidden'};
    overflow-x: hidden;
    background: url(${bg}) no-repeat 0 0 / cover;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({$blurred}) => $blurred ? blurredStyle : ''};
    padding: ${({$ratio}) => $ratio * 28}px ${({$ratio}) => $ratio * 28}px ${({$ratio}) => $ratio * 50}px;
    scrollbar-color: transparent transparent;
`;

const Title = styled.h3`
    font-weight: 700;
    font-size: ${({$ratio}) => $ratio * 28}px;
    color: white;
    text-align: center;
`;

export const GameWrapper = ({
    blockInfo, isBlurred, level, overflow, onCloseIntro, children, onClick, btnDisabled, isAnimated, className, btnText='ГОТОВО'
}) => {
    const [isIntro, setIsIntro] = useState(false);
    const ratio = useSizeRatio();

    const handleCloseIntro = () => {
        onCloseIntro?.();
        setIsIntro(false);
    };

    const HTML5toTouch = {
        backends: [
            {
                id: 'html5',
                backend: HTML5Backend,
                transition: MouseTransition,
            },
            {
                id: 'touch',
                backend: TouchBackend,
                preview: true,
                transition: TouchTransition,
            },
        ],
    };

    return (
        <>
            <Wrapper $blurred={isIntro || isBlurred} $ratio={ratio} $overflow={overflow} className={className}>
                <Title $ratio={ratio}>
                    ЭТАП {level}
                </Title>
                <DndProvider options={HTML5toTouch}>
                    {children}
                </DndProvider>
                {isAnimated ? <AnimatedBottom onClick={onClick} /> : (
                     <ButtonBottom onClick={onClick} disabled={btnDisabled}>{btnText}</ButtonBottom>
                )}
               
            </Wrapper>
            <Additional 
                shown={isIntro}
                onClick={handleCloseIntro}
                blockInfo={blockInfo}
            />
        </>
    )
}