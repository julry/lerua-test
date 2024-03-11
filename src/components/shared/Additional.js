import { useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import man from '../../assets/images/astronaut.svg';
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { AnimatedButton, Button } from "./Button";
import { InfoBlock } from "./InfoBlock";
import { CommonText } from "./texts/CommonText";

const ANIMATION_NAME = 'block_animated';
const ANIMATION_DURATION = 300;

const Wrapper = styled.div`
    position: absolute;
    inset: 0;
    z-index: 10;
    background: rgba(20, 59, 16, 0.4);
    overflow: hidden;

    backdrop-filter: blur(1.5px);
    -webkit-backdrop-filter: blur(1.5px);

    &.${ANIMATION_NAME}-enter {
        opacity: 0;
    }

    &.${ANIMATION_NAME}-enter-active {
        opacity: 1;
        transition: opacity ${ANIMATION_DURATION}ms;
    }

    &.${ANIMATION_NAME}-exit {
        opacity: 1;
    }

    &.${ANIMATION_NAME}-exit-active {
        opacity: 0;
        transition: opacity ${ANIMATION_DURATION}ms;
    }
`;

const ManWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    height: calc(460px * ${({$ratio}) => $ratio});
`;

const Man = styled.div`
    position: absolute;
    right: calc(0px - 85px * ${({$ratio}) => $ratio});
    bottom: calc(0px - 27px * ${({$ratio}) => $ratio});
    width: calc(341px * ${({$ratio}) => $ratio});
    height: calc(484px * ${({$ratio}) => $ratio});
    background: url(${man}) no-repeat 0 0 /contain;
`;

const BlockStyled = styled(InfoBlock)`
    position: absolute;
    left: ${({$ratio}) => $ratio * 22}px;
    bottom: ${({$top, $ratio}) => $ratio * (667 - ($top ?? 35))}px;
    transform: translateY(100%);
    padding-right: 5px;

    @media screen and (min-width: 360px) and (min-height: 800px) {
        transform: none;
        bottom: 460px;
    }

    &.${ANIMATION_NAME}-enter {
        opacity: 0;
    }

    &.${ANIMATION_NAME}-enter-active {
        opacity: 1;
        transition: opacity ${ANIMATION_DURATION}ms;
    }

    &.${ANIMATION_NAME}-exit {
        opacity: 1;
    }

    &.${ANIMATION_NAME}-exit-active {
        opacity: 0;
        transition: opacity ${ANIMATION_DURATION}ms;
    }
`;

const ButtonStyled = styled(Button)`
    position: absolute;
    bottom: calc(50px * ${({$ratio}) => $ratio});
    left: 50%;
    transform: translateX(-50%);

    @media screen and (max-height: 650px) {
        bottom: calc(30px * ${({$ratio}) => $ratio});
    }
`;

const AnimatedButtonStyled = styled(AnimatedButton)`
    position: absolute;
    bottom: calc(50px * ${({$ratio}) => $ratio});
    left: 50%;
    transform: translateX(-50%);

    @media screen and (max-height: 650px) {
        bottom: calc(30px * ${({$ratio}) => $ratio});
    }
`;

export const Additional = ({ blockInfo, onClick, shown, children }) => {
    const [part, setPart] = useState(0);
    const ratio = useSizeRatio();

    return (
        <CSSTransition
            in={shown}
            mountOnEnter 
            unmountOnExit 
            timeout={ANIMATION_DURATION} 
            classNames={ANIMATION_NAME}
        >
            <Wrapper>
                <ManWrapper $ratio={ratio}>
                    <Man $ratio={ratio}/>
                </ManWrapper>
                <SwitchTransition>
                    <CSSTransition
                        key={part}
                        mountOnEnter 
                        unmountOnExit 
                        timeout={ANIMATION_DURATION} 
                        classNames={ANIMATION_NAME}
                    >
                        <BlockStyled 
                            maxWidth={blockInfo[part].maxWidth} 
                            taleLeft={blockInfo[part].taleLeft} 
                            isBigTale={blockInfo[part].isBigTale} 
                            $top={blockInfo[part].top} 
                            $ratio={ratio}
                        >
                                {blockInfo[part].text}
                        </BlockStyled>
                    </CSSTransition> 
                </SwitchTransition>
                {children}
                {
                    blockInfo.length > 1 ? (
                        part === 0 ? 
                        <AnimatedButtonStyled $ratio={ratio} onClick={() => setPart(prev=> ++prev)}/> : 
                        <ButtonStyled $ratio={ratio} onClick={onClick}>ПОНЯТНО</ButtonStyled>
                    ) :  <ButtonStyled $ratio={ratio} onClick={onClick}>ДАЛЕЕ</ButtonStyled>
                }
            </Wrapper>
        </CSSTransition>
    )
}