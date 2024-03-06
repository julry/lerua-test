import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import start from '../../../assets/images/start2.png';
import { useProgress } from '../../../contexts/ProgressContext';
import { Rocket } from './Rocket';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${start}) no-repeat 0 0 /cover;
    overflow: hidden;
`;

export const Intro2 = () => {
    const {next} = useProgress();
    const $gsap = useRef();

    gsap.registerPlugin(MotionPathPlugin);

    useEffect(() => {
        if ($gsap.current) return;

        $gsap.current = gsap.to('#rocket', {
            duration: 8.5, 
            motionPath: {
                ease: 'none',
                path: '#path_rocket',
                align: "#path_rocket",
                start: 0.05,
                alignOrigin: [0.5, 1],
            },
            onComplete: next
        });
    }, []);
    
    return (
        <Wrapper >
            <Rocket/>
        </Wrapper>
    )
}