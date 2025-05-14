import React from 'react';
// import DesktopShortcut from '../os/DesktopShortcut';
import Window from '../os/Window';

export interface ThisComputerProps extends WindowAppProps {}

const ThisComputerApp: React.FC<ThisComputerProps> = (props) => {
    return (
        <Window
            top={150}
            left={700}
            width={600}
            height={500}
            windowBarIcon="showcaseIcon"
            windowTitle="Internet Explorer"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
        >
            <div className="site-page">
                <iframe
                    src="https://oldgoogle.neocities.org/1998/"
                    title="google"
                    width="100%"
                    height="100%"
                />
                {/* <div style={}>
                    <DesktopShortcut
                        icon="computerBig"
                        invertText
                        shortcutName={'Computer Details'}
                        onOpen={() => {}}
                    />
                </div> */}
            </div>
        </Window>
    );
};

export default ThisComputerApp;
