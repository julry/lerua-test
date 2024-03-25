import styled from "styled-components";
import { useRef, useState } from "react";
import update from 'immutability-helper';
import { BoldText } from "../../shared/texts/BoldText";
import { GameWrapper } from "../../shared/GameWrapper";
import { useProgress } from "../../../contexts/ProgressContext";
import { CommonText } from "../../shared/texts/CommonText";
import { RuleBlock } from "../../shared/RuleBlock";
import { useSizeRatio } from "../../../contexts/SizeRatioContext";
import { colors } from "../../../constants/colors";
import { Field } from "./Field";
import { words } from "./words";
import { Block } from "./Block";
import { DeleteBlock } from "./DeleteBlock";
import { BlockTipSvg } from "./BlockTipSvg";
import { Additional } from "../../shared/Additional";
import explainTip from "./explainTip.svg";
import { Button } from "../../shared/Button";
import { Explaining } from "../../shared/Explaining";

const Wrapper = styled(GameWrapper)`
    padding-left: ${({$ratio}) => $ratio * 20}px;
    padding-right: ${({$ratio}) => $ratio * 20}px;
    padding-bottom: ${({$ratio}) => $ratio * 26}px;
    position: relative;

    @media screen and (max-height: 650px) {
        padding-bottom: ${({$ratio}) => $ratio * 16}px;
    }
`;

const ContentWrapper = styled(RuleBlock)`
    margin-top: ${({$ratio}) => $ratio * 10}px;
    margin-bottom: ${({$ratio}) => $ratio * 5}px;
    padding: ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 20}px;
`;

const Box = styled.div`
    width: 100%;
    border-radius: ${({$ratio}) => $ratio * 10}px;
    background: ${colors.darkGray};
    padding: ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 5}px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.2);
    margin-bottom: ${({$ratio}) => $ratio * 5}px;
`;

const FieldsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
`;

const Line = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    
    & + & {
        margin-top: ${({$ratio}) => $ratio * 5}px;
    }

    & p {
        width: max-content;
    }
`;

const BlockTipWrapper = styled.div`
    position: absolute;
    z-index: 9;
    inset: ${({$ratio}) => -5 * $ratio}px;
    bottom: ${({$ratio}) => -106 * $ratio}px;
    border-radius: ${({$ratio}) => 8 * $ratio}px;
    box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);

    @media screen and (min-width: 450px) and (max-height: 720px) {
        bottom: ${({$ratio}) => $ratio * -91}px;
    }
`;

const Dumb = styled.div`
    position: absolute;
    inset: 0;
`;

const BlockTip = styled.div`
    position: absolute;
    left: ${({$ratio}) => -5 * $ratio}px;
    top: 0;
    z-index: 10;
    width: calc(100% - ${({$ratio}) => 5 * $ratio}px);
    transform: translateY(-80%);
`;

const ExplainTip = styled.div`
    position: absolute;
    z-index: 3;
    width: ${({$ratio}) => $ratio * 175}px; 
    height: ${({$ratio}) => $ratio * 93}px;
    left: calc(50% - ${({$ratio}) => $ratio * 80}px);
    bottom:  ${({$ratio}) => $ratio * 139}px;
    transform: translateX(-50%);
    background: url(${explainTip}) no-repeat center 0 / contain;
`;

const ExplainBtn = styled(Button)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 112}px;
    left: 50%;
    transform: translateX(-50%);
`;

export const Game4 = () => {
    const [isTip, setIsTip] = useState(false);
    const [, setIsFirstWord] = useState(true);
    const [isFinalModal, setIsFinalModal] = useState(false);
    const [isIncorrectFinish, setIsIncorrectFinish] = useState(false);
    const [isFinish, setIsFinish] = useState(false);
    const [allWords, setAllWords] = useState(words);
    const [isFullExplain, setIsFullExplain] = useState(false);
    const [isShowingCorrect, setIsShowingCorrect] = useState(false);
    const [pickedWords, setPickedWords] = useState({
        systemWords: [],
        roleWords: [],
        descriptionWords: [],
        isSystemCorrect: true,
        isRoleCorrect: true,
        isDescCorrect: true,
        isCorrect: true,
    });
    const [editedWords, setEditedWords] = useState({shown: false, array: [], onChange: () => {}});

    const {next} = useProgress();
    const ratio = useSizeRatio();
    const $fieldsWrapper = useRef();

    const showCorrectAnswers = () => {
        setIsShowingCorrect(true);
        const { isSystemCorrect, isDescCorrect, isRoleCorrect, systemWords, descriptionWords, roleWords } = pickedWords;
        let systemAll = [...systemWords];
        let roleAll = [...roleWords];
        let descriptionAll = [...descriptionWords];

        if (!isSystemCorrect) {
            const systemRole = roleWords.filter(({isSystem}) => isSystem);
            const systemDesc = descriptionWords.filter(({isSystem}) => isSystem);
            systemAll = [...systemWords.filter(({isSystem}) => isSystem), ...systemDesc, ...systemRole];
        }
        
        if (!isDescCorrect) {
            const descriptionRole = roleWords.filter(({isDescription}) => isDescription);
            const descriptionSystem= systemWords.filter(({isDescription}) => isDescription);
            descriptionAll = [
                ...descriptionWords.filter(({isDescription}) => isDescription),
                ...descriptionSystem, 
                ...descriptionRole
            ];
        }

        if (!isRoleCorrect) {
            const roleDesc = descriptionWords.filter(({isRole}) => isRole);
            const roleSystem= systemWords.filter(({isRole}) => isRole);
            roleAll = [
                ...roleWords.filter(({isRole}) => isRole),
                ...roleSystem, 
                ...roleDesc,
            ];
        }

        setPickedWords((prev) => ({
            ...prev,
            systemWords: systemAll,
            descriptionWords: descriptionAll, 
            roleWords: roleAll,
            isSystemCorrect: true,
            isCorrect: true,
            isDescCorrect: true,
            isRoleCorrect: true,
        }));
    };

    const checkAnswers = () => {
        const { systemWords, descriptionWords, roleWords } = pickedWords;
        let isSystemCorrect = true;
        let isRoleCorrect = true;
        let isDescCorrect = true;
        let isCorrect = true;
       

        if (systemWords.length !== systemWords.filter(({isSystem}) => isSystem).length) {
            isSystemCorrect = false;
        }
        if (descriptionWords.length !== descriptionWords.filter(({isDescription}) => isDescription).length) {
            isDescCorrect = false;
            
        }
        if (roleWords.length !== roleWords.filter(({isRole}) => isRole).length) {
            isRoleCorrect = false;
        }

        isCorrect = isSystemCorrect && isDescCorrect && isRoleCorrect;

        if (isCorrect) {
            setIsFinalModal(true);
        } else {
            setIsIncorrectFinish(true);
            setPickedWords((prev) => ({
                ...prev,
                isSystemCorrect,
                isCorrect,
                isDescCorrect,
                isRoleCorrect
            }));
        }
    };


    const handleClick = () => {
        if (isFinish) {
            if (!pickedWords.isCorrect) {
                showCorrectAnswers();
                return;
            } 
            console.log('ale');
            setIsFinalModal(true);
            return;
        } 
        checkAnswers();
        setIsFinish(true);
    };


    const handleDrop = (words, item) => {
        setIsFirstWord((prev) => {
            if (prev) setIsTip(true);
            return false;
        });

        const wordIndex = allWords.findIndex((word) => word.id === item.id);
        setAllWords(prev => update(prev, {[wordIndex]: {$merge: {isPicked: true}}}));
        setPickedWords(prev => ({...prev, [words]: [...prev[words], item]}));
    }


    const handleBlockClick = (words, title) => {
        if (!pickedWords[words].length || isFinish) return;

        const handleDeleteWord = (id) => {
            const wordIndex = allWords.findIndex((word) => word.id === id);
            setAllWords(prev => update(prev, {[wordIndex]: {$merge: {isPicked: false}}}));
            setPickedWords(prev => ({...prev, [words]: prev[words].filter((word) => word.id !== id)}));
            if (pickedWords[words].filter((word) => word.id !== id).length === 0) {
                setEditedWords({
                    shown: false,
                    title,
                })
            }

        };

        setEditedWords({
            shown: true,
            title,
            words,
            onDelete: handleDeleteWord
        })
    };

    return (
        <>
            <Wrapper 
                $ratio={ratio}
                level={4} 
                btnText={isFinish && !pickedWords.isCorrect ? 'ПОКАЗАТЬ ОТВЕТ' : undefined}
                isAnimated={isIncorrectFinish && pickedWords.isCorrect}
                btnDisabled={allWords.filter(({isPicked}) => !isPicked).length}
                onClick={handleClick}
                blockInfo={[
                    {
                        text: <CommonText>
                            Работа не волк, а произведение силы на пройденный путь — чем больше сил, тем дальше пойдёшь :){'\n\n'}
                            Всегда нужно помнить об отдыхе и устраивать себе перерывы — пора{' '}
                            <BoldText>обустраивать комфортабельные зоны отдыха.</BoldText>
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 260,
                        taleLeft: 75,
                        top: 45,
                    }, 
                    {
                        text: <CommonText>
                        Система доставки почти готова. Ты знаешь, в чём именно заинтересованы стейкхолдеры проекта.{' '}
                        Время разобраться, <BoldText>что конкретный пользователь хочет от системы и почему.</BoldText>{'\n\n'}
                        Описать такое требование поможет один из самых популярных методов — <BoldText>User Story.</BoldText>{' '}
                        Он имеет свою <BoldText>структуру</BoldText> — её синтаксис тебе и предстоит сейчас разложить.
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 266,
                        taleLeft: 75,
                        top: 39,
                    }
                ]}
            >
                {isTip && <Dumb onClick={() => setIsTip(false)}/>}
                <ContentWrapper $ratio={ratio}>
                    Перетаскивай плашки с кусочками текста в соответствующие столбцы — части структуры User Story.
                </ContentWrapper>
                <Box $ratio={ratio}>
                    <Line $ratio={ratio}>
                        <CommonText>Как</CommonText>
                        <Field {...allWords[0]} ratio={ratio}/>
                        <Field {...allWords[1]} ratio={ratio}/>
                    </Line>
                    <Line $ratio={ratio}>
                        <CommonText>я хочу, чтобы</CommonText>
                        <Field {...allWords[2]} ratio={ratio}/>
                        <Field {...allWords[3]} ratio={ratio}/>
                    </Line>
                    <Line $ratio={ratio}>
                        <Field {...allWords[4]} ratio={ratio}/>
                        <Field {...allWords[5]} ratio={ratio}/>
                        <Field {...allWords[6]} ratio={ratio}/>
                        <CommonText>,</CommonText>
                    </Line>
                    <Line $ratio={ratio}>
                        <CommonText>чтобы</CommonText>
                        <Field {...allWords[7]} ratio={ratio}/>
                        <Field {...allWords[8]} ratio={ratio}/>
                    </Line>
                    <Line $ratio={ratio}>
                        <CommonText>и</CommonText>
                        <Field {...allWords[9]} ratio={ratio}/>
                        <Field {...allWords[10]} ratio={ratio}/>
                    </Line>
                    <Line $ratio={ratio}>
                        <Field {...allWords[11]} ratio={ratio}/>
                    </Line>
                </Box>
                <FieldsWrapper ref={$fieldsWrapper}>
                    <Block 
                        title={'Поведение\nсистемы'} 
                        ratio={ratio} 
                        onDrop={(item) => handleDrop('systemWords', item)}
                        onClick={() => handleBlockClick('systemWords', 'ПОВЕДЕНИЕ СИСТЕМЫ')}
                        isCorrect={pickedWords.isSystemCorrect}
                        isFinish={isFinish}
                        id={'sys'}
                        isShowingCorrect={isShowingCorrect}
                    >
                        {pickedWords.systemWords.map(word => (
                            <p key={`system_${word.id}`}>{word.text}</p>
                        ))}
                    </Block>
                    <Block 
                        title={"Роль\nпользователя"}
                        ratio={ratio} 
                        onDrop={(item) => handleDrop('roleWords', item)}
                        onClick={() => handleBlockClick('roleWords', 'РОЛЬ ПОЛЬЗОВАТЕЛЯ')}
                        isCorrect={pickedWords.isRoleCorrect}
                        isFinish={isFinish}
                        id={'role'}
                        isShowingCorrect={isShowingCorrect}
                    >
                        {pickedWords.roleWords.map(word => (
                            <p key={`role_${word.id}`}>{word.text}</p>
                        ))}
                    </Block>
                    <Block 
                        title={"Описание\nцели"} 
                        ratio={ratio} 
                        onDrop={(item) => handleDrop('descriptionWords', item)}
                        onClick={() => handleBlockClick('descriptionWords', 'ОПИСАНИЕ ЦЕЛИ')}
                        isCorrect={pickedWords.isDescCorrect}
                        isFinish={isFinish}
                        id={'desc'}
                        isShowingCorrect={isShowingCorrect}
                    >
                        {pickedWords.descriptionWords.map(word => (
                            <p key={`desc_${word.id}`}>{word.text}</p>
                        ))}
                    </Block>
                    {isTip && (
                        <>
                            <BlockTipWrapper $ratio={ratio} onClick={() => setIsTip(false)}/>
                            <BlockTip $ratio={ratio} onClick={() => setIsTip(false)}>
                                <BlockTipSvg />
                            </BlockTip>
                        </>
                    )}
                    
                </FieldsWrapper>
            </Wrapper>
            <DeleteBlock  
                {...editedWords} 
                array={pickedWords[editedWords.words]}
                onClose={() => setEditedWords(prev => ({...prev, shown: false}))}
            />
            <Additional
                shown={isFinalModal}
                onClick={next}
                blockInfo={[
                    {
                        text: 
                        <CommonText>
                            Так держать!{'\n'}
                            Стройматериалы и другие товары для обустройства <BoldText>зон отдыха</BoldText> уже{' '}
                            в пути на нашу Планету.
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 215,
                        taleLeft: 75,
                    }
                ]}
            >
                <ExplainTip $ratio={ratio} />
                <ExplainBtn 
                    type="dark" 
                    $ratio={ratio}
                    onClick={() => setIsFullExplain(true)}
                >
                    ПОЯСНЕНИЕ
                </ExplainBtn>
            </Additional>
            <Explaining shown={isFullExplain} onClick={() => setIsFullExplain(false)}>
                <CommonText>
                    <BoldText>«Описание поведения системы»</BoldText> — часть user story,{' '}
                    описывающая конкретные действия или поведение системы, которые необходимы для того,{' '}
                    чтобы удовлетворить потребности пользователя. Оно помогает разработчикам понять, какие функции{' '}
                    и особенности необходимо реализовать для достижения желаемого результата.{'\n\n'}
                    <BoldText>«Роль пользователя»</BoldText>  — определяет, для кого предназначен функционал.{' '}
                    Это помогает команде разработки сопоставить функции продукта с реальными потребностями{' '}
                    конкретных пользователей.{'\n\n'}
                    <BoldText>«Описание цели»</BoldText> — в этой части описывается причина, по которой{' '}
                    пользователь хочет использовать данный функционал — его основная цель или проблема,{' '}
                    которую нужно разрешить.
                </CommonText>
            </Explaining>
        </>
    )
}