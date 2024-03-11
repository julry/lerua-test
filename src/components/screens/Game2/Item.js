import styled from "styled-components";
import { useDrag } from 'react-dnd';
import { usePreview } from 'react-dnd-multi-backend';
import { colors } from "../../../constants/colors";

const Line = styled.div`
    padding: ${({$ratio}) => $ratio * 10}px ${({$ratio}) => $ratio * 12}px;
    width: 100%;
    border-radius: ${({$ratio}) => $ratio * 5}px;
    background: ${colors.gray};
    color: white;
    font-size: ${({$ratio}) => $ratio * 14}px;
    box-shadow: inset 0 0 0 2px ${({$isCorrect}) => $isCorrect === false ? colors.yellow : colors.green};
    opacity: ${({$opacity}) => $opacity};
    cursor: ${({$isDrag}) => $isDrag ? 'grab' : 'default'};

    white-space: pre-line;
    
    & + & {
        margin-top: ${({$ratio}) => $ratio * 10}px;
    }
`;

export const Item = ({ id, text, isProccess, ratio, borderColor, className, isCorrect, isDrag}) => {
    const [{ isDragging }, drag] = useDrag({
      type: 'item',
      item: () => {
        return { id, text, isProccess }
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    });

    const ListPreview = () => {
        const {display, style} = usePreview();

        if (!display) {
            return null;
        }

        return (
            <Line style={{...style, width: `calc((100% - 95 * ${ratio}px) / 2)`}} $ratio={ratio} $opacity={0.8}>
                {text}
            </Line>
        );
    };

    if (isDragging) {
        return <ListPreview />
    }

    return (
        <Line 
            className={className}
            ref={isDrag ? drag : null} 
            $ratio={ratio} 
            $borderColor={borderColor}
            $isCorrect={isCorrect}
            $isDrag={isDrag}
        >
            {text}
        </Line>
    )
}