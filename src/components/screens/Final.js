import styled from "styled-components";
import bg from '../../assets/images/finalBg.png';
import man from '../../assets/images/astronaut.svg';
import { useSizeRatio } from "../../contexts/SizeRatioContext";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${bg}) no-repeat 0 0 /cover;
    padding: calc(16px * ${({$ratio}) => $ratio}) calc(22px * ${({$ratio}) => $ratio});
    display: flex;
    flex-direction: column;
`;

const ManWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    height: calc(445px * ${({$ratio}) => $ratio});
`;

const Man = styled.div`
    position: absolute;
    right: calc(0px - 63px * ${({$ratio}) => $ratio});
    bottom: calc(0px - 38px * ${({$ratio}) => $ratio});
    width: calc(341px * ${({$ratio}) => $ratio});
    height: calc(484px * ${({$ratio}) => $ratio});
    background: url(${man}) no-repeat 0 0 /contain;
`;

export const Final = () => {
    const ratio = useSizeRatio();

    return (
        <Wrapper $ratio={ratio}>
            <ManWrapper  $ratio={ratio}>
                <Man  $ratio={ratio}/>
            </ManWrapper>
        </Wrapper>
    )
}