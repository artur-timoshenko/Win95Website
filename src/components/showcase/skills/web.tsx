import React, { CSSProperties, useState, useEffect } from 'react';
import HTMLicon from '../../../assets/icons/HTMLicon.png'
import { Link } from 'react-router-dom';
import CSSicon from '../../../assets/icons/CSSicon.png'
import JSicon from '../../../assets/icons/JSicon.png'
import ReactIcon from '../../../assets/icons/ReactIcon.png'
import DJicon from '../../../assets/icons/DJicon.png'
import FAicon from '../../../assets/icons/FAicon.png'

export interface WebProps {}

const Web: React.FC<WebProps> = () => {
    const skillLevels = [
        { name: 'HTML', level: 8, icon: HTMLicon },
        { name: 'CSS', level: 6, icon: CSSicon },
        { name: 'JavaScript', level: 8, icon: JSicon },
        { name: 'Django', level: 6, icon: DJicon },
        { name: 'React', level: 8, icon: ReactIcon },
        { name: 'Fastapi', level: 6, icon: FAicon },
    ];


    return (
        <div className="skills-page" style={styles.pageContainer}>
            <h1 style={styles.heading}>Web Development Skills</h1>
            <div className="skills-container" style={styles.skillsContainer}>
                {skillLevels.map((skill, index) => (
                    <div key={index} style={styles.skillBlock}>
                        <div style={styles.skillName}>{skill.name}</div>
                        <div style={styles.skillContainer}>
                            {skill.icon && <img src={skill.icon} alt={`${skill.name} icon`} style={styles.icon} />}
                            <div style={styles.progressBar}>
                                <ProgressBar level={skill.level} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div>
            </div>
        </div>
    );
};

// Progress Bar component
const ProgressBar: React.FC<{ level: number }> = ({ level }) => {
    const totalBlocks = 10;
    const filledBlocks = level;

    const [visibleBlocks, setVisibleBlocks] = useState<boolean[]>(Array(totalBlocks).fill(false));

    useEffect(() => {
        const timeoutIds: any[] = [];
        for (let i = 0; i < filledBlocks; i++) {
            timeoutIds.push(
                setTimeout(() => {
                    setVisibleBlocks((prev) => {
                        const newState = [...prev];
                        newState[i] = true;
                        return newState;
                    });
                }, i * 100)
            );
        }

        return () => timeoutIds.forEach(clearTimeout);
    }, [filledBlocks]);

    const blocks = [];
    for (let i = 0; i < totalBlocks; i++) {
        blocks.push(
            <div
                key={i}
                style={{
                    display: 'inline-block',
                    width: '9%',
                    height: '20px',
                    backgroundColor: i < filledBlocks ? '#0000a3' : '#c3c6ca',
                    margin: '0 2px',
                    boxSizing: 'border-box',
                    opacity: visibleBlocks[i] ? 1 : 0,
                    transition: 'opacity 1s',
                }}
            />
        );
    }

    return <div style={styles.progressBarContent}>{blocks}</div>;
};

const styles = {
    pageContainer: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'center',
        justifyContent: 'flex-start', // Изменено на 'flex-start' для выравнивания элементов сверху
        padding: '20px',
        marginTop: '50px',
        fontFamily: "Terminal",
        maxWidth: '1200px',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'transparent',
        minHeight: '100vh', // Страница будет занимать хотя бы всю высоту экрана
        overflowY: 'auto', // Разрешаем прокрутку
        scrollBehavior: 'smooth', // Добавляем плавный скроллинг
    } as CSSProperties,
    heading: {
        fontSize: '36px',
        textAlign: 'center' as 'center',
        marginBottom: '20px',
        color: '#333',
        width: '100%',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
    } as CSSProperties,
    skillsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '800px',
        gap: '20px', // Добавляем зазор между элементами для удобства
    } as CSSProperties,
    skillBlock: {
        width: '48%',
        marginBottom: '15px',
        padding: '10px',
        backgroundColor: 'transparent',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column' as const,
        boxSizing: 'border-box',
        opacity: 1,
    } as CSSProperties,
    skillContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    } as CSSProperties,
    skillName: {
        fontSize: '18px',
        marginBottom: '-5px',
        marginLeft: '70px',
        color: '#333',
    } as CSSProperties,
    icon: {
        width: '60px',
        height: '60px',
        marginRight: '10px',
        marginTop: '-20px',
    } as CSSProperties,
    progressBar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '300px',
        height: '30px',
        boxSizing: 'border-box',
        borderRadius: '2px',
        backgroundColor: '#c3c6ca',
        boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.5)',
    } as CSSProperties,
    progressBarContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '400px',
        height: '100%',
    } as CSSProperties,
    scrollButtonContainer: {
        marginTop: '20px',
        textAlign: 'center' as 'center',
    },
    scrollButton: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#0000a3',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
};

export default Web;
