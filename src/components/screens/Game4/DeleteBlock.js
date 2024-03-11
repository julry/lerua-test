import { useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components"
import { colors } from "../../../constants/colors";
import { useSizeRatio } from "../../../contexts/SizeRatioContext";
import { InfoBlock } from "../../shared/InfoBlock";
import { CommonText } from "../../shared/texts/CommonText";

const ANIMATION_NAME = 'delete_animated';
const ANIMATION_DURATION = 300;

const Wrapper = styled.div`
    position: absolute;
    inset: 0;
    z-index: 10;
    overflow: hidden;

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

const Darken = styled(Wrapper)`
    z-index: 9;
    background: rgba(20, 59, 16, 0.4);
`;

const Block = styled(InfoBlock)`
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 10;
    transform: translate(-50%, -50%);
    border: 2px solid ${colors.green};
    border-radius: ${({$ratio}) => 15 * $ratio}px;
    padding: ${({$ratio}) => 15 * $ratio}px  ${({$ratio}) => 10 * $ratio}px  ${({$ratio}) => 10 * $ratio}px;
    min-width: ${({$ratio}) => 255 * $ratio}px;

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

const Data = styled.div`
    margin-top: ${({$ratio}) => 15 * $ratio}px;
    border-radius: ${({$ratio}) => 10 * $ratio}px;
    background-color: ${colors.green};
    padding: ${({$ratio}) => 5 * $ratio}px;
    min-width: ${({$ratio}) => 250 * $ratio}px;
`;

const DeletedItem = styled.div`
    display: flex;
    padding: ${({$ratio}) => 12 * $ratio}px;
    padding-left: ${({$ratio}) => 20 * $ratio}px;
    border: 2px solid ${colors.green};
    justify-content: space-between;
    align-items: center;
    min-width: ${({$ratio}) => 248 * $ratio}px;
    background-color: ${colors.gray};
    border-radius: ${({$ratio}) => 5 * $ratio}px;

    & svg {
        width: ${({$ratio}) => 20 * $ratio}px;
        height: ${({$ratio}) => 20 * $ratio}px;
        margin-left: ${({$ratio}) => 12 * $ratio}px;
    }
`;

const Title = styled(CommonText)`
    font-weight: 700;
    text-align: center;
`;

export const DeleteBlock = ({onDelete, title, array, shown, className, onClose}) => {
    const ratio = useSizeRatio();

    return (
        <CSSTransition
            in={shown && array?.length}
            mountOnEnter 
            unmountOnExit 
            timeout={ANIMATION_DURATION} 
            classNames={ANIMATION_NAME}
        >
            <Wrapper>
                <Darken onClick={onClose} />
                <Block $ratio={ratio} className={className}>
                    <Title isBig>{title}</Title>
                    <Data $ratio={ratio}>
                        {array?.map((item) =>  (
                            <DeletedItem key={item.id}  $ratio={ratio}>
                                <CommonText>
                                    {item.text}
                                </CommonText>
                                <svg 
                                    viewBox="0 0 20 20" 
                                    fill="none" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    onClick={() => onDelete(item.id)}
                                >
                                    <rect width="20" height="20" rx="5" fill="#44C313"/>
                                    <rect x="14.9492" y="3.9491" width="2" height="16" rx="1" transform="rotate(45 14.9492 3.9491)" fill="#2A2A2A"/>
                                    <rect x="3.63672" y="5.3634" width="2" height="16" rx="1" transform="rotate(-45 3.63672 5.3634)" fill="#2A2A2A"/>
                                </svg>
                            </DeletedItem>
                        ))}
                    </Data>
                </Block>
            </Wrapper>
        </CSSTransition>
    )
}
