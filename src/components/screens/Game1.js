import { useState } from "react";
import styled from "styled-components";
import bg from '../../assets/images/taskBg.png';
import { useProgress } from "../../contexts/ProgressContext"
import { Additional } from "../shared/Additional";
import { Button } from "../shared/Button";
import { GameWrapper } from "../shared/GameWrapper";
import { BoldText } from "../shared/texts/BoldText";
import { CommonText } from "../shared/texts/CommonText";

const Wrapper = styled.div`
    overflow: hidden;
    background: url(${bg}) no-repeat 0 0 / cover;
    width: 100%;
    height: 100%;
    ${({$blurred}) => $blurred ? 'filter: blur(0.5px)' : ''};
`;

export const Game1 = () => {
    // const [isFinish, setIsF]
    const {next} = useProgress();
    return (
            <GameWrapper 
                level={1} 
                blockInfo={[
                    {
                        text: <CommonText>
                        «Чтобы достигнуть цели, нужно чётко определить всю 
                        последовательность действий», — гласит один из принципов бизнес-аналитики. {'\n\n'}
                        Системы доставки ресурсов на нашу Планету это тоже касается. Поэтому первым 
                        делом <BoldText>расставь этапы этого бизнес-процесса в нужном порядке.</BoldText>
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 288,
                        taleLeft: 93,
                    }, 
                    {
                        text: <CommonText>
                        Помни, что важно не только расставить этапы в правильном порядке, 
                        но и гарантировать, что <BoldText>переходы между ними настроены гибко и эффективно</BoldText>, 
                        чтобы в случае изменений внешних условий или внутренних задач процесс мог быть быстро адаптирован.
                        </CommonText>,
                        isBigTale: true,
                        maxWidth: 288,
                        taleLeft: 93,
                    }
                ]}
            >
                <Button>ГОТОВО</Button>
            </GameWrapper>
            /* <Additional 
                shown={isIntro}
                onClick={() => setIsIntro(false)}
               
            /> */
    )
}