import { Final } from "../components/screens/Final";
import { Game1 } from "../components/screens/Game1";
import { Game2 } from "../components/screens/Game2";
import { Game3 } from "../components/screens/Game3";
import { Game4 } from "../components/screens/Game4";
import { Game5 } from "../components/screens/Game5";
import { Intro } from "../components/screens/Intro";
import { Intro2 } from "../components/screens/Intro2";
import { Intro3 } from "../components/screens/Intro3";
import { PathScreen1 } from "../components/screens/PathScreen1";
import { PathScreen2 } from "../components/screens/PathScreen2";
import { PathScreen3 } from "../components/screens/PathScreen3";
import { PathScreen4 } from "../components/screens/PathScreen4";
import { PathScreen5 } from "../components/screens/PathScreen5";
import { PathScreen6 } from "../components/screens/PathScreen6";

export const screens = [
    {
        id: 0,
        component: Intro
    },
    { 
        id: 1,
        component: Intro2
    },
    { 
        id: 2,
        component: Intro3
    },
    {
        id: 3,
        component: PathScreen1
    },
    {
        id: 4,
        component: Game1
    },
    {
        id: 5,
        component: PathScreen2
    },
    {
        id: 6,
        component: Game2
    },
    {
        id: 7,
        component: PathScreen3
    },
    {
        id: 8,
        component: Game3
    },
    {
        id: 9,
        component: PathScreen4
    },
    {
        id: 10,
        component: Game4
    },
    {
        id: 11,
        component: PathScreen5
    },
    {
        id: 12,
        component: Game5
    },
    {
        id: 13,
        component: PathScreen6
    }, 
    {
        id: 14,
        component: Final
    }
];