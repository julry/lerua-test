import styled from "styled-components";
import bg from '../../assets/images/finalBg.png';
import man from '../../assets/images/astronaut.svg';
import { useSizeRatio } from "../../contexts/SizeRatioContext";
import { CommonText } from "../shared/texts/CommonText";
import { BoldText } from "../shared/texts/BoldText";
import { InfoBlock } from "../shared/InfoBlock";
import { Button } from "../shared/Button";
import { useProgress } from "../../contexts/ProgressContext";
import { colors } from "../../constants/colors";
import { useState } from "react";

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${bg}) no-repeat 0 0 /cover;
    padding: calc(16px * ${({$ratio}) => $ratio}) calc(22px * ${({$ratio}) => $ratio}) calc(40px * ${({$ratio}) => $ratio});;
    display: flex;
    flex-direction: column;
    z-index: 0;
    overflow: hidden;
`;

const Man = styled.div`
    position: absolute;
    right: calc(0px - 63px * ${({$ratio}) => $ratio});
    bottom: calc(0px - 38px * ${({$ratio}) => $ratio});
    width: calc(341px * ${({$ratio}) => $ratio});
    height: calc(490px * ${({$ratio}) => $ratio});
    background: url(${man}) no-repeat 0 0 /cover;
`;

const InfoBlockStyled = styled(InfoBlock)`
    position: absolute;
    bottom: ${({$ratio}) => $ratio * 450}px;
`;

const ButtonWrapper = styled.div`
    position: relative;
    z-index: 10;
    margin-top: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Form = styled.div`
    position: relative;
    margin-bottom:  ${({$ratio}) => $ratio * 9}px;
    width: ${({$ratio}) => $ratio * 300}px;
    padding: ${({$ratio}) => $ratio * 15}px;
    border-radius: ${({$ratio}) => $ratio * 15}px;
    background-color: ${colors.darkGray};
    padding-top: ${({$ratio, $isCorrect}) => $ratio * ($isCorrect ? 15 : 25)}px;

    transition: padding 0.3s;

    &::after {
        content: 'Неверный формат';
        position: absolute;
        top: ${({$ratio}) => $ratio * 7}px;
        left: ${({$ratio}) => $ratio * 20}px;
        font-size: ${({$ratio}) => $ratio * 11}px;
        width: 100%;
        height: ${({$ratio}) => $ratio * 11}px;
        color: ${colors.yellow};
        opacity: ${({$isCorrect}) => $isCorrect ? 0 : 1};
        transition: opacity 0.3s;
    }
`;

const InputRadioButton = styled.input`
  display: none;
`;

const RadioIconStyled = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${({$ratio}) => $ratio * 20}px;
  height: ${({$ratio}) => $ratio * 20}px;
  background-color: ${colors.darkGray};
  box-shadow: inset 0 0 0 2px ${colors.green};
  border-radius: ${({$ratio}) => $ratio * 5}px;
  margin-right: ${({$ratio}) => $ratio * 10}px;
`;

const RadioButtonLabel = styled.label`
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  font-size:  ${({$ratio}) => $ratio * 12}px;
  color: #B3B3B3;
  width: 100%;
  text-align: left;

  & ${InputRadioButton}:checked + ${RadioIconStyled} {
    background: ${colors.green};
  }

  & ${InputRadioButton}:checked + ${RadioIconStyled}::after {
    content: '';
    position: absolute;
    top: ${({$ratio}) => $ratio * 9.5}px;
    left: ${({$ratio}) => $ratio * 2.5}px;
    width: ${({$ratio}) => $ratio * 9}px;
    height: 3px;
    transform: rotate(60deg);
    background-color: ${colors.gray};
    border-radius: 5px;
  }

  & ${InputRadioButton}:checked + ${RadioIconStyled}::before {
    content: '';
    position: absolute;
    top: ${({$ratio}) => $ratio * 8.5}px;
    right: ${({$ratio}) => $ratio * 2}px;
    width: ${({$ratio}) => $ratio * 13}px;
    height: 3px;
    transform: rotate(-60deg);
    background-color: ${colors.gray};
    border-radius: 5px;
  }
`;

const Link = styled.a`
  color: inherit;
`;

const Input = styled.input`
    width: 100%;
    position: relative;
    outline: none;
    border: none;
    border-radius: ${({$ratio}) => $ratio * 5}px;
    padding: ${({$ratio}) => $ratio * 10}px;
    font-size: ${({$ratio}) => $ratio * 16}px;
    background: white;
    margin-bottom: ${({$ratio}) => $ratio * 13}px;
    box-shadow: ${({$isCorrect}) => !$isCorrect ? '0 0 0 2px' + colors.yellow : 'none'};
    
    &::placeholder {
        color: #B3B3B3;
    }
`;


export const Final = () => {
    const ratio = useSizeRatio();
    const {next} = useProgress();
    const [email, setEmail] = useState();
    const [isSending, setIsSending] = useState(false);
    const [isCorrect, setIsCorrect] = useState(true);
    const [isAgreed, setIsAgreed] = useState(false);

    const emailRegExp =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    const handleBlur = () => {
        if (email.match(emailRegExp) || !email) {
        setIsCorrect(true);
        } else {
        setIsCorrect(false);
        }
    };

    const handleChange = (e) => {
        setIsCorrect(true);
        setEmail(e.target.value);
    };

    const handleSubmit = () => {
        if (isSending) return;
        setIsSending(true);
        const GOOGLE_FORM_ACTION_URL =
          "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdOpZO11SITHj3PgUWP9eSZ59EVIrMPDL2Xdv0KbZwmexd0_g/formResponse";
        const EMAIL_ID = "entry.1472119565";
        const formData = new FormData();
    
        formData.append(EMAIL_ID, email);
    
        const myInit = {
          method: "POST",
          mode: "no-cors",
          body: formData,
        };
    
        const myRequest = new Request(GOOGLE_FORM_ACTION_URL, myInit);
    
        fetch(myRequest)
          .finally(() => {
            setIsSending(false);
            next();
          });
      };

    return (
        <Wrapper $ratio={ratio}>
            <Man $ratio={ratio}/>
            <InfoBlockStyled isBigTale taleLeft={92} maxWidth={230} $ratio={ratio}>
                <CommonText>
                Поздравляю! <BoldText>Доставка всех необходимых ресурсов налажена</BoldText> — жить и работать{' '}
                на Планете аналитиков теперь одно удовольствие.{'\n\n'}
                Кстати, за отличную работу у нас есть для тебя подарок — оставляй почту и <BoldText>участвуй</BoldText> в розыгрыше.{'\n'}
                Уверен, тебе повезёт!
                </CommonText>
            </InfoBlockStyled>
            <ButtonWrapper>
                <Form $ratio={ratio} $isCorrect={isCorrect}>
                    <Input 
                        $isCorrect={isCorrect} 
                        $ratio={ratio} 
                        value={email} 
                        placeholder={'Почта'}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <RadioButtonLabel $ratio={ratio}>
                        <InputRadioButton
                            $ratio={ratio}
                            type="checkbox"
                            value={isAgreed}
                            checked={isAgreed}
                            onChange={() => setIsAgreed((prevAgreed) => !prevAgreed)}
                        />
                        <RadioIconStyled $ratio={ratio}/>
                        <span>
                            Я согласен(а) на{"\u00A0"}
                            <Link
                            href={"https://fut.ru/personal_data_policy/"}
                            target="_blank"
                            >
                            обработку персональных данных
                            </Link>{" "}
                            и получение информационных сообщений
                        </span>
                    </RadioButtonLabel>
                </Form>
                <Button onClick={handleSubmit} disabled={!email || isSending || !isCorrect || !isAgreed}>УЧАСТВОВАТЬ</Button>
            </ButtonWrapper>
        </Wrapper>
    )
}