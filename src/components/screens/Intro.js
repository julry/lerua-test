import styled from 'styled-components';
import start from '../../assets/images/start1.png';
import man from '../../assets/images/startAstronaut.svg';
import { colors } from '../../constants/colors';
import { useProgress } from '../../contexts/ProgressContext';
import { useSizeRatio } from '../../contexts/SizeRatioContext';
import { Button } from '../shared/Button';
import { InfoBlock } from '../shared/InfoBlock';
import { BoldText } from '../shared/texts/BoldText';
import { CommonText } from '../shared/texts/CommonText';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: url(${start}) no-repeat 0 0 /cover;
    padding: calc(16px * ${({$ratio}) => $ratio}) calc(22px * ${({$ratio}) => $ratio});
    display: flex;
    flex-direction: column;

`;

const InfoBlockStyled = styled(InfoBlock)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 465}px;
`;

const Man = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    width: calc(295px * ${({$ratio}) => $ratio});
    height: calc(443px * ${({$ratio}) => $ratio});
    background: url(${man}) no-repeat 0 0 /contain;
`;

const Info = styled.div`
    position: absolute;
    right: calc(193px * ${({$ratio}) => $ratio});
    bottom: calc(167px * ${({$ratio}) => $ratio});
    border: 2px solid ${colors.green};
    background-color: ${colors.gray};
    padding: calc(10px * ${({$ratio}) => $ratio});
    border-radius: 100px;
    white-space: pre-line;
`;

const ButtonStyled = styled(Button)`
    position: relative;
    z-index: 3;
    margin-top: auto;
`;

export const Intro = () => {
    const {next} = useProgress();
    const ratio = useSizeRatio();

    return (
    <Wrapper $ratio={ratio}>
        <Man $ratio={ratio} />
        <InfoBlockStyled isBigTale taleLeft={92} maxWidth={240} $ratio={ratio}>
            <CommonText isBig>
            Приветствую на борту космического корабля!{'\n\n'}
            Скоро мы отправимся в путешествие на «Планету аналитиков» с Леруа Мерлен.{'\n\n'}
            <BoldText>Запускай корабль и отправляйся в полёт!</BoldText>
            </CommonText>
        </InfoBlockStyled>
        <Info $ratio={ratio}>
            <CommonText>
                Ведущий аналитик{'\n'}
                <BoldText>Леруа Мерлен</BoldText>
            </CommonText>
        </Info>
        <ButtonStyled onClick={next}>ПОЕХАЛИ!</ButtonStyled>
    </Wrapper>
    )
}