import React from 'react';

import windowResize from './windowResize.png';
import maximize from './maximize.png';
import minimize from './minimize.png';
import shutdown from './shutdown.png';
import computerSmall from './computerSmall.png';
import myComputer from './myComputer.png';
import showcaseIcon from './showcase.png';
import credits from './credits.png';
import volumeOn from './volumeOn.png';
import volumeOff from './volumeOff.png';
import windowGameIcon from './windowGameIcon.png';
import windowExplorerIcon from './windowExplorerIcon.png';
import windowsStartIcon from './windowsStartIcon.png';
import close from './close.png';
import doomIcon from './doomIcon.png'
import pacmanIcon from './pacmanIcon.png'
import tetrisIcon from './pacmanIcon.png'
import moonIcon from './moonIcon.png'
import sunIcon from './moonIcon.png'
import HTMLicon from'./HTMLicon.png'
import AEIcon from './AEicon.png'
import AIicon from './AIicon.png'
import PSicon from './PSicon.png'
import PRicon from './PRicon.png'
import AsepriteIcon from './AsepriteIcon.png'
import BlenderIcon from './BlenderIcon.png'
import CSSicon from './CSSicon.png'
import JSicon from './JSicon.png'
import ReactIcon from './ReactIcon.png'
import DJicon from './DJicon.png'
import FAicon from './FAicon.png'
import TGicon from './TGicon.png'

const icons = {
    windowResize: windowResize,
    maximize: maximize,
    minimize: minimize,
    shutdown: shutdown,
    computerSmall: computerSmall,
    myComputer: myComputer,
    showcaseIcon: showcaseIcon,
    volumeOn: volumeOn,
    volumeOff: volumeOff,
    credits: credits,
    close: close,
    windowGameIcon: windowGameIcon,
    windowExplorerIcon: windowExplorerIcon,
    windowsStartIcon: windowsStartIcon,
    doomIcon:doomIcon,
    pacmanIcon:pacmanIcon,
    tetrisIcon: tetrisIcon,
    moonIcon:moonIcon,
    sunIcon:sunIcon,
    HTMLicon:HTMLicon,
    AEIcon:AEIcon,
    AIicon:AIicon,
    PSicon:PSicon,
    PRicon:PRicon,
    AsepriteIcon:AsepriteIcon,
    BlenderIcon:BlenderIcon,
    CSSicon:CSSicon,
    JSicon:JSicon,
    ReactIcon:ReactIcon,
    DJicon:DJicon,
    FAicon:FAicon,
    TGicon:TGicon,

};

export type IconName = keyof typeof icons;

const getIconByName = (
    iconName: IconName
    // @ts-ignore
): React.FC<React.SVGAttributes<SVGElement>> => icons[iconName];

export default getIconByName;
