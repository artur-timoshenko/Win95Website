import React from 'react';

// @ts-ignore
import computerBig from './computerBig.png';
// @ts-ignore
import windowResize from './windowResize.png';
// @ts-ignore
import maximize from './maximize.png';
// @ts-ignore
import minimize from './minimize.png';
// @ts-ignore
import shutdown from './shutdown.png';
// @ts-ignore
import computerSmall from './computerSmall.png';
// @ts-ignore
import myComputer from './myComputer.png';
// @ts-ignore
import showcaseIcon from './showcase.png';
// @ts-ignore
import credits from './credits.png';
// @ts-ignore
import volumeOn from './volumeOn.png';
// @ts-ignore
import volumeOff from './volumeOff.png';
// @ts-ignore
import windowGameIcon from './windowGameIcon.png';
// @ts-ignore
import windowExplorerIcon from './windowExplorerIcon.png';
// @ts-ignore
import windowsStartIcon from './windowsStartIcon.png';
// @ts-ignore
import close from './close.png';

const icons = {
    windowResize: windowResize,
    maximize: maximize,
    minimize: minimize,
    shutdown: shutdown,
    computerSmall: computerSmall,
    myComputer: myComputer,
    computerBig: computerBig,
    showcaseIcon: showcaseIcon,
    volumeOn: volumeOn,
    volumeOff: volumeOff,
    credits: credits,
    close: close,
    windowGameIcon: windowGameIcon,
    windowExplorerIcon: windowExplorerIcon,
    windowsStartIcon: windowsStartIcon,
};

export type IconName = keyof typeof icons;

const getIconByName = (
    iconName: IconName
    // @ts-ignore
): React.FC<React.SVGAttributes<SVGElement>> => icons[iconName];

export default getIconByName;
