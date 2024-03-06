import {createContext, useContext, useState} from 'react'
import {screens} from "../constants/screens";
import {getUrlParam} from "../utils/getUrlParam";

const INITIAL_STATE = {
    screen: 0,
}

const ProgressContext = createContext(INITIAL_STATE)

export function ProgressProvider(props) {
    const {children} = props
    const [currentScreenIndex, setCurrentScreenIndex] = useState(getUrlParam('screen') || INITIAL_STATE.screen)
    const screen = screens[currentScreenIndex];

    function next() {
        const nextScreenIndex = currentScreenIndex + 1;
        if (nextScreenIndex > screens.length - 1) return;

        setCurrentScreenIndex(nextScreenIndex);
    }

    const state = {
        screen,
        next,
    }

    return (
        <ProgressContext.Provider value={state}>
            {children}
        </ProgressContext.Provider>
    )
}

export function useProgress() {
    return useContext(ProgressContext)
}
