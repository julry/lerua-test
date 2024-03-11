import styled from "styled-components";
import { useDrag, useDrop } from 'react-dnd';
import {mergeRefs} from 'react-merge-refs';
import { useRef } from "react";
import { usePreview } from 'react-dnd-multi-backend';
import { colors } from "../../../constants/colors";

const Line = styled.div`
    padding: ${({$ratio}) => $ratio * 16}px ${({$ratio}) => $ratio * 12}px;
    border-radius: ${({$ratio}) => $ratio * 5}px;
    background: ${colors.gray};
    color: white;
    font-size: ${({$ratio}) => $ratio * 16}px;
    box-shadow: inset 0 0 0 2px ${({$borderColor}) => $borderColor ?? colors.green};
    opacity: ${({$opacity}) => $opacity};
    cursor: ${({$isDrag}) => $isDrag ? 'grab' : 'default'};

    & + & {
        margin-top: 2px;
    }
`;

export const Item = ({ id, text, index, moveItem, ratio, borderColor, order, isDrag }) => {
    const $ref = useRef();

    const [{ handlerId }, drop] = useDrop({
      accept: 'item',
      collect(monitor) {
        return {
          handlerId: monitor.getHandlerId(),
        }
      },
      hover(item, monitor) {
        if (!$ref.current) return;

        const dragIndex = item.index;
        const hoverIndex = index;

        if (dragIndex === hoverIndex) return;

        const hoverBoundingRect = $ref.current?.getBoundingClientRect()
        const hoverMiddleY =
          (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        const hoverClientY = clientOffset.y - hoverBoundingRect.top
   
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return
        }
        moveItem(dragIndex, hoverIndex)
        item.index = hoverIndex
      },
    });

    const [{ isDragging }, drag] = useDrag({
      type: 'item',
      item: () => {
        return { id, index }
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
            <Line style={{...style, width: 300 * ratio + 'px'}} $ratio={ratio} $opacity={0.8}>
                {text}
            </Line>
        );
    };

    if (isDragging) {
        return (
            <>
                <Line $opacity={0} $ratio={ratio}> {text} </Line>
                <ListPreview />
            </>
        )
    }

    return (
        <Line 
            ref={isDrag ? mergeRefs([$ref, drag, drop]) : null} 
            data-handler-id={handlerId} 
            $ratio={ratio} 
            $borderColor={borderColor}
            $isDrag={isDrag}
        >
            {text}
        </Line>
    )
}