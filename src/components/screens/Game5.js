import { useState } from "react";
import styled from "styled-components";
import { useProgress } from "../../contexts/ProgressContext"
import { Button } from "../shared/Button";
import { GameWrapper } from "../shared/GameWrapper";
import { BoldText } from "../shared/texts/BoldText";
import { CommonText } from "../shared/texts/CommonText";
import { RuleBlock } from "../shared/RuleBlock";
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { colors } from "../../constants/colors";
import { Additional } from "../shared/Additional";
import { Explaining } from "../shared/Explaining";

const RuleBlockStyled = styled(RuleBlock)`
    padding: ${({$ratio}) => $ratio * 15}px;
    margin-top: ${({$ratio}) => $ratio * 20}px;
`;

const TableTitle = styled(RuleBlock)`
    padding: ${({$ratio}) => $ratio * 10}px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: ${({$ratio}) => $ratio * 7}px;
    font-family: 'Leroy Merlin Sans', sans-serif;
    font-weight: 700;
    font-size: ${({$ratio}) => $ratio * 12}px;
`;

const Task = styled.div`
    background: ${colors.gray};
    width: 100%;
    border: 2px solid ${colors.green};
    margin-top: ${({$ratio}) => $ratio * -3}px;
    white-space: pre-line;
    border-radius: ${({$ratio}) => $ratio * 10}px;
    padding: ${({$ratio}) => $ratio * 8}px;
    font-size: ${({$ratio}) => $ratio * 12}px;
`;


const chosenStyles = `
    color: ${colors.green};
    box-shadow: inset 0 0 0 2px ${colors.green};
`;

const Answers = styled.div`
    width: 100%;
    margin: ${({$ratio}) => $ratio * 18}px 0 ${({$ratio}) => $ratio * 10}px;
`;

const AnswerWrapper = styled.div` 
    position: relative;
    max-width: 100%;
    padding: ${({$ratio}) => $ratio * 12}px;
    background-color: ${({$bg}) => $bg ?? colors.gray};
    color: ${({$bg}) => $bg ? colors.darkGray : colors.yellow};
    box-shadow: inset 0 0 0 2px ${({$bg}) => $bg ? 'rgba(0,0,0,0.2)' : colors.yellow};
    transition: color .3s, box-shadow .3s, background-color .3s;
    cursor: pointer;
    overflow-x: scroll;
    border-radius: ${({$ratio}) => $ratio * 5}px;
    padding-bottom: ${({$ratio}) => $ratio * 24}px;
    ${({$isChosen, $bg}) => $isChosen && !$bg ? chosenStyles : ''};

    & + & {
        margin-top: ${({$ratio}) => $ratio * 10}px;
    }

    & p {
     white-space: pre-line;
        font-size: ${({$ratio}) => $ratio * 14}px;
        width: max-content;
    }
    scrollbar-color: transparent transparent;

    &::after {
        content: '';
        position: absolute;
        bottom: ${({$ratio}) => $ratio * 10}px;
        left: ${({$ratio}) => $ratio * 8}px;
        background: currentColor;
        height: 3px;
        width: ${({$ratio}) => $ratio * 34}px;
        border-radius: 17px;
    }
`;

const IncorrectText = styled(RuleBlock)`
    padding: ${({$ratio}) => $ratio * 10}px;
    margin-top: ${({$ratio}) => $ratio * 10}px;
    opacity: ${({opacity}) => opacity};
`;

const ExplainBtn = styled(Button)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 112}px;
    left: 50%;
    transform: translateX(-50%);
`;

export const Game5 = () => {
    const [isIntro, setIsIntro] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isShowCorrect, setIsShowCorrect] = useState(false);
    const [isAdditional, setIsAdditional] = useState(false);
    const [isFullExplain, setIsFullExplain] = useState(false);
    const [answer, setAnswer] = useState();
    const {next} = useProgress();
    const ratio = useSizeRatio();

    const handleClick = () => {
        if (isAnswered) {
           if (!isShowCorrect) {
                setIsShowCorrect(true);
                
                return;
           }

           setIsAdditional(true);

           return;
        } 

        setIsShowCorrect(answer === 1);
        setIsCorrect(answer === 1);
        setIsAnswered(true);
    };

    const handlePickAnswer = (id) => {
        if (isAnswered) return;

        setAnswer(id);
    };

    const getAnswerBg = (id) => {
        if (!isAnswered) return undefined;

        if (id === 1) return answer === id || isShowCorrect ? colors.green : undefined;

        return answer === id ? colors.yellow : undefined;
    };

    return (
        <>
        <GameWrapper
            level={5}
            overflow={isIntro ? 'hidden' : 'auto'}
            onCloseIntro={() => setIsIntro(false)}
            onClick={handleClick}
            btnDisabled={!answer}
            btnText={isAnswered ? isShowCorrect ? "ДАЛЕЕ" : "ПОКАЗАТЬ ОТВЕТ" : "ОТВЕТИТЬ"}
            blockInfo={[
                {
                    text: <CommonText>
                    Отдохнувший работник — продуктивный работник. Аналитики — не исключение :){' '}
                    Посидели в кафетерии, пора впитывать новые знания! Как раз для этого{' '}
                    нужны <BoldText>учебные центры</BoldText>. Здесь будет множество книг, тихие{' '}
                    зелёные уголки для чтения и удобные лекционные залы.
                    </CommonText>,
                    isBigTale: true,
                    maxWidth: 318,
                    taleLeft: 75,
                    top: 45,
                }, 
                {
                    text: <CommonText>
                        Нам нужно много материалов для этой задачи, как бы во всех не запутаться!{' '}
                        Тут явно требуется  <BoldText>сортировка данных и выделение нужных.</BoldText> Давай разберёмся,{' '}
                        сколько у нас сейчас сделано заказов и какие у них статусы.
                    </CommonText>,
                    isBigTale: true,
                    maxWidth: 325,
                    taleLeft: 75,
                    top: 45,
                }
            ]}
        >
            <RuleBlockStyled $ratio={ratio}>
                У тебя есть две таблицы: Orders и OrderStatus. Напиши SQL запрос,{' '}
                который выведет список статусов и количество заказов для каждого статуса.{' '}
                Ответ должен быть отсортирован по количеству заказов по убыванию.
            </RuleBlockStyled>
            <TableTitle $ratio={ratio}>
                Таблица 1: Orders
            </TableTitle>
            <Task $ratio={ratio}>
                — order_id (INT, идентификатор заказа){'\n'}
                — customer_id (INT, идентификатор клиента){'\n'}
                — order_date (DATE, дата заказа){'\n'}
                — status_id (INT, идентификатор статуса заказа){'\n'}
                — total_amount (DECIMAL, общая сумма заказа)
            </Task>
            <TableTitle $ratio={ratio}>
                Таблица 2: OrderStatus
            </TableTitle>
            <Task $ratio={ratio}>
                — status_id (INT, идентификатор статуса){'\n'}
                — status_name (VARCHAR, наименование статуса, например «Отправлен», «В обработке», «Доставлен»)     
            </Task>
            <Answers $ratio={ratio}>
                <AnswerWrapper 
                    $ratio={ratio} 
                    $isChosen={answer===1} 
                    onClick={() => handlePickAnswer(1)}
                    $bg={getAnswerBg(1)}
                >
                    <p>SELECT os.status_name, COUNT(o.order_id) AS orders_count{'\n'}</p>
                    <p>FROM Orders o{'\n'}</p>
                    <p>INNER JOIN OrderStatus os ON o.status_id = os.status_id{'\n'}</p>
                    <p>GROUP BY os.status_name{'\n'}</p>
                    <p>ORDER BY orders_count DESC;</p>
                </AnswerWrapper>
                <AnswerWrapper
                    $ratio={ratio} 
                    $isChosen={answer===2} 
                    onClick={() => handlePickAnswer(2)}
                    $bg={getAnswerBg(2)}
                >
                    <p>SELECT status_name, COUNT(order_id){'\n'}</p>
                    <p>FROM Orders{'\n'}</p>
                    <p>JOIN OrderStatus ON Orders.status_id = OrderStatus.status_id{'\n'}</p>
                    <p>ORDER BY COUNT(order_id) DESC;</p>
                </AnswerWrapper>
                <AnswerWrapper
                    $ratio={ratio}
                    $isChosen={answer===3} 
                    onClick={() => handlePickAnswer(3)} 
                    $bg={getAnswerBg(3)}
                >
                    <p>SELECT os.status_name, COUNT(*) AS orders_count{'\n'}</p>
                    <p>FROM OrderStatus os{'\n'}</p>
                    <p>LEFT JOIN Orders o ON os.status_id = o.status_id{'\n'}</p>
                    <p>GROUP BY os.status_name{'\n'}</p>
                    <p>ORDER BY orders_count ASC;</p>
                </AnswerWrapper>
                <AnswerWrapper 
                    $ratio={ratio} 
                    $isChosen={answer===4} 
                    onClick={() => handlePickAnswer(4)}
                    $bg={getAnswerBg(4)}
                >
                    <p>SELECT status_name, SUM(total_amount){'\n'}</p>
                    <p>FROM Orders{'\n'}</p>
                    <p>JOIN OrderStatus ON OrderStatus.status_id = Orders.status_id{'\n'}</p>
                    <p>GROUP BY status_name{'\n'}</p>
                    <p>ORDER BY SUM(total_amount) DESC;</p>
                </AnswerWrapper>
                <IncorrectText $ratio={ratio} opacity={+!isCorrect}>Верный ответ был совсем рядом…</IncorrectText>
            </Answers>
        </GameWrapper>
        <Additional
                shown={isAdditional}
                onClick={next}
                blockInfo={[
                    {
                        text: 
                        <CommonText>
                            Думаю, из этого кейса ты узнал для себя что‑то новое. Благодаря{' '}
                            тебе всё наше сообщество аналитиков сможет <BoldText>пополнять копилку знаний,</BoldText>{' '}
                            а самые матёрые гении анализа всегда будут готовы прийти на помощь.{'\n'}
                            Мы за обмен опытом!
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 243,
                        taleLeft: 75,
                    }
                ]}
            >
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
                Этот запрос корректно соединяет таблицу Orders с таблицей OrderStatus по status_id,{' '}
                группирует результаты по названию статуса и подсчитывает количество заказов для каждого статуса (COUNT(o.order_id)).{'\n\n'} 
                Завершает запрос инструкция ORDER BY, которая упорядочивает результаты по количеству{' '}
                заказов в убывающем порядке, что соответствует требованию задачи.
                </CommonText>
            </Explaining>
        </>
    )
}