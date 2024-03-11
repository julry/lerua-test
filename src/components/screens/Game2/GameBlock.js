import { useDrop } from "react-dnd";
import styled from "styled-components";
import { SWITCH_NAME, SWITCH_DURATION } from "./constants";
import { colors } from "../../../constants/colors";

const Wrapper = styled.div`
    border-radius: ${({$ratio}) => $ratio * 10}px;
    width: 100%;
    background: ${({$isCorrect}) => $isCorrect ? colors.green : colors.yellow};
    padding: ${({$ratio}) => $ratio * 5}px;
    min-height: ${({$ratio, $hasChildren}) => $hasChildren ? 'none' : $ratio * 72 + 'px'};

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

export const GameBlock = ({children, onDrop, ratio, isCorrect, hasChildren}) => {
    const [, drop] = useDrop(() => ({
        accept: 'item',
        collect: monitor => ({
            hovered: monitor.canDrop() && monitor.isOver(),
        }),
        drop: (item) => {
            onDrop?.(item);
        },
    }), []);

    return (
        <Wrapper $ratio={ratio} ref={drop} $isCorrect={isCorrect} $hasChildren={hasChildren}>
            {children}
        </Wrapper>
    )
}