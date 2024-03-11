import { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import gsap from 'gsap';
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import start from '../../../assets/images/start2.png';
import { useProgress } from '../../../contexts/ProgressContext';
import { Rocket } from './Rocket';
import { colors } from '../../../constants/colors';

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    background: url(${start}) no-repeat 0 0 /cover;
    overflow: hidden;
`;


const loader = keyframes`
    0%   {clip-path:polygon(50% 50%,0 0,0    0,0    0   ,0    0   ,0    0   )}
    25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0   ,100% 0   ,100% 0   )}
    50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
    75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0    100%,0    100%)}
    100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0    100%,0    0   )}
`;

const Loader = styled.div`
    position: absolute;
    bottom: 46px;
    left: 50%;
    transform: translateX(-50%); 
    border-radius: 50%;
    border: 2px solid ${colors.green};
    background-color: ${colors.gray};
    padding: 8px;
`;

const Animated = styled.div`
    aspect-ratio: 1;
    border-radius: 50%;
    animation: ${loader} 2s 3;
    width: 48px;
    height: 48px;
    transform: rotate(45deg);
    border: 5px solid ${colors.green};
    aspect-ratio: 1;

    &::after {
        content: "";
        aspect-ratio: 1;
        position: absolute;
        inset: -5px;
        border-radius: 50%;
        border: 5px solid ${colors.green};
        animation: ${loader} 2s 3 linear;
    }
`;

export const Intro2 = () => {
    const {next} = useProgress();
    const $gsap = useRef();

    gsap.registerPlugin(MotionPathPlugin);

    useEffect(() => {
        if ($gsap.current) return;

        $gsap.current = gsap.to('#rocket', {
            duration: 7, 
            motionPath: {
                ease: 'none',
                path: '#path_rocket',
                align: "#path_rocket",
                start: 0.05,
                alignOrigin: [0.5, 1],
            },
        });
    }, []);
    
    useEffect(() => {
        let timeout = setTimeout(() => {
            next()
        }, 6000);

        return () => clearTimeout(timeout);
    })
    
    return (
        <Wrapper >
            <Rocket/>
            <Loader>
                <Animated />
            </Loader>
        </Wrapper>
    )
}