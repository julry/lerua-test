import { useState } from 'react';
import styled from 'styled-components';
import {CSSTransition} from "react-transition-group";
import start from '../../assets/images/start3.png';
import man from '../../assets/images/astronaut.svg';
import { useProgress } from '../../contexts/ProgressContext';
import { useSizeRatio } from '../../contexts/SizeRatioContext';
import { ButtonBottom, AnimatedButton } from '../shared/Button';
import { InfoBlock } from '../shared/InfoBlock';
import { BoldText } from '../shared/texts/BoldText';
import { CommonText } from '../shared/texts/CommonText';

const ANIMATION_DURATION = 300;

const ANIMATION_NAME = 'toggle';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${start}) no-repeat 0 0 /cover;
    padding: calc(16px * ${({$ratio}) => $ratio}) calc(22px * ${({$ratio}) => $ratio});
    display: flex;
    flex-direction: column;
`;

const ManWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    height: calc(484px * ${({$ratio}) => $ratio});
`;

const Man = styled.div`
    position: absolute;
    right: calc(0px - 59px * ${({$ratio}) => $ratio});
    bottom: calc(0px - 78px * ${({$ratio}) => $ratio});
    width: calc(341px * ${({$ratio}) => $ratio});
    height: calc(484px * ${({$ratio}) => $ratio});
    background: url(${man}) no-repeat 0 0 /contain;
`;

const ButtonStyled = styled(ButtonBottom)`
    position: relative;
    z-index: 3;
    margin-top: auto;
`;

const AnimatedButtonStyled  = styled(AnimatedButton)`
    position: relative;
    z-index: 3;
    margin-top: auto;
`;

const InfoBlockStyledFirst = styled(InfoBlock)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 414}px;
    
    @media screen and (min-height: 700px) {
        bottom: ${({$ratio}) => $ratio * 425}px;
    }
`;

const Blocks = styled.div`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 382}px;

    @media screen and (min-height: 700px) {
        bottom: ${({$ratio}) => $ratio * 425}px;
    }
`;

const InfoBlockStyled = styled(InfoBlock)`
    padding-right: calc(10px * ${({$ratio}) => $ratio});

    & + & {
        margin-top: calc(10px * ${({$ratio}) => $ratio});
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

export const Intro3 = () => {
    const [part, setPart] = useState(1);
    const {next} = useProgress();
    const ratio = useSizeRatio();

    const handleClick = () => {
        if (part === 1 ) setPart((prev) => ++prev);
        else next();
    }

    return (
    <Wrapper $ratio={ratio}>
        <ManWrapper $ratio={ratio}>
            <Man $ratio={ratio} />
        </ManWrapper>
        {part === 1 && (
            <InfoBlockStyledFirst taleLeft={90} maxWidth={268} $ratio={ratio}>
                <CommonText>
                    С прибытием{'\n'}на <BoldText>«Планету аналитиков»!</BoldText>{'\n\n'}
                    Мы с коллегами открыли её совсем недавно и обнаружили, что она пригодна для жизни.{' '} 
                    В будущем здесь будут работать аналитики Леруа Мерлен. Но пока это невозможно — на планете ещё нет{' '} 
                    ни одного объекта инфраструктуры.{'\n\n'}
                    Тебе поручена важная <BoldText>миссия</BoldText> — обустроить это место для комфортной жизни.
                </CommonText>
            </InfoBlockStyledFirst>
        )}
        <Blocks $ratio={ratio}>
            <CSSTransition in={part === 2} mountOnEnter unmountOnExit timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                <InfoBlockStyled maxWidth={268} $ratio={ratio}>
                    <CommonText>
                        Обустройство на Планете — сложный процесс. Но если 
                        его проанализировать, то можно разбить на более простые этапы. 
                        Давай <BoldText>начнём с системы доставки ресурсов</BoldText> с Земли на Планету, которую мы 
                        разработаем вместе моими коллегами из Леруа Мерлен.
                    </CommonText>
                </InfoBlockStyled>
            </CSSTransition> 
            <CSSTransition in={part === 2} mountOnEnter unmountOnExit timeout={ANIMATION_DURATION} classNames={ANIMATION_NAME}>
                <InfoBlockStyled taleLeft={98} maxWidth={268} $ratio={ratio}>
                    <CommonText>
                        Тебе предстоит <BoldText>пошагово решать этот кейс</BoldText> — каждое выполненное задание 
                        будет приближать нашу «Планету аналитиков» к моменту заселения первыми жителями!
                    </CommonText>
                </InfoBlockStyled>
            </CSSTransition>
        </Blocks>
        {part === 1 ? <AnimatedButtonStyled onClick={handleClick}/> : <ButtonStyled onClick={handleClick}>ПОЕХАЛИ!</ButtonStyled>}
    </Wrapper>
    )
}