import styled, { keyframes } from "styled-components";
import { colors } from "../../constants/colors";
import { useSizeRatio } from "../../contexts/SizeRatioContext";

const TYPE_TO_BACKGROUND = {
    dark: colors.gray,
    light: colors.green
};

const TYPE_TO_COLOR = {
    dark: colors.green,
    light: 'white',
};

const TYPE_TO_BORDER = {
    dark: colors.green,
    light: 'rgba(0, 0, 0, 0.3)',
};

const ButtonStyled = styled.button`
    outline: none;
    border: none;
    margin: 0 auto;
    background: ${({$type}) => TYPE_TO_BACKGROUND[$type]};
    color: ${({$type}) => TYPE_TO_COLOR[$type]};
    box-shadow: inset 0 0 0 2px ${({$type}) => TYPE_TO_BORDER[$type]};
    transition: background 0.3s, color 0.3s;
    width: calc(300px * ${({$ratio}) => $ratio});
    height: calc(52px * ${({$ratio}) => $ratio});
    padding: calc(10px * ${({$ratio}) => $ratio});
    border-radius: calc(10px * ${({$ratio}) => $ratio});
    font-size: calc(20px * ${({$ratio}) => $ratio});
    font-weight: 700;
    cursor: pointer;

    &:disabled {
        background: #888888;
        color: rgba(255, 255, 255, 0.6);
    }
`;


export const Button = ({type = 'light', ...props}) => {
    const ratio = useSizeRatio();

    return <ButtonStyled {...props} $ratio={ratio} $type={type} />
}

const opacity = keyframes`
    0% {
        stroke-opacity: 0.55;
    }

    50% {
        stroke-opacity: 1;
    }

    100% {
        stroke-opacity: 0.55;
    }
`;

const AnimatedWrapper = styled(Button)`
    & svg {
        width: calc(80px * ${({$ratio}) => $ratio});
        height: calc(26px * ${({$ratio}) => $ratio});
    }

    & path {
        animation: ${opacity} 0.9s infinite;
    }

    & #btn_path_1 {
        animation-delay: 0.3s;
    }
    & #btn_path_2 {
        animation-delay: 0.6s;
    }
    & #btn_path_3 {
        animation-delay: 0.9s;
    }
`;

export const AnimatedButton = ({type = 'light', ...props}) => {
    const ratio = useSizeRatio();
    
    return (
        <AnimatedWrapper type={type} {...props} $ratio={ratio}>
            <svg viewBox="0 0 80 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="btn_path_1" d="M2 24L14 13L2 2" stroke="white" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path id="btn_path_2" d="M34 24L46 13L34 2" stroke="white" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path  id="btn_path_3" d="M66 24L78 13L66 2" stroke="white" stroke-opacity="0.55" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </AnimatedWrapper>
    )
}
