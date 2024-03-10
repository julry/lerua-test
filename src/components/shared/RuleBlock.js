import styled from "styled-components";
import { colors } from "../../constants/colors";
import { CommonText } from "./texts/CommonText";

export const RuleBlock = styled(CommonText)`
    width: 100%;
    border-radius: ${({$ratio}) => $ratio * 10}px;
    background: ${colors.darkGray};
    padding: ${({$ratio}) => $ratio * 5}px ${({$ratio}) => $ratio * 5}px;
    text-align: center;
    border: 2px solid rgba(0, 0, 0, 0.2);
`;
