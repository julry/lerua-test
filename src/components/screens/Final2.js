import styled from "styled-components";
import bg from '../../assets/images/finalBg.png';
import man from '../../assets/images/astronaut.svg';
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { CommonText } from "../shared/texts/CommonText";
import { BoldText } from "../shared/texts/BoldText";
import { InfoBlock } from "../shared/InfoBlock";
import { ButtonBottom } from "../shared/Button";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${bg}) no-repeat 0 0 /cover;
    padding: calc(16px * ${({$ratio}) => $ratio}) calc(22px * ${({$ratio}) => $ratio}) calc(40px * ${({$ratio}) => $ratio});
    display: flex;
    flex-direction: column;
    z-index: 0;
`;

const Man = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(278px * ${({$ratio}) => $ratio});
    height: calc(446px * ${({$ratio}) => $ratio});
    background: url(${man}) no-repeat 0 0;
`;

const InfoBlockStyled = styled(InfoBlock)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 450}px;
`;

const ButtonBottomStyled = styled(ButtonBottom)`
    position: relative;
    z-index: 10;
`;

export const Final2 = () => {
    const ratio = useSizeRatio();

    const handleClick = () => {};

    return (
        <Wrapper $ratio={ratio}>
            <Man $ratio={ratio}/>
            <InfoBlockStyled isBigTale taleLeft={92} maxWidth={279} $ratio={ratio}>
                <CommonText>
                Вместе нам удалось <BoldText>разработать новую систему учёта и обработки доставок.</BoldText>{' '}
                С её помощью не только жители Планеты, но и покупатели с Земли смогут быстрее получать свои заказы.{'\n\n'}
                А <BoldText>команда аналитиков</BoldText> Леруа Мерлен ждёт тебя,{' '}
                чтобы и дальше поработать над интересными проектами вместе!
                </CommonText>
            </InfoBlockStyled>
            <ButtonBottomStyled onClick={handleClick}>В КОМАНДУ</ButtonBottomStyled>
        </Wrapper>
    )
}