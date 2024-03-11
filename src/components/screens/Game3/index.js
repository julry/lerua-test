import { useMemo, useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../../contexts/ProgressContext"
import { Button, ButtonBottom } from "../../shared/Button";
import bg from '../../../assets/images/taskBg.png';
import { blurredStyle } from "../../../constants/styles";
import { RuleBlock } from "../../shared/RuleBlock";
import { colors } from "../../../constants/colors";
import { questions } from "./questions";
import { useSizeRatio } from "../../../contexts/SizeRatioContext";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { InfoBlock } from "../../shared/InfoBlock";
import { CommonText } from "../../shared/texts/CommonText";
import { shuffleArray } from "../../../utils/shuffleArray";
import { commonAnswers } from "./answers";
import { Explaining } from "../../shared/Explaining";
import { Additional } from "../../shared/Additional";
import { BoldText } from "../../shared/texts/BoldText";
import explainTip from './explainTip.svg';

const ANIMATION_NAME = 'question_animated';
const ANIMATION_DURATION = 300;

const Wrapper = styled.div`
    overflow: hidden;
    background: url(${bg}) no-repeat 0 0 / cover;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    ${({$blurred}) => $blurred ? blurredStyle : ''};
    padding: ${({$ratio}) => $ratio * 28}px ${({$ratio}) => $ratio * 28}px ${({$ratio}) => $ratio * 50}px;
`;

const Title = styled.h3`
    font-weight: 700;
    font-family: 'Leroy Merlin Sans', sans-serif;
    font-size: ${({$ratio}) => $ratio * 28}px;
    color: white;
    text-align: center;
`;

const ContentWrapper = styled(RuleBlock)`
    margin-top: ${({$ratio}) => $ratio * 20}px;
`;

const PathWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${({$ratio}) => $ratio * 10}px 0;
`;

const Path = styled.div`
    width: ${({$ratio}) => $ratio * 20}px;
    height: ${({$ratio}) => $ratio * 20}px;
    box-shadow: inset 0 0 0 2px ${colors.green};
    background-color: ${({$isActive}) => $isActive ? colors.green : colors.darkGray};
    transition: background-color 0.3s;
    border-radius: 50%;

    & + & {
        margin-left: ${({$ratio}) => $ratio * 40}px;
    }
`;

const QuestionWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

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

const BlockStyled = styled(InfoBlock)`
    position: relative;
    z-index: 3;
    height: ${({$ratio}) => $ratio * 165}px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const ArrowBtn = styled(Button)`
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    width: ${({$ratio}) => $ratio * 78}px;
    height: ${({$ratio}) => $ratio * 165}px;
    display: flex;
    align-items: center;

    &:disabled {
        box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
        background-color: ${colors.gray};
        & svg path{
            stroke: ${colors.darkGray};
        }
    }

    & svg {
        width: ${({$ratio}) => $ratio * 12}px;
        height: ${({$ratio}) => $ratio * 19}px;
    }
`;

const ArrowRight = styled(ArrowBtn)`
    right: 0;
    justify-content: flex-end;
    padding-right: ${({$ratio}) => $ratio * 10}px;
`;

const ArrowLeft = styled(ArrowBtn)`
    left: 0;
    justify-content: flex-start;
    padding-left: ${({$ratio}) => $ratio * 10}px;
`;

const AnswerInfo = styled(RuleBlock)`
    margin-top: auto;
    margin-bottom: ${({$ratio}) => $ratio * 13}px;
    height: ${({$ratio}) => $ratio * 38}px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.gray};
    max-width: ${({$ratio}) => $ratio * 320}px;
`;

const ExplainBtnWrapper = styled.div`
    width: 100%;
    margin-top: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const chosenStyles = `
    color: ${colors.green};
    box-shadow: inset 0 0 0 2px ${colors.green};
`;

const AnswerWrapper = styled.div` 
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: ${({$ratio}) => $ratio * 14}px;
    padding: ${({$ratio}) => $ratio * 12}px;
    background-color: ${({$bg}) => $bg ?? colors.gray};
    color: ${({$bg}) => $bg ? colors.darkGray : colors.yellow};
    box-shadow: inset 0 0 0 2px ${({$bg}) => $bg ?? colors.yellow};
    transition: color .3s, box-shadow .3s, background-color .3s;
    ${({$isChosen}) => $isChosen ? chosenStyles : ''};
    cursor: pointer;
    font-weight: 700;
    font-family: 'Leroy Merlin Sans', sans-serif;
`;

const ExplainingStyled = styled(Explaining)`
  padding: ${({$ratio}) => $ratio * 25}px ${({$ratio}) => $ratio * 20}px;
`;

const ButtonStyled = styled(Button)`
   margin-bottom: ${({$isMargin, $ratio}) => $isMargin ?  $ratio * 10 : 0}px;
`;

const LastExplainBtn = styled(Button)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 112}px;
    left: 50%;
    transform: translateX(-50%);
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

export const Game3 = () => {
    const ratio = useSizeRatio();
    const [answers, setAnswers] = useState({1: undefined});
    const [isExplain, setIsExplain] = useState(false);
    const [isAllCorrect, setIsAllCorrect] = useState(true);
    const [isFinish, setIsFinish] = useState(false);
    const [isLastExplained, setIsLastExplained] = useState(false);
    const [isFullExplain, setIsFullExplain] = useState(false);
    const [question, setQuestion] = useState(1);
    const [answer, setAnswer] = useState();
    const {next} = useProgress();

    const curQuestion = useMemo(() => questions.find(({id}) => id === question), [question]);
    const answersList = useMemo(() => shuffleArray(commonAnswers), [question]);

    const getAnswerBg = (id) => {
        if (!answers[question]) return undefined;
       
        if (id === curQuestion.correct) return colors.green;

        return answers[question] === id ? colors.yellow : undefined;
    };

    const handleAnswer = () => {
        setAnswers((prev) => ({...prev, [question]: answer}));
        if (isAllCorrect && answer !== curQuestion.correct) setIsAllCorrect(false);
        setAnswer();
    }

    const handleChooseAnswer = (id) => {
        if (!!answers[question]) return;

        setAnswer(id);
    }

    const handleChangeQuestion = (id) => {
        setAnswer();
        setQuestion(id);
    }

    const handleCloseExplain = () => {
        if (question === 3) setIsLastExplained(true);

        setIsExplain(false);
    };

    return (
        <>
            <Wrapper $ratio={ratio}>
                <Title $ratio={ratio}>
                    ЭТАП 3
                </Title>
                <ContentWrapper $ratio={ratio}>
                    Прочти формулировку требования и выбери, к какому уровню оно относится.
                </ContentWrapper>
                <PathWrapper $ratio={ratio}>
                    <Path $ratio={ratio} $isActive />
                    <Path $ratio={ratio} $isActive={question > 1} />
                    <Path $ratio={ratio} $isActive={question > 2} />
                </PathWrapper>
                <SwitchTransition>
                    <CSSTransition
                        key={question}
                        mountOnEnter 
                        unmountOnExit 
                        timeout={ANIMATION_DURATION} 
                        classNames={ANIMATION_NAME}
                    >
                        <QuestionWrapper>
                            {question > 1 && (
                                <ArrowLeft $ratio={ratio} onClick={() => handleChangeQuestion(question - 1)}>
                                    <svg viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 17.5L2 9.5L10 1.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </ArrowLeft>
                            )}
                            <BlockStyled 
                                maxWidth={254} 
                                $ratio={ratio}
                            >
                                <CommonText>
                                    {curQuestion?.text}
                                </CommonText>
                            </BlockStyled>
                            {
                                question < 3 && (
                                    <ArrowRight disabled={!answers[question]} $ratio={ratio} onClick={() => handleChangeQuestion(question + 1)}>
                                        <svg viewBox="0 0 12 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M2 17.5L10 9.5L2 1.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </ArrowRight>
                                )
                            }
                        </QuestionWrapper>
                    </CSSTransition> 
                </SwitchTransition>
                {
                    answersList.map((ans) => (
                        <AnswerWrapper 
                            $ratio={ratio}
                            key={ans.id}
                            $bg={getAnswerBg(ans.id)}
                            $isChosen={answer === ans.id}
                            onClick={() => handleChooseAnswer(ans.id)}
                        >
                            <CommonText>
                                    {ans.text}
                                </CommonText>
                        </AnswerWrapper>
                    ))
                }
                {
                    answers[question] ? (
                        <ExplainBtnWrapper>  
                            {!isLastExplained && (
                                <AnswerInfo $ratio={ratio}>
                                    {curQuestion.correct === answers[question] ? curQuestion.correctText : curQuestion.incorrectText}
                                </AnswerInfo>
                            )}
                            <ButtonStyled 
                                type="dark" 
                                onClick={() => setIsExplain(true)} 
                                $isMargin={isLastExplained}
                                $ratio={ratio}
                            >
                                ПОЯСНЕНИЕ
                            </ButtonStyled>
                            {isLastExplained && (
                                <Button onClick={() => setIsFinish(true)}>ДАЛЕЕ</Button>
                            )}
                        </ExplainBtnWrapper>
                    ) : <ButtonBottom disabled={!answer} onClick={handleAnswer}>ОТВЕТИТЬ</ButtonBottom>
                }
            </Wrapper>
            <ExplainingStyled shown={isExplain} onClick={handleCloseExplain} $ratio={ratio}>
                {curQuestion.explain}
            </ExplainingStyled>
            <Additional
                shown={isFinish}
                onClick={next}
                blockInfo={[
                    {
                        text: 
                        <CommonText>
                            {isAllCorrect ? 'Всё совершенно верно! ' : 'В твои ответы закрались ошибки, но ничего страшного — мы вместе со всем разобрались!\n'}
                            Теперь аналитики будут с удовольствием работать 
                            <BoldText>в просторных и комфортных офисах.</BoldText>
                        </CommonText>,
                        isBigTale: !isAllCorrect,
                        maxWidth: isAllCorrect ? 278 : 204,
                        taleLeft: 75,
                        top: 60,
                    }
                ]}
            >
                <ExplainTip $ratio={ratio} />
                <LastExplainBtn 
                    type="dark" 
                    $ratio={ratio}
                    onClick={() => setIsFullExplain(true)}
                >
                    ПОЯСНЕНИЕ
                </LastExplainBtn>
            </Additional>
            <Explaining shown={isFullExplain} onClick={() => setIsFullExplain(false)}>
                <CommonText>
                    Чтобы правильно определить уровень требования, идентифицируй ключевые слова и контекст. Например:{'\n\n'}
                    <BoldText>Бизнес-требования</BoldText> обычно содержат слова и фразы, связанные с целями компании,{' '}
                    рыночными стратегиями, бизнес-целями, ROI (возврат инвестиций).{'\n\n'}
                    <BoldText>Пользовательские требования</BoldText> часто включают описания потребностей{' '}
                    конечных пользователей или клиентов, сценариев использования (use cases),{' '}
                    пользовательских историй (user stories).{'\n\n'}
                    <BoldText>Системные (функциональные и нефункциональные) требования</BoldText> описывают 
                    конкретные функции, производительность, безопасность, совместимость системы и другие технические аспекты.
                </CommonText>
            </Explaining>
        </>
    )
}