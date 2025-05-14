import React, { useCallback, useEffect, useRef, useState } from 'react';
import ShowcaseExplorer from '../applications/ShowcaseExplorer';
import ShutdownSequence from './ShutdownSequence';
import Toolbar from './Toolbar';
import DesktopShortcut, { DesktopShortcutProps } from './DesktopShortcut';
import { IconName } from '../../assets/icons';
import Doom from '../applications/Doom';
import BG from '../../assets/pictures/BG.png';
import Pacman from '../applications/Pacman';
import { useContext } from 'react';
import { ThemeContext } from '../../hooks/ThemeProvider';
import ThisComputer from '../applications/ThisComputer';

export interface DesktopProps {
    toggleTheme: () => void;
}

type ExtendedWindowAppProps<T> = T & WindowAppProps;


const APPLICATIONS: {
    [key: string]: {
        key: string;
        name: string;
        shortcutIcon: IconName;
        component: React.FC<ExtendedWindowAppProps<any>>;
    };
} = {
    showcase: {
        key: 'showcase',
        name: 'Showcase',
        shortcutIcon: 'windowExplorerIcon',
        component: ShowcaseExplorer,
    },
    computer: {
        key: 'computer',
        name: 'Internet Explorer',
        shortcutIcon: 'showcaseIcon',
        component: ThisComputer,
    },
    doom: {
        key: 'doom',
        name: 'Doom',
        shortcutIcon: 'doomIcon',
        component: Doom,
    },
    pacman: {
        key: 'pacman',
        name: 'Pacman',
        shortcutIcon: 'pacmanIcon',
        component: Pacman,
    }
};



const Desktop: React.FC<DesktopProps> = () => {
    const [windows, setWindows] = useState<DesktopWindows>({});
    const [shortcuts, setShortcuts] = useState<DesktopShortcutProps[]>([]);
    const [shutdown, setShutdown] = useState(false);
    const { themeToggler } = useContext(ThemeContext);
    const [numShutdowns, setNumShutdowns] = useState(1);
    const [contextMenu, setContextMenu] = useState({
        visible: false,
        x: 0,
        y: 0,
        transitioning: false,
    });
    const ticking = useRef(false);

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const [selection, setSelection] = useState({
        isSelecting: false,
        startX: 0,
        startY: 0,
        width: 0,
        height: 0,
        originX: 0,
        originY: 0,
    });

    useEffect(() => {
        const handleClickOutside = () => {
            if (contextMenu.visible) {
                setContextMenu((prev) => ({
                    ...prev,
                    transitioning: true,
                }));

                setTimeout(() => {
                    setContextMenu({
                        visible: false,
                        x: 0,
                        y: 0,
                        transitioning: false,
                    });
                }, 300);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [contextMenu]);

    const rebootDesktop = useCallback(() => {
        setWindows({});
    }, []);

    useEffect(() => {
        if (shutdown === true) rebootDesktop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shutdown]);

    const removeWindow = useCallback((key: string) => {
        setTimeout(() => {
            setWindows((prev) => {
                const newWindows = { ...prev };
                delete newWindows[key];
                return newWindows;
            });
        }, 100);
    }, []);

    const minimizeWindow = useCallback((key: string) => {
        setWindows((prev) => {
            const newWindows = { ...prev };
            newWindows[key].minimized = true;
            return newWindows;
        });
    }, []);

    const getHighestZIndex = useCallback((): number => {
        let highest = 0;
        Object.values(windows).forEach((win) => {
            if (win?.zIndex > highest) highest = win.zIndex;
        });
        return highest;
    }, [windows]);

    const toggleMinimize = useCallback((key: string) => {
        const newWindows = { ...windows };
        const highestIndex = getHighestZIndex();
        if (newWindows[key].minimized || newWindows[key].zIndex === highestIndex) {
            newWindows[key].minimized = !newWindows[key].minimized;
        }
        newWindows[key].zIndex = highestIndex + 1;
        setWindows(newWindows);
    }, [windows, getHighestZIndex]);

    const onWindowInteract = useCallback((key: string) => {
        setWindows((prev) => ({
            ...prev,
            [key]: {
                ...prev[key],
                zIndex: 1 + getHighestZIndex(),
            },
        }));
    }, [getHighestZIndex]);

    const startShutdown = useCallback(() => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns((n) => n + 1);
        }, 600);
    }, []);

    const addWindow = useCallback((key: string, element: JSX.Element) => {
        setWindows((prev) => ({
            ...prev,
            [key]: {
                zIndex: getHighestZIndex() + 1,
                minimized: false,
                component: element,
                name: APPLICATIONS[key].name,
                icon: APPLICATIONS[key].shortcutIcon,
            },
        }));
    }, [getHighestZIndex]);

    useEffect(() => {
        const newShortcuts: DesktopShortcutProps[] = [];
        Object.keys(APPLICATIONS).forEach((key, index) => {
            const app = APPLICATIONS[key];
            newShortcuts.push({
                shortcutName: app.name,
                icon: app.shortcutIcon,
                onOpen: () => {
                    addWindow(
                        app.key,
                        <app.component
                            onInteract={() => onWindowInteract(app.key)}
                            onMinimize={() => minimizeWindow(app.key)}
                            onClose={() => removeWindow(app.key)}
                            key={app.key}
                        />
                    );
                },
                x: 6,
                y: 16 + index * 104,
                width: 64,
                height: 80,
                selected: false,
            });
        });
        newShortcuts.forEach((shortcut) => {
            if (shortcut.shortcutName === 'Showcase') {
                shortcut.onOpen();
            }
        });

        setShortcuts(newShortcuts);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleMouseDown = (e: any) => {
        const originX = e.clientX;
        const originY = e.clientY;

        setSelection({
            isSelecting: e.target.className === 'desktop' /*&& e.button === 0*/,
            originX,
            originY,
            startX: originX,
            startY: originY,
            width: 0,
            height: 0,
        });

        setShortcuts((prev) =>
            prev.map((s) => ({
                ...s,
                selected: false,
            }))
        );
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!selection.isSelecting) return;

        if (!ticking.current) {
            window.requestAnimationFrame(() => {
                ticking.current = false;
                ticking.current = true;

                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const startX = Math.min(selection.originX, mouseX);
                const startY = Math.min(selection.originY, mouseY);
                const width = Math.abs(mouseX - selection.originX);
                const height = Math.abs(mouseY - selection.originY);

                setSelection((prev) => ({
                    ...prev,
                    startX,
                    startY,
                    width,
                    height,
                }));

                const box = {
                    x: selection.startX,
                    y: selection.startY,
                    width: selection.width,
                    height: selection.height,
                };

                setShortcuts((prevShortcuts) =>
                    prevShortcuts.map((shortcut) => {
                        const iconBox = {
                            x: shortcut.x ?? 0,
                            y: shortcut.y ?? 0,
                            width: shortcut.width ?? 64,
                            height: shortcut.height ?? 80,
                        };
                        return {
                            ...shortcut,
                            selected: isIntersecting(box, iconBox),
                        };
                    })
                );
                ticking.current = false;
            });
            ticking.current = true;
        }
    };

    const isIntersecting = (a: any, b: any, marginLeft: any = 32) => {
        return !(
            a.x > b.x + b.width + marginLeft ||
            a.x + a.width + a < b.x ||
            a.y > b.y + b.height ||
            a.y + a.height < b.y
        );
    };

    const handleMouseLeave = () => {
        setSelection({
            isSelecting: false,
            startX: 0,
            startY: 0,
            width: 0,
            height: 0,
            originX: 0,
            originY: 0,
        });
    };

    const handleMouseUp = () => {
        if (!selection.isSelecting) return;

        const box = {
            x: selection.startX,
            y: selection.startY,
            width: selection.width,
            height: selection.height,
        };

        setShortcuts((prevShortcuts) =>
            prevShortcuts.map((shortcut) => {
                const iconBox = {
                    x: shortcut.x ?? 0,
                    y: shortcut.y ?? 0,
                    width: shortcut.width ?? 64,
                    height: shortcut.height ?? 80,
                };
                return {
                    ...shortcut,
                    selected: isIntersecting(box, iconBox),
                };
            })
        );

        setSelection((prev) => ({
            ...prev,
            isSelecting: false,
        }));
    };

    const handleContextMenu = (e: any) => {
        e.preventDefault();

        if (e?.target?.className === 'desktop') setContextMenu({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            transitioning: false,
        });
    };

    return !shutdown ? (
        <div
            className='desktop'
            style={styles.desktop}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onContextMenu={handleContextMenu}
        >
            {Object.keys(windows).map((key) => {
                const element = windows[key].component;
                return (
                    <div
                        key={`win-${key}`}
                        style={{
                            zIndex: windows[key].zIndex,
                            ...(windows[key].minimized && styles.minimized),
                        }}
                    >
                        {React.cloneElement(element, {
                            key,
                            onInteract: () => onWindowInteract(key),
                            onClose: () => removeWindow(key),
                        })}
                    </div>
                );
            })}
            <div style={styles.shortcuts}>
                {shortcuts.map((shortcut) => (
                    <div
                        key={shortcut.shortcutName}
                        style={{
                            ...styles.shortcutContainer,
                            top: shortcut.y,
                            left: shortcut.x,
                        }}
                    >
                        <DesktopShortcut
                            icon={shortcut.icon}
                            shortcutName={shortcut.shortcutName}
                            onOpen={shortcut.onOpen}
                            selected={shortcut.selected}
                        />
                    </div>
                ))}
            </div>
            {selection.isSelecting && (
                <div
                    style={{
                        position: 'absolute',
                        left: selection.startX,
                        top: selection.startY,
                        width: selection.width,
                        height: selection.height,
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        border: '2px solid blue',
                        pointerEvents: 'none',
                    }}
                />
            )}
            {contextMenu.visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: contextMenu.y,
                        left: contextMenu.x,
                        backgroundColor: '#C0C0C0',
                        boxShadow: 'inset -2px -2px 0px #808080, inset 2px 2px 0px #FFFFFF',
                        zIndex: 9999,
                        padding: '2px 0',
                        fontFamily: 'Millennium, sans-serif',
                        width: 160,
                        display: 'flex',
                        flexDirection: 'column',
                        opacity: contextMenu.transitioning ? 0 : 1,
                        visibility: contextMenu.transitioning ? 'hidden' : 'visible',
                        transition: 'opacity 0.3s ease, visibility 0s 0.3s'
                    }}
                    onClick={() => setContextMenu({ ...contextMenu, visible: false })}
                >
                    <div
                        className='contextMenuItem'
                        style={{
                            ...contextItemStyle,
                            ...(hoveredItem === 'websites' ? contextItemHoverStyle : {})
                        }}
                        onMouseEnter={() => setHoveredItem('websites')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => {removeWindow('showcase'); setTimeout(() => {window.history.pushState(null, "", '/projects/websites'); shortcuts[0].onOpen();}, 100)}}
                    >
                        Websites
                    </div>
                    <div
                        style={{
                            ...contextItemStyle,
                            ...(hoveredItem === 'lineUpIcons' ? contextItemHoverStyle : {})
                        }}
                        onMouseEnter={() => setHoveredItem('lineUpIcons')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => {removeWindow('showcase'); setTimeout(() => {window.history.pushState(null, "", '/projects/motion'); shortcuts[0].onOpen();}, 100)}}
                    >
                        Motion
                    </div>
                    <div style={menuDividerStyle} />
                    <div
                        style={{
                            ...contextItemStyle,
                            ...(hoveredItem === 'paste' ? contextItemHoverStyle : {}),
                            ...specialItemStyle  // Apply white color for Paste
                        }}
                        onMouseEnter={() => setHoveredItem('paste')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        Paste
                    </div>
                    <div
                        style={{
                            ...contextItemStyle,
                            ...(hoveredItem === 'undoDelete' ? contextItemHoverStyle : {}),
                            ...specialItemStyle  // Apply white color for Delete
                        }}
                        onMouseEnter={() => setHoveredItem('undoDelete')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        Delete
                    </div>
                    <div style={menuDividerStyle} />
                    <div
                        style={{
                            ...contextItemStyle,
                            ...(hoveredItem === 'new' ? contextItemHoverStyle : {})
                        }}
                        onMouseEnter={() => setHoveredItem('new')}
                        onMouseLeave={() => setHoveredItem(null)}
                        onClick={() => {removeWindow('showcase'); setTimeout(() => {window.history.pushState(null, "", '/contact'); shortcuts[0].onOpen();}, 100)}}
                    >
                        New Project
                    </div>
                    <div
                        style={{
                            ...contextItemStyle,
                            ...(hoveredItem === 'properties' ? contextItemHoverStyle : {})
                        }}
                        onMouseEnter={() => setHoveredItem('properties')}
                        onMouseLeave={() => setHoveredItem(null)}
                    >
                        Properties
                    </div>
                </div>
            )}
            <Toolbar
                windows={windows}
                toggleMinimize={toggleMinimize}
                shutdown={startShutdown}
                toggleTheme={themeToggler}
            />
        </div>
    ) : (
        <ShutdownSequence setShutdown={setShutdown} numShutdowns={numShutdowns} />
    );
};

const contextItemStyle: React.CSSProperties = {
    padding: '2px 8px',
    whiteSpace: 'nowrap',
    fontSize: '14px',
    userSelect: 'none',
    color: 'black',
    backgroundColor: 'transparent',
    border: '1px solid transparent',
    display: 'block',
    width: 'auto',
    boxSizing: 'border-box',
    transition: 'background-color 0.2s, color 0.2s',
    margin: '0'
};


const contextItemHoverStyle: React.CSSProperties = {
    color: 'white',
    backgroundColor: '#0000a3'
};


const specialItemStyle: React.CSSProperties = {
    color: '#808080',
    backgroundColor: 'transparent',
};

const menuDividerStyle: React.CSSProperties = {
    height: '1px',
    backgroundColor: '#808080',
    margin: '4px 6px',
    borderTop: '1px solid #FFF'
};

const styles: StyleSheetCSS = {
    desktop: {
        minHeight: '100%',
        flex: 1,
        backgroundImage: `url(${BG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    },
    shutdown: {
        minHeight: '100%',
        flex: 1,
        backgroundColor: '#1d2e2f'
    },
    shortcutContainer: {
        position: 'absolute'
    },
    shortcuts: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    minimized: {
        pointerEvents: 'none',
        opacity: 0,
    },
};

export default Desktop;
