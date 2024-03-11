import { useEffect, useState } from "react";
import styled from "styled-components";
import { CSSTransition } from "react-transition-group";
import gsap from 'gsap';
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import bg from '../../assets/images/path.png';
import click from '../../assets/images/click.svg';
import {Path} from './Path';
import { colors } from "../../constants/colors";
import { useProgress } from "../../contexts/ProgressContext";
import { InfoBlock } from "./InfoBlock";
import { CommonText } from "./texts/CommonText";
import { Button } from "./Button";
import { BoldText } from "./texts/BoldText";
import { blurredStyle } from "../../constants/styles";

const ANIMATION_DURATION = 300;

const ANIMATION_NAME = 'toggleHand';

const Wrapper = styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: url(${bg}) no-repeat 0 0 / cover;
    ${({$isBlurred}) => $isBlurred ? blurredStyle : ''};
`;

const PathStyled = styled(Path)`
    margin-left: ${({$ratio}) => $ratio * 50}px;

    @media screen and (max-width: 450px) and (min-height: 800px) {
        margin-left: ${({$ratio}) => $ratio * 25}px;
    }

    @media screen and (max-width: 320px) and (min-height: 700px) {
        margin-left: ${({$ratio}) => $ratio * 5}px;
    }

    @media screen and (max-width: 300px) and (min-height: 600px) {
        margin-left: 0;
    }

    & ${({$activeElement}) => $activeElement} {
        cursor: pointer;
        & .stroke {
            stroke: ${colors.yellow};
            stroke-opacity: 1;
        }
        & .fill {
            fill: ${colors.yellow};
        }
    }

    ${({$reachedElements}) => $reachedElements.map((element) => (
       `& #${element} {
            & .stroke {
                stroke: ${colors.green};
                stroke-opacity: 1;
            }
            & .fill {
                fill: ${colors.green};
            }
        }` 
    )).join(';')}
`;

const Click = styled.div`
    position: absolute;
    left: ${({$ratio}) => $ratio * 108}px;
    bottom: 0;
    width: ${({$ratio}) => $ratio * 187}px;
    height: ${({$ratio}) => $ratio * 181}px;
    background: url(${click}) no-repeat 0 0 / contain;

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

const Modal = styled.div`
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);


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

const ButtonStyled = styled(Button)`
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
`;

const RulesBtn = styled(Button)`
    position: absolute;
    right: ${({$ratio}) => $ratio * 27}px;
    top: ${({$ratio}) => $ratio * 30}px;
    padding: 0;
    font-size: ${({$ratio}) => $ratio * 20}px;
    width: ${({$ratio}) => $ratio * 30}px;
    height: ${({$ratio}) => $ratio * 30}px;
`;

export const PathSreen = ({ activeElement, isFirstRules }) => {
    const [isHandShown, setIsHandShown] = useState(false);
    const [isRulesShown, setIsRulesShown] = useState(isFirstRules);
    const {next} = useProgress();
    const ratio = useSizeRatio();

    const elements = ['roads', 'food', 'offices', 'relax', 'study'];

    const reachedElements = elements.slice(0, activeElement);

    const handleClick = (id) => {
        if (id !== elements[activeElement]) return;

        next();
    }

    const handleCloseRules = () => {
        if (isFirstRules) {
            setTimeout(() => {
                setIsHandShown(true);  
            }, 1000);
        }

        setIsRulesShown(false);
    }
  

    useEffect(() => {
        if (!isHandShown) return;

        gsap.to('#clickHand', {
            scale: 0.7,
            duration: 0.8,
            repeat: 5,
            yoyo: true,
            onComplete: () => setIsHandShown(false)
        });
    }, [isHandShown]);

    return (
        <>
            <Wrapper $isBlurred={isRulesShown}>
                <PathStyled 
                    $ratio={ratio} 
                    $activeElement={`#${elements[activeElement]}`} 
                    $reachedElements={reachedElements} 
                    onClick={handleClick}
                />
                <RulesBtn $ratio={ratio} onClick={() => setIsRulesShown(true)}>?</RulesBtn>
                <CSSTransition in={isHandShown} mountOnEnter unmountOnExit timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                    <Click id="clickHand" $ratio={ratio} onClick={() => setIsHandShown(false)}/>
                </CSSTransition>
            </Wrapper>

            <CSSTransition in={isRulesShown} mountOnEnter unmountOnExit timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                <Modal>
                    <InfoBlock maxWidth={319}>
                        <CommonText isBig>
                            Иди строго по <BoldText>намеченному пути</BoldText>. На нём показаны все объекты, которые необходимо построить на планете.{'\n\n'} 
                            <BoldText>Задания открываются по очереди</BoldText> и доступны, когда плашка этапа становится жёлтой.{'\n\n'} 
                            Если при решении что‑то пойдёт не так, мы с коллегами подскажем!
                        </CommonText>
                    </InfoBlock>
                    <ButtonStyled onClick={handleCloseRules}>К ЗАДАНИЯМ</ButtonStyled>
                </Modal>
            </CSSTransition>
        </>
        
    )
}