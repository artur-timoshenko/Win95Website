import React, { CSSProperties, useState } from 'react';
import logoVideo from '../../../../assets/video/logo.mp4';

export interface LogoAnimationProps {}

const textStyle: CSSProperties = {
    fontFamily: "'Terminal', Courier, monospace",
};

const centerTextStyle: CSSProperties = {
    fontFamily: "'Terminal', Courier, monospace",
    textAlign: 'center',
};

const baseButtonStyle: CSSProperties = {
    height: '60px',
    width:'100%',
    fontSize: '20px',
    cursor: 'pointer',
    marginTop: '20px',
    fontFamily: "'MS Sans Serif', Geneva, sans-serif",
    backgroundColor: '#C0C0C0',
    transition: 'background-color 0.3s ease',
};

const styles = {
    divider: {
        width: '100%',
        height: '2px',
        backgroundColor: '#000',
        margin: '10px 0',
    } as CSSProperties,
    videoContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '20px',
    },
    video: {
        width: '640px',
        height: '360px',
        border: '2px solid #000',
    } as CSSProperties,
    retroPlayer: {
        width: '640px',
        height: '360px',
        backgroundColor: '#C0C0C0',
        border: '2px solid #808080',
        boxShadow: 'inset -2px -2px #fff, inset 2px 2px #000',
        padding: '4px',
    } as React.CSSProperties,
    retroVideo: {
        width: '100%',
        height: '100%',
        border: '2px inset #808080',
    } as React.CSSProperties,
};

const LogoAnimation: React.FC<LogoAnimationProps> = () => {
    const [isHovered, setIsHovered] = useState(false);

    const buttonStyle = {
        ...baseButtonStyle,
        backgroundColor: isHovered ? '#0000ee' : '#C0C0C0',
        color: isHovered ? 'white' : 'black',
    };

    return (
        <div className="site-page-content terminal-font">
            <h1>Logo Animation</h1>
            <h2>Breathe Life into Your Brand</h2>
            <br />
            <div style={styles.divider}>ㅤ</div>

            <h2>What is Logo Animation?</h2>
            <p style={textStyle}>
                Logo animation is a way to give your brand personality and make it memorable. Through dynamic and
                expressive movements, your logo will attract more attention and create a lasting impression. Whether
                it's a simple and elegant animation or striking visual transformations, the possibilities are endless.
            </p>

            {/* Video block */}
            <div style={styles.videoContainer}>
                <div style={styles.retroPlayer}>
                    <video controls style={styles.retroVideo}>
                        <source src={logoVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <p style={{ ...centerTextStyle, marginTop: '6px', fontSize: '20px', maxWidth: '640px' }}>
                    Examples of logo animation.
                </p>
            </div>

            <div style={styles.divider}>ㅤ</div>

            <h2>Animation Creation Process</h2>
            <p style={textStyle}>Creating high-quality logo animation involves several key stages:</p>
            <ol>
                <li><strong>Analysis and Planning:</strong>
                    <p style={textStyle}>Understand the brand, determine animation goals and audience.</p>
                    <p style={textStyle}>Select the type and style of animation suitable for the logo.</p>
                    <p style={textStyle}>Identify technical requirements for different platforms.</p>
                </li>
                <li><strong>Concept and Idea Development:</strong>
                    <p style={textStyle}>Create sketches and drafts of possible options.</p>
                    <p style={textStyle}>Prepare a storyboard for complex projects.</p>
                </li>
                <li><strong>Export and Integration:</strong>
                    <p style={textStyle}>Prepare the final file in formats such as GIF, MP4, Lottie, and others.</p>
                </li>
                <li><strong>Final Review and Adjustments:</strong>
                    <p style={textStyle}>Discuss the animation with the client and make necessary revisions.</p>
                </li>
            </ol>

            <div style={styles.divider}>ㅤ</div>

            <h2>Let's Work Together!</h2>
            <p style={textStyle}>
                Ready to animate your logo and make your brand stand out? Click the button below and start collaborating
                with us. We will help you create an animation that will definitely be remembered!
            </p>
            <div style={styles.divider}>ㅤ</div>
            <div style={{ textAlign: 'center' }}>
                <button
                    style={buttonStyle}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => alert('Clicked!')}
                >
                    Order
                </button>
            </div>
        </div>
    );
};

export default LogoAnimation;
