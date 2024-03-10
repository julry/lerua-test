import { useDrop } from "react-dnd";
import styled from "styled-components";
import { colors } from "../../../constants/colors";

const Wrapper = styled.div`
    border-radius: ${({$ratio}) => $ratio * 10}px;
    width: 100%;
    background: ${({$isCorrect}) => $isCorrect ? colors.green : colors.yellow};
    padding: ${({$ratio}) => $ratio * 5}px;
    min-height: ${({$ratio, $hasChildren}) => $hasChildren ? 'none' : $ratio * 72 + 'px'};
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