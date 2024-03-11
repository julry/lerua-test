import {useEffect, useMemo} from "react";
import {SwitchTransition, CSSTransition} from "react-transition-group";
import styled from 'styled-components';
import {useProgress} from "../contexts/ProgressContext";
import { preloadImage } from "../utils/preloadImage";

const SWITCH_DURATION = 500;

const SWITCH_NAME = 'switch';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    &.${SWITCH_NAME}-enter {
        opacity: 0;
    }

    &.${SWITCH_NAME}-enter-active {
        opacity: 1;
        transition: opacity ${SWITCH_DURATION}ms;
    }

    &.${SWITCH_NAME}-exit {
        opacity: 1;
    }

    &.${SWITCH_NAME}-exit-active {
        opacity: 0;
        transition: opacity ${SWITCH_DURATION}ms;
    }
`

export function ScreenContent() {
    const {screen} = useProgress()
    const Screen = useMemo(() => screen?.component, [screen])

    useEffect(() => {
        let preloadImages = screen?.preloadImages;
        const clears = preloadImages && preloadImages.map(img => preloadImage(img));
        return () => clears && clears.forEach(clear => clear());
      }, [screen]);

    return Screen && (
        <SwitchTransition mode='out-in'>
            <CSSTransition key={screen?.id} timeout={SWITCH_DURATION} classNames={SWITCH_NAME}>
                <Wrapper>
                    <Screen />
                </Wrapper>
            </CSSTransition>
        </SwitchTransition>
    )
}