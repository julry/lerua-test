import { BoldText } from "../../shared/texts/BoldText";
import { CommonText } from "../../shared/texts/CommonText";

export const SWITCH_DURATION = 400;

export const SWITCH_NAME = 'correct';

export const AnswerExplain = (
    <CommonText isBig>
        К <BoldText>стейкхолдерам</BoldText> относятся все лица, заинтересованные в результате разработки.{'\n\n'}
        <BoldText>Участниками процесса</BoldText> являются те лица, которые напрямую взаимодействуют с системой{' '}
        и связаны с фактом её разработки.{'\n\n'}
        <BoldText>Первичные стейкхолдеры</BoldText> имеют непосредственное отношение{' '}
        к проекту и его исходу. Обычно включают в себя клиентов (или пользователей),{' '}
        сотрудников компании, участвующих в проекте напрямую, владельцев бизнеса, инвесторов{' '}
        и других людей или группы с прямым финансовым интересом. К ним также относятся регуляторы{' '}
        или другие лица, имеющие законные права в отношении проекта.       
    </CommonText>
)

export const ProccessExplain = (
    <CommonText isBig>
        <BoldText>Участники процесса</BoldText> — лица, которые напрямую взаимодействуют с системой и связаны с фактом её разработки.     
    </CommonText>
)

export const StakeholderExplain = (
    <CommonText isBig>
        <BoldText> Первичные стейкхолдеры</BoldText> — лица, которые имеют непосредственное отношение к проекту и его исходу.     
    </CommonText>
)