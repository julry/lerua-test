import { useDrag } from "react-dnd";
import { usePreview } from "react-dnd-multi-backend";
import styled from "styled-components"
import { colors } from "../../../constants/colors"

const Wrapper = styled.div`
    background: ${({$isPicked}) => $isPicked ? colors.gray : colors.darkGray};
    color: ${({$isPicked}) => $isPicked ? '#646464' : 'white'};
    box-shadow: inset 0 0 0 2px ${({$isPicked}) => $isPicked ? colors.darkGray : colors.green};
    padding: ${({$ratio}) => $ratio * 10}px ${({$ratio}) => $ratio * 8}px ${({$ratio}) => $ratio * 12}px;
    font-size: ${({$ratio}) => $ratio * 14}px;
    font-weight: 700;
    font-family: 'Leroy Merlin Sans', sans-serif;
    margin: 0 ${({$ratio}) => $ratio * 5}px;
    border-radius: ${({$ratio}) => $ratio * 10}px;

    & + & {
        margin-left: 0;
    }

    & p {
        width: max-content;
    }
`;

export const Field = ({text, id, isPicked, ratio, ...rest}) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'item',
        item: () => {
          return { id, text, ...rest }
        },
        collect: (monitor) => ({
          isDragging: monitor.isDragging(),
        }),
      });

    const FieldPreview = () => {
        const {display, style} = usePreview();

        if (!display) {
            return null;
        }

        return (
            <Wrapper style={{...style, zIndex: 9}} $ratio={ratio}>
                 <p>{text}</p>
            </Wrapper>
        );
    };


    if (isDragging) {
        return (
            <>
                <Wrapper $ratio={ratio} $isPicked>
                    <p>{text}</p>
                </Wrapper>
                <FieldPreview />
            </>
        )
    }
    return (
        <Wrapper ref={drag} $isPicked={isPicked} $ratio={ratio}>
             <p>{text}</p>
        </Wrapper>
    )
}