import styled from "styled-components";
import {colors} from '../../constants/colors';
import bigTale from '../../assets/images/bigTale.svg';
import shortTale from '../../assets/images/shortTale.svg';
import { useSizeRatio } from "../../contexts/SizeRatioContext";

const Wrapper = styled.div`
    position: relative;
    background: ${colors.darkGray};
    border: 2px solid ${colors.green};
    border-radius: calc(20px * ${({$ratio}) => $ratio});
    padding: calc(16px * ${({$ratio}) => $ratio});
    white-space: pre-line;
    max-width: ${({$ratio, $maxWidth}) => $maxWidth * $ratio}px;
`;

const Tale = styled.div`
    position: absolute;
    left: ${({$ratio, left}) => $ratio * left}px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 0 0;
`;

const BigTale = styled(Tale)`
    bottom: calc(0px - 31px * ${({$ratio}) => $ratio});
    width: calc(39px * ${({$ratio}) => $ratio});
    height: calc(33px * ${({$ratio}) => $ratio});
    background-image: url(${bigTale});
`;

const ShortTale = styled(Tale)`
    bottom: calc(0px - 19px * ${({$ratio}) => $ratio});
    width: calc(34px * ${({$ratio}) => $ratio});
    height: calc(21px * ${({$ratio}) => $ratio});
    background-image: url(${shortTale});
`;

export const InfoBlock = ({maxWidth, taleLeft, className, children, isBigTale}) => {
    const ratio = useSizeRatio();
    const Tale = isBigTale ? BigTale : ShortTale;

    return (
        <Wrapper $ratio={ratio} className={className} $maxWidth={maxWidth}>
            {children}
            {!!taleLeft && <Tale left={taleLeft} $ratio={ratio} />}
        </Wrapper>
    );
};
