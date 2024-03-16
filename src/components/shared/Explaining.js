import { CSSTransition } from "react-transition-group";
import styled from "styled-components"
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { Button } from "./Button";
import { InfoBlock } from "./InfoBlock"

const ANIMATION_NAME = 'explain_animated';
const ANIMATION_DURATION = 300;

const Wrapper = styled.div`
    position: absolute;
    inset: 0;
    z-index: 10;
    background: rgba(20, 59, 16, 0.4);
    overflow: hidden;

    backdrop-filter: blur(1.5px);
    -webkit-backdrop-filter: blur(1.5px);
`;

const Block = styled(InfoBlock)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: ${({$ratio}) => 319 * $ratio}px;
    padding: ${({$ratio}) => 25 * $ratio}px ${({$ratio}) => 20 * $ratio}px;

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

const ButtonStyled = styled(Button)`
    position: absolute;
    bottom: calc(50px * ${({$ratio}) => $ratio});
    left: 50%;
    transform: translateX(-50%);

    @media screen and (max-height: 650px) {
        bottom: calc(30px * ${({$ratio}) => $ratio});
    }
`;

export const Explaining = ({onClick, children, shown, className}) => {
    const ratio = useSizeRatio();

    return (
        <CSSTransition
            in={shown}
            mountOnEnter 
            unmountOnExit 
            timeout={ANIMATION_DURATION} 
            classNames={ANIMATION_NAME}
        >
            <Wrapper>
                <Block $ratio={ratio} className={className}>
                    {children}
                </Block>
                <ButtonStyled $ratio={ratio} onClick={onClick}>ПОНЯТНО</ButtonStyled>
            </Wrapper>
        </CSSTransition>
    )
}
