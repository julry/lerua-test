import { useCallback, useState } from "react";
import update from 'immutability-helper';
import styled from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { colors } from "../../../constants/colors";
import { useProgress } from "../../../contexts/ProgressContext"
import { useSizeRatio } from "../../../contexts/SizeRatioContext";
import { GameWrapper } from "../../shared/GameWrapper";
import { BoldText } from "../../shared/texts/BoldText";
import { CommonText } from "../../shared/texts/CommonText";
import { Item } from "./Item";
import {correctAnswers, initialItems} from './items';
import { Additional } from "../../shared/Additional";
import { reachMetrikaGoal } from "../../../utils/reachMetrikaGoal";


const SWITCH_DURATION = 400;

const SWITCH_NAME = 'correct';

const Wrapper = styled(GameWrapper)`
    padding-left: ${({$ratio}) => $ratio * 37}px;
    padding-right: ${({$ratio}) => $ratio * 37}px;
`;

const Content = styled.div`
    position: relative;
`;

const ContentWrapper = styled.div`
    position: relative;
    z-index: 3;
    width: 100%;
    margin-top: ${({$ratio}) => $ratio * 20}px;
    border-radius: ${({$ratio}) => $ratio * 15}px;
    background: ${colors.darkGray};
    padding: ${({$ratio}) => $ratio * 10}px ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 5}px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.2);
`;

const GameBlock = styled.div`
    position: relative;
    border-radius: ${({$ratio}) => $ratio * 10}px;
    margin-top: ${({$ratio}) => $ratio * 10}px;
    width: 100%;
    background: ${({$isCorrect}) => $isCorrect ? colors.green : colors.yellow};
    padding: ${({$ratio}) => $ratio * 5}px;
    display: flex;
    flex-direction: column;

    &.${SWITCH_NAME}-enter {
        opacity: 0;
    }

    &.${SWITCH_NAME}-enter-active {
        opacity: 1;
        transition: opacity ${SWITCH_DURATION}ms;
    }

    &.${SWITCH_NAME}-exit {
        opacity: 1;
    }

    &.${SWITCH_NAME}-exit-active {
        opacity: 0;
        transition: opacity ${SWITCH_DURATION}ms;
    }
`;

const IncorrectInfo = styled.div`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * -60}px;
    left: 0;
    right: 0;
    z-index: 2;
    text-align: center;
    background: ${colors.darkGray};
    padding: ${({$ratio}) => $ratio * 15}px;
    padding-top: ${({$ratio}) => $ratio * 70}px;
    border: 2px solid ${colors.gray};
    border-radius: ${({$ratio}) => $ratio * 20}px;
`;

export const Game1 = () => {
    const [isFinish, setIsFinish] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isShowingCorrect, setIsShowingCorrect] = useState(false);
    const [isIncorrectFinish, setIsIncorrectFinish] = useState(false);
    const [finalModal, setFinalModal] = useState({shown: false, winText: false});
    const {next} = useProgress();
    const ratio = useSizeRatio();
    
    const handleNext = () => {
        reachMetrikaGoal('level1');
        next();
    }

    const checkAnswers = () => {
        let isIncorrect = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id !== correctAnswers[i]) {
                setIsCorrect(false);
                setIsIncorrectFinish(true);
                isIncorrect = true;
                break;
            }
        }

        if (!isIncorrect) setFinalModal({shown: true, winText: true});
    };

    const showCorrectAnswers = () => {
        setIsShowingCorrect(true);
        setItems(prev => prev.map(item => ({...item, order: correctAnswers.indexOf(item.id)})));
        setIsCorrect(true);
    }

    const handleClick = () => {
        if (isFinish) {
            if (!isCorrect) {
                showCorrectAnswers();
                return;
            } 
            setFinalModal({shown: true, winText: false});

            return;
        } 
        checkAnswers();
        setIsFinish(true);
    };

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        setItems((prev) =>
          update(prev, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, prev[dragIndex]],
            ],
          }),
        )
      }, []);

    return (
        <>
            <Wrapper 
                $ratio={ratio}
                level={1} 
                onClick={handleClick}
                btnText={isFinish && !isCorrect ? 'ПОКАЗАТЬ ОТВЕТ' : undefined}
                isAnimated={isIncorrectFinish && isCorrect}
                blockInfo={[
                    {
                        text: <CommonText>
                        «Чтобы достигнуть цели, нужно чётко определить всю 
                        последовательность действий», — гласит один из принципов бизнес-аналитики. {'\n\n'}
                        Системы доставки ресурсов на нашу Планету это тоже касается. Поэтому первым 
                        делом <BoldText>расставь этапы этого бизнес-процесса в нужном порядке.</BoldText>
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 288,
                        taleLeft: 93,
                    }, 
                    {
                        text: <CommonText>
                        Помни, что важно не только расставить этапы в правильном порядке, 
                        но и гарантировать, что <BoldText>переходы между ними настроены гибко и эффективно</BoldText>, 
                        чтобы в случае изменений внешних условий или внутренних задач процесс мог быть быстро адаптирован.
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 288,
                        taleLeft: 93,
                    }
                ]}
            >
                <Content>
                    <ContentWrapper $ratio={ratio}>
                        <CommonText>
                            Расставь в правильном порядке пункты из списка, меняя их местами.
                        </CommonText>
                        <SwitchTransition mode='out-in'>
                            <CSSTransition key={isShowingCorrect} timeout={SWITCH_DURATION} classNames={SWITCH_NAME}>
                                <GameBlock $ratio={ratio} $isCorrect={isCorrect}>
                                    {items.map((item, index) => (
                                        <Item 
                                            key={item.id} 
                                            index={index} 
                                            isDrag={!isFinish}
                                            ratio={ratio}
                                            moveItem={moveItem}
                                            borderColor={isFinish && !isCorrect ? colors.yellow : colors.green}
                                            {...item}
                                        />
                                    ))}
                                </GameBlock>
                            </CSSTransition>
                        </SwitchTransition>
                    </ContentWrapper>
                    {isIncorrectFinish && (
                        <IncorrectInfo $ratio={ratio}>
                            <CommonText isBig>
                                Ой, правильный ответ был совсем рядом… Смотри, как нужно.
                            </CommonText>
                        </IncorrectInfo>
                    )}
                </Content>
            </Wrapper>
            <Additional
                shown={finalModal.shown}
                onClick={handleNext}
                blockInfo={[
                    {
                        text: 
                        <CommonText>
                            {finalModal.winText ? 'Поздравляю! Ты справился с первым заданием.\n\n' : ''}
                            Теперь на Планету доставляют самые <BoldText>простые ресурсы</BoldText> для постройки дорог и домов.{'\n\n'}
                            Самое время <BoldText>наладить доставку более сложных материалов.</BoldText>
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 256,
                        taleLeft: 92,
                    }, 
                ]}
            />
            </>
    )
}