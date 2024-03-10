import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import { useProgress } from "../../../contexts/ProgressContext"
import { useSizeRatio } from "../../../contexts/SizeRatioContext";
import { Additional } from "../../shared/Additional";
import { Button } from "../../shared/Button";
import { GameWrapper } from "../../shared/GameWrapper";
import { BoldText } from "../../shared/texts/BoldText";
import { CommonText } from "../../shared/texts/CommonText";
import { initialItems2 as initialItems } from "./items";
import { Item } from "./Item";
import { GameBlock } from "./GameBlock";
import { Explaining } from "../../shared/Explaining";
import { RuleBlock } from "../../shared/RuleBlock";

const Wrapper = styled(GameWrapper)`
    padding-left: ${({$ratio}) => $ratio * 23}px;
    padding-right: ${({$ratio}) => $ratio * 23}px;
    position: relative;
`;

const ContentWrapper = styled(RuleBlock)`
    margin-top: ${({$ratio}) => $ratio * 20}px;
    padding: ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 20}px;
`;

const Block = styled.div`
    position: absolute;
    top: ${({$ratio}) => $ratio * 125}px;  
    padding: ${({$ratio}) => $ratio * 5}px;  
    border: 2px solid rgba(0, 0, 0, 0.2);
    background: ${colors.darkGray};
    border-radius: ${({$ratio}) => $ratio * 15}px;
    padding-top: ${({$ratio}) => $ratio * 10}px;
    width: calc((100% - 51 * ${({$ratio}) => $ratio}px) / 2);

    & + & {
        margin-left: ${({$ratio}) => $ratio * 5}px;
    }
`;

const BlockLeft = styled(Block)`
    left: ${({$ratio}) => $ratio * 23}px;
`;

const BlockRight = styled(Block)`
    right: ${({$ratio}) => $ratio * 23}px;
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

const BlockTitle = styled.h3`
    white-space: pre-line;
    font-size: ${({$ratio}) => $ratio * 14}px;
    margin-bottom: ${({$ratio}) => $ratio * 10}px;
    text-align: center;
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
    bottom: ${({$ratio}) => $ratio * 135}px;
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
    const [isExplain, setIsExplain] = useState(false);
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
        if (initialItems.filter(({isProccess}) => !isProccess).length !== stakeholdersItems.filter(({isProccess}) => !isProccess).length) { 
            setIsCorrect(false);
            setIsIncorrectFinish(true);
        } else {
            setFinalModal({shown: true, winText: true})
        }
    }

    const showCorrectAnswers = () => {
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
                <BlockLeft $ratio={ratio} ref={leftListRef}>
                    <BlockTitle $ratio={ratio}>УЧАСТНИКИ{'\n'}ПРОЦЕССА</BlockTitle>
                    <GameBlock ratio={ratio} onDrop={handlePushToProccess} isCorrect={isCorrect} hasChildren={!!proccessItems.length}>
                        {proccessItems.map(item => (
                            <ItemStyled key={`proccess_${item.id}`} {...item} ratio={ratio} isCorrect={isCorrect}/>
                        ))}
                    </GameBlock>
                </BlockLeft>
                <BlockRight $ratio={ratio} ref={rightListRef}>
                    <BlockTitle $ratio={ratio}>ПЕРВИЧНЫЕ{'\n'}СТЕЙКХОЛДЕРЫ</BlockTitle>
                    <GameBlock ratio={ratio} onDrop={handlePushToStakeHolder} isCorrect={isCorrect} hasChildren={!!stakeholdersItems.length}>
                        {stakeholdersItems.map(item => (
                            <ItemStyled key={`stakeholders_${item.id}`} {...item} ratio={ratio} isCorrect={isCorrect}/>
                        ))} 
                    </GameBlock>
                </BlockRight>
                <ListLeft $ratio={ratio} ref={leftRef}>
                    {itemsLeft.map((item) => (
                        <Item key={item?.id} {...item} ratio={ratio}/>
                    ))}
                </ListLeft>
                <ListRight $ratio={ratio} ref={rightRef}>
                    {itemsRight.map((item) => (
                        <Item key={item?.id} {...item} ratio={ratio}/>
                    ))}
                </ListRight>
                {isFinish && !isCorrect && (
                    <IncorrectInfo $ratio={ratio}>Кажется, здесь что-то перепутано.{'\n'}Сейчас поправим!</IncorrectInfo>
                )}
                {isIncorrectFinish && isCorrect && (
                    <InfoButton type="dark" $ratio={ratio} onClick={() => setIsExplain(true)}>ПОЯСНЕНИЕ</InfoButton>
                )}
            </Wrapper>
            <Explaining shown={isExplain} onClick={() => setIsExplain(false)}>
                <CommonText>
                К <BoldText>стейкхолдерам</BoldText> относятся все лица, заинтересованные в результате разработки.{'\n\n'}
                <BoldText>Участниками процесса</BoldText> являются те лица, которые напрямую взаимодействуют с системой{' '}
                и связаны с фактом её разработки.{'\n\n'}
                <BoldText>Первичные стейкхолдеры</BoldText> имеют непосредственное отношение{' '}
                к проекту и его исходу. Обычно включают в себя клиентов (или пользователей),{' '}
                сотрудников компании, участвующих в проекте напрямую, владельцев бизнеса, инвесторов{' '}
                и других людей или группы с прямым финансовым интересом. К ним также относятся регуляторы{' '}
                или другие лица, имеющие законные права в отношении проекта.        
                </CommonText>
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