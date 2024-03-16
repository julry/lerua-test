import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { colors } from "../../../constants/colors";
import { useProgress } from "../../../contexts/ProgressContext"
import { useSizeRatio } from "../../../contexts/SizeRatioContext";
import { Additional } from "../../shared/Additional";
import { Button } from "../../shared/Button";
import { GameWrapper } from "../../shared/GameWrapper";
import { BoldText } from "../../shared/texts/BoldText";
import { CommonText } from "../../shared/texts/CommonText";
import { Explaining } from "../../shared/Explaining";
import { RuleBlock } from "../../shared/RuleBlock";
import { initialItems2 as initialItems } from "./items";
import { Item } from "./Item";
import { GameBlock } from "./GameBlock";
import { SWITCH_DURATION, SWITCH_NAME, AnswerExplain, ProccessExplain, StakeholderExplain } from "./constants";

const Wrapper = styled(GameWrapper)`
    padding-left: ${({$ratio}) => $ratio * 23}px;
    padding-right: ${({$ratio}) => $ratio * 23}px;
    position: relative;
`;

const ContentWrapper = styled(RuleBlock)`
    margin-top: ${({$ratio}) => $ratio * 20}px;
    padding: ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 20}px;
`;

const BlocksWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
`;

const Block = styled.div`
    margin-top: ${({$ratio}) => $ratio * 5}px;  
    padding: ${({$ratio}) => $ratio * 5}px;  
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: ${colors.darkGray};
    border-radius: ${({$ratio}) => $ratio * 15}px;
    padding-top: ${({$ratio}) => $ratio * 10}px;
    width: calc((100%  - 5 * ${({$ratio}) => $ratio}px) / 2);

    & + & {
        margin-left: ${({$ratio}) => $ratio * 5}px;
    }
`;

const List = styled.div`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 140}px;
    width: calc((100% - 95 * ${({$ratio}) => $ratio}px) / 2);
`;

const ListLeft = styled(List)`
    left: ${({$ratio}) => $ratio * 38}px;
`;

const ListRight = styled(List)`
    right: ${({$ratio}) => $ratio * 38}px;
`;

const BlockTitle = styled.div`
    white-space: pre-line;
    font-size: ${({$ratio}) => $ratio * 14}px;
    margin-bottom: ${({$ratio}) => $ratio * 10}px;
    font-size: 700;
    font-family: 'Leroy Merlin Sans';
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const InfoTitleButton = styled(Button)`
    width: ${({$ratio}) => $ratio * 26}px;
    height: ${({$ratio}) => $ratio * 26}px;
    border-radius: ${({$ratio}) => $ratio * 8}px;
    font-size: ${({$ratio}) => $ratio * 18}px;
    margin-top: ${({$ratio}) => $ratio * 2}px;
    font-family: 'LeroyMerlinSans-Web';
    font-weight: 400;
    margin: 0;
    padding-bottom: 0;
    padding-top: ${({$ratio}) => $ratio * 2}px;
`;

const ItemStyled = styled(Item)`
    & + & {
     margin-top: 0;
    }
`;

const InfoButton = styled(Button)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 112}px;
    left: 50%;
    transform: translateX(-50%);
`;

const IncorrectInfo = styled(ContentWrapper)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 115}px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 6;
    white-space: pre-line;
    width: ${({$ratio}) => $ratio * 368}px;
`;

export const Game2 = () => {
    const [itemsLeft, setItemsLeft] = useState(initialItems.filter((_, index) => index % 2 === 0));
    const [itemsRight, setItemsRight] = useState(initialItems.filter((_, index) => index % 2 === 1));
    const [proccessItems, setProcessItems] = useState([]);
    const [stakeholdersItems, setStakeholdersItems] = useState([]);
    const [isFinish, setIsFinish] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isIncorrectFinish, setIsIncorrectFinish] = useState(false);
    const [finalModal, setFinalModal] = useState({shown: false, winText: false});
    const [isExplain, setIsExplain] = useState({shown: false, text: ''});
    const [isShowingCorrect, setIsShowingCorrect] = useState(false);
    const {next} = useProgress();
    const ratio = useSizeRatio();
    const leftRef = useRef();
    const rightRef = useRef();
    const rightListRef = useRef();
    const leftListRef = useRef();
    
    useEffect(() => {
        if (leftListRef?.current && leftRef?.current) {
            const {height, top} = leftListRef.current.getBoundingClientRect();
            const {top: listTop} = leftRef.current.getBoundingClientRect();

            if (top + height > listTop && proccessItems.length > 2 && itemsLeft.length) {
                const array = [...itemsLeft];
                const item = array.shift();
                setItemsLeft(array);
                setItemsRight(prev => item ? [item, ...prev] : prev);
            }
        }

        if (rightListRef?.current && rightRef?.current) {
            const {height, top} = rightListRef.current.getBoundingClientRect();
            const {top: listTop} = rightRef.current.getBoundingClientRect();
            if (top + height > listTop && stakeholdersItems.length > 2 && itemsRight.length) {
                const array = [...itemsRight];
                const item = array.shift();
                setItemsRight(array);
                setItemsLeft(prev => item ? [item, ...prev] : prev);
            }
        }
    }, [proccessItems, stakeholdersItems, itemsLeft, itemsRight]);

    const handlePushToProccess = (item) => {
        setItemsLeft(prev => prev.filter(({id}) => id !== item.id));
        setItemsRight(prev => prev.filter(({id}) => id !== item.id));
        setStakeholdersItems(prev => prev.filter(({id}) => id !== item.id));
        setProcessItems(prev => [...prev, item]);
    }

    const handlePushToStakeHolder = (item) => {
        setItemsLeft(prev => prev.filter(({id}) => id !== item.id));
        setItemsRight(prev => prev.filter(({id}) => id !== item.id));
        setProcessItems(prev => prev.filter(({id}) => id !== item.id));
        setStakeholdersItems(prev => [...prev, item]);
    }

    const checkAnswers = () => {
        if (
            initialItems.filter(({isProccess}) => !isProccess).length 
            !== stakeholdersItems.filter(({isProccess}) => !isProccess).length
            || !stakeholdersItems.every(({isProccess}) => !isProccess)
        ) { 
            setIsCorrect(false);
            setIsIncorrectFinish(true);
        } else {
            setFinalModal({shown: true, winText: true})
        }
    }

    const showCorrectAnswers = () => {
        setIsShowingCorrect(true);
        const proccess = stakeholdersItems.filter(({isProccess}) => isProccess);
        const stakeholders = proccessItems.filter(({isProccess}) => !isProccess);
        setProcessItems(prev => [...prev.filter(({isProccess}) => !!isProccess), ...proccess]);
        setStakeholdersItems(prev => [...prev.filter(({isProccess}) => !isProccess), ...stakeholders]);
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

    return (
        <>
            <Wrapper 
                $ratio={ratio}
                isBlurred={isExplain}
                level={2} 
                btnText={isFinish && !isCorrect ? 'ПОКАЗАТЬ ОТВЕТ' : undefined}
                isAnimated={isIncorrectFinish && isCorrect}
                btnDisabled={itemsLeft.length || itemsRight.length || !proccessItems.length || !stakeholdersItems.length}
                onClick={handleClick}
                blockInfo={[
                    {
                        text: <CommonText>
                            Сложные ресурсы более капризны — они требуют особых условий доставки. 
                            А значит и участников процесса становится все больше, поэтому важно точно понимать, 
                            кто из стейкхолдеров — <BoldText>участники процесса.</BoldText>{' '}
                            Именно они будут сильнее всего влиять на доставку.{'\n\n'}
                            Так как этой сложной задачей занимается Леруа Мерлен, то к процессу подключатся мои коллеги 
                            из других отделов.
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 331,
                        taleLeft: 95,
                    }, 
                    {
                        text: <CommonText>
                        Распредели действующие лица на две группы:{' '}
                        <BoldText>участники процесса</BoldText> и <BoldText>первичные стейкхолдеры.</BoldText>
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 227,
                        taleLeft: 69,
                        top: 84,
                    }
                ]}
            >
                <ContentWrapper $ratio={ratio}>
                    Перетаскивай каждого участника проекта в нужный столбец.
                </ContentWrapper>
                <BlocksWrapper>
                    <Block $ratio={ratio} ref={leftListRef}>
                        <BlockTitle $ratio={ratio}>
                           <span>УЧАСТНИКИ{'\n'}ПРОЦЕССА</span>
                            <InfoTitleButton  
                                $ratio={ratio}
                                type="dark"
                                onClick={() => setIsExplain({shown: true, text: ProccessExplain})}
                            > 
                                i 
                            </InfoTitleButton>
                            </BlockTitle>
                        <SwitchTransition mode='out-in'>
                            <CSSTransition key={`proccess_${isShowingCorrect}`} timeout={SWITCH_DURATION} classNames={SWITCH_NAME}>
                                <GameBlock ratio={ratio} onDrop={handlePushToProccess} isCorrect={isCorrect} hasChildren={!!proccessItems.length}>
                                    {proccessItems.map(item => (
                                        <ItemStyled key={`proccess_${item.id}`} {...item} ratio={ratio} isCorrect={isCorrect} isDrag={!isFinish}/>
                                    ))}
                                </GameBlock>
                            </CSSTransition>
                        </SwitchTransition>
                    </Block>
                    <Block $ratio={ratio} ref={rightListRef}>
                        <BlockTitle $ratio={ratio}>
                            <span> ПЕРВИЧНЫЕ{'\n'}СТЕЙКХОЛДЕРЫ</span>
                            <InfoTitleButton 
                                type="dark"
                                $ratio={ratio}
                                onClick={() => setIsExplain({shown: true, text: StakeholderExplain})}
                            > 
                                i 
                            </InfoTitleButton>
                        </BlockTitle>
                        <SwitchTransition mode='out-in'>
                            <CSSTransition key={isShowingCorrect} timeout={SWITCH_DURATION} classNames={SWITCH_NAME}>
                                <GameBlock ratio={ratio} onDrop={handlePushToStakeHolder} isCorrect={isCorrect} hasChildren={!!stakeholdersItems.length}>
                                    {stakeholdersItems.map(item => (
                                        <ItemStyled key={`stakeholders_${item.id}`} {...item} ratio={ratio} isCorrect={isCorrect} isDrag={!isFinish}/>
                                    ))} 
                                </GameBlock>
                            </CSSTransition>
                        </SwitchTransition>
                    </Block>
                </BlocksWrapper>
                
                <ListLeft $ratio={ratio} ref={leftRef}>
                    {itemsLeft.map((item) => (
                        <Item key={item?.id} {...item} ratio={ratio} isDrag={!isFinish}/>
                    ))}
                </ListLeft>
                <ListRight $ratio={ratio} ref={rightRef}>
                    {itemsRight.map((item) => (
                        <Item key={item?.id} {...item} ratio={ratio} isDrag={!isFinish}/>
                    ))}
                </ListRight>
                {isFinish && !isCorrect && (
                    <IncorrectInfo $ratio={ratio}>Кажется, здесь что-то перепутано.{'\n'}Сейчас поправим!</IncorrectInfo>
                )}
                {isIncorrectFinish && isCorrect && (
                    <InfoButton type="dark" $ratio={ratio} onClick={() => setIsExplain({shown: true, text: AnswerExplain})}>ПОЯСНЕНИЕ</InfoButton>
                )}
            </Wrapper>
            <Explaining shown={isExplain.shown} onClick={() => setIsExplain(prev => ({...prev, shown: false}))}>
                {isExplain.text}
            </Explaining>
            <Additional 
                shown={finalModal.shown}
                onClick={next}
                blockInfo={[
                    {
                        text: 
                        <CommonText>
                            {finalModal.winText ? 'Супер! На планете появились ' : 'Ура! Теперь на планете есть и '}
                            сложные ресурсы — <BoldText>лекарства и еда.</BoldText> {' '}
                            Жители смогут перекусить и бесплатно сходить к врачу — теперь у всех{' '}
                            здесь есть ДМС.{'\n\n'}Пришло время позаботиться и о доставке техники на Планету — 
                            <BoldText>аналитикам будут нужны уютные офисы.</BoldText>
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 256,
                        taleLeft: 92,
                    }
                ]}
            />
        </>
    )
}