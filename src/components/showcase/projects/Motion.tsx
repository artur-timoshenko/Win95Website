import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import software from '../../../assets/pictures/projects/software.gif';
import CharacterAnimation from '../../../assets/pictures/CharacterAnimation.gif';
import LogoAnimation from '../../../assets/pictures/Logo.gif';
import Reels from '../../../assets/pictures/reels.gif';
import ShowReel from '../../../assets/pictures/showreel.gif';
import Animation25D from '../../../assets/pictures/25D.gif';
import Explainer from '../../../assets/pictures/explainer.gif';
import WebsiteAnim from '../../../assets/pictures/Website.gif';
import copyNinjaImage from '../../../assets/icons/copy-ninja.png';

export interface ProjectsProps {}

interface ProjectBoxProps {
    icon: string;
    title: string;
    subtitle: string;
    route: string;
    iconStyle: React.CSSProperties;
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
                                                   icon,
                                                   title,
                                                   subtitle,
                                                   route,
                                                   iconStyle,
                                               }) => {
    const [, setIsHovering] = useState(false);

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    return (
        <Link
            to={`/projects/${route}`}
            className="big-button-container"
            style={{ ...styles.projectLink, textDecoration: 'none', color: 'inherit' }}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <div style={styles.projectLinkLeft}>
                <img
                    src={icon}
                    style={{ ...styles.projectLinkImage, ...iconStyle }}
                    alt=""
                />
                <div style={styles.projectText}>
                    <h1 style={{ fontSize: 48 }}>{title}</h1>
                    <h3>{subtitle}</h3>
                </div>
            </div>
            <div style={styles.projectLinkRight}></div>
        </Link>


    );
};

const Projects: React.FC<ProjectsProps> = () => {
    return (
        <div className="site-page-content">
            <h1>Motion</h1>
            <h3>Projects</h3>
            <br />
            <p>
                Below you will find all the websites I have created previously.
                I have tried to include as many visuals and interactive elements as possible to showcase each project.
                Enjoy exploring!
            </p>
            <br />
            <div style={styles.projectLinksContainer}>
                <ProjectBox
                    icon={ShowReel}
                    iconStyle={styles.ShowIcon}
                    title="ShowReel"
                    subtitle="My ShowReel"
                    route="ShowReel"
                />
                <ProjectBox
                    icon={Animation25D}
                    iconStyle={styles.d25Icon}
                    title="2.5D Animation"
                    subtitle="3D + 2D Animation"
                    route="Animation25D"
                />
                <ProjectBox
                    icon={WebsiteAnim }
                    iconStyle={styles.ninjaIcon}
                    title="Website Animation"
                    subtitle="Lottie/Rive"
                    route="WebsiteAnimation"
                />
                <ProjectBox
                    icon={Reels}
                    iconStyle={styles.reelIcon}
                    title="Reels"
                    subtitle="Reels/Tiktok/Shorts"
                    route="Reels"
                />
                <ProjectBox
                    icon={Explainer}
                    iconStyle={styles.computerIcon}
                    title="Explainers"
                    subtitle="Website"
                    route="Explainers"
                />
                <ProjectBox
                    icon={CharacterAnimation}
                    iconStyle={styles.cIcon}
                    title="Character Animation"
                    subtitle="Landing Page"
                    route="CharacterAnimation"
                />
                <ProjectBox
                    icon={LogoAnimation}
                    iconStyle={styles.artIcon}
                    title="Logo Animation"
                    subtitle="Bringing Your Brand to Life"
                    route="LogoAnimation"
                />
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    projectLinksContainer: {
        flexDirection: 'column',
        width: '100%',
        display: 'flex',
        flex: 1,
    },
    projectLink: {
        marginBottom: 24,
        cursor: 'pointer',
        width: '100%',
        boxSizing: 'border-box',

        alignItems: 'center',
        justifyContent: 'space-between',
    },
    projectText: {
        justifyContent: 'center',
        flexDirection: 'column',
        marginLeft: 40,
    },
    projectt:{
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 40,
    },
    projectLinkImage: {
        width: 48,
        // height: 48,
        marginRight: 38,
    },
    projectLinkLeft: {
        marginLeft: 16,
        alignItems: 'center',
    },
    computerIcon: {
        width: 75,
        height: 75,
    },
    arrowIcon: {
        width: 48,
        height: 48,
    },
    artIcon: {
        width: 75,
        height: 75,
    },
    cIcon:{
        width: 100,
        height: 100,
    },
    reelIcon:{
        width: 75,
        height: 75,
    },
    d25Icon:{
        width: 75,
        height: 75,
    },
    ShowIcon:{
        width: 75,
        height: 75,
    },
    ninjaIcon:{
        width: 75,
        height: 75,
    }
};

export default Projects;
