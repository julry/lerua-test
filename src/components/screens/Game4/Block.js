import { useDrop } from "react-dnd"
import { CSSTransition, SwitchTransition } from "react-transition-group";
import styled from "styled-components";
import { colors } from "../../../constants/colors";
import { RuleBlock } from "../../shared/RuleBlock";
import { SWITCH_DURATION, SWITCH_NAME } from "./constants";

const Wrapper = styled.div`
    position: relative;
    width: calc((100% - ${({$ratio}) => $ratio * 10}px) / 3);
    & + & {
        margin-left: ${({$ratio}) => $ratio * 5}px;
    }
`;

const Title = styled(RuleBlock)`
    position: relative;
    z-index: 2;
    padding-top: ${({$ratio}) => $ratio * 6}px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    height: ${({$ratio}) => $ratio * 48}px;
    font-weight: 700;
    font-family: 'Leroy Merlin Sans', sans-serif;
    font-size: ${({$ratio}) => $ratio * 10}px;
    white-space: pre-line;
`;

const Field = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    z-index: 4;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: ${({$ratio}) => $ratio * 38}px;
    height: ${({$ratio}) => $ratio * 110}px;
    overflow-y: auto;
    border: 2px solid ${({$borderColor}) => $borderColor ?? colors.green};
    background: ${colors.gray};
    font-size: ${({$ratio}) => $ratio * 10}px;
    border-radius: ${({$ratio}) => $ratio * 10}px;
    padding: ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 7}px;
    font-weight: 700;
    font-family: 'Leroy Merlin Sans', sans-serif;
    text-align: center;

    & p + p {
        margin-top: ${({$ratio}) => $ratio * 5}px;
    }

    & p {
        position: relative;
    }

    & p:not(:last-child)::after {
        content: '';
        position: absolute;
        bottom: ${({$ratio}) => $ratio * -2.5}px;
        width: ${({$ratio}) => $ratio * 69}px;
        height: 1px;
        left: 50%;
        border-radius: 20px;
        transform: translateX(-50%);
        background: ${({$isFinish, $borderColor}) => $isFinish ? $borderColor : 'transparent'};
    }
    
    @media screen and (min-width: 450px) and (max-height: 720px) {
        height: ${({$ratio}) => $ratio * 95}px;
    }
`;

const TextWrapper = styled.div`
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

    & p {
        width: 100%;
        text-align: center;
    }
`;

export const Block = ({ id, title, onDrop, ratio, onClick, children, isCorrect, isFinish, isShowingCorrect }) => {
    const [, drop] = useDrop(() => ({
        accept: 'item',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item) => {
            onDrop?.(item);
        },
    }), []);


    return  (
        <Wrapper $ratio={ratio} ref={drop} onClick={onClick}>
            <Title $ratio={ratio}>
                {title}
            </Title>
            <Field $ratio={ratio} $borderColor={isCorrect ? colors.green : colors.yellow} $isFinish={isFinish}>
                <SwitchTransition mode='out-in'>
                    <CSSTransition key={`${id}_${isShowingCorrect}`} timeout={SWITCH_DURATION} classNames={SWITCH_NAME}>
                        <TextWrapper>
                            {children}
                        </TextWrapper>
                    </CSSTransition>
                </SwitchTransition>
            </Field>
        </Wrapper>
    )
}