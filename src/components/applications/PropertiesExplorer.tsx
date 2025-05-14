import React, { useState } from 'react';
import Window from '../os/Window';
import useInitialWindowSize from '../../hooks/useInitialWindowSize';
import propIcon from '../../../src/assets/icons/propIcon.png';
import SettingsIcon from '../../../src/assets/icons/SettingsIcon.png';

export interface PropertiesExplorerProps extends WindowAppProps {
    style?: React.CSSProperties; // Добавьте это свойство
}
const PropertiesExplorer: React.FC<PropertiesExplorerProps> = (props) => {
    const { initWidth, initHeight } = useInitialWindowSize({ margin: 100 });

    const windowWidth = Math.min(initWidth - 100, 550); // Adjust width to fit better
    const windowHeight = Math.min(initHeight - 100, 400); // Adjust height to fit better

    return (
        <Window
            top={24}
            left={56}
            width={windowWidth}
            height={windowHeight}
            windowTitle="System Properties"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText="© Copyright 2025 Neura"
        >
            <div style={styles.container}>
                {/* Left side: Icon */}
                <img src={propIcon} alt="Windows 95 Logo" style={styles.logo} />

                {/* Right side: Text */}
                <div style={styles.textContainer}>
                    <p style={styles.text}><strong>System:</strong></p>
                    <p style={styles.textb}>Microsoft Windows 95</p>
                    <p style={styles.text}><strong>Registered to:</strong></p>
                    <p style={styles.textb}>v86<br />24796-OEM-0014736-66386<br />28877-111-111111-85570</p>
                    <p style={styles.text}><strong>Computer:</strong></p>
                    <p style={styles.textb}>Pentium Pro<br />64.0MB RAM</p>
                </div>
            </div>
        </Window>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row' as 'row', // Explicitly specify 'row' for flexDirection
        padding: '10px',
        fontFamily: 'Millennium, sans-serif', // Apply the terminal font globally here
        fontSize: '12px',
        color: '#000',
        alignItems: 'flex-start', // Align items to the top
    },
    logo: {
        width: '150px',
        height: '150px',
        marginRight: '30px',
        marginTop: '30px',
        marginLeft: '30px',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column' as 'column', // Explicitly specify 'column' for flexDirection
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'Millennium, sans-serif', // Apply the terminal font globally here
        marginTop: '10px',
        marginLeft: '20px',
        marginBottom: '10px', // Space between text elements
        display: 'block',  // Ensure text elements stack vertically
        whiteSpace: 'pre-wrap', // Maintain line breaks in the text
        overflowWrap: 'break-word' as 'break-word', // Explicitly specify 'break-word' for overflowWrap
    },
    textb: {
        fontFamily: 'Millennium, sans-serif', // Apply the terminal font globally here
        marginLeft: '40px'
    },
};

export default PropertiesExplorer;
