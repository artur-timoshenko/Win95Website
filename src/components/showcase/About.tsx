import React, { CSSProperties } from 'react';
import us from '../../assets/pictures/working.png';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';

export interface AboutProps {}

const styles: { [key: string]: React.CSSProperties } = {
    contentHeader: {
        marginBottom: 16,
        fontSize: 48,
    },
    image: {
        height: 'auto',
        width: '100%',
    },
    topImage: {
        height: 'auto',
        width: '100%',
        marginBottom: 32,
    },
    verticalImage: {
        alignSelf: 'center',
        marginLeft: 32,
        flex: 0.8,
        alignItems: 'center',
        textAlign: 'center',
        flexDirection: 'column',
    },
    divider:{
        width:'100%',
        height:'2px',
        backgroundColor:'#000',
        margin: '10px 0'
    }as CSSProperties,
};

const About: React.FC<AboutProps> = () => {
    return (
        <div className="site-page-content">
            {/* <img src={me} style={styles.topImage} alt="" /> */}
            <h1 style={{ marginLeft: -16 }}>Welcome</h1>
            <h3>We Are Neura</h3>
            <br />
            <div className="text-block">
                <p>We are Neura</p>
                <br />
                <p>
                    Thank you for taking the time to check out our portfolio. We really hope you enjoy exploring it as
                    much as we enjoyed
                    building it. If you have any questions or comments, feel free to contact us using{' '}
                    <Link to="/contact">this form</Link> or shoot me an email at{' '}
                    <a href="mailto:arthurtymoshenko1@gmail.com">arthurtymoshenko1@gmail.com</a>
                </p>
            </div>
            <div style={styles.divider}>ㅤ</div>
            <div className="text-block">
                <h3>About US</h3>
                <br />
                <p>
                    In 2025, We founded company with the goal of combining creativity and technology to deliver
                    exceptional digital
                    experiences. Specializing in website development and motion design, our team focuses on crafting
                    visually stunning
                    websites and engaging animations that captivate and connect with audiences. From the very beginning,
                    our mission has
                    been to provide innovative solutions that not only meet the needs of our clients but also push the
                    boundaries of what
                    is possible in the digital world.
                </p>
                <br />
                <div className="captioned-image">
                    <img src={us} style={styles.image} alt="" />
                    <p>
                        <sub>
                            <b>Figure 1:</b> A real photo of me developing this website :)
                        </sub>
                    </p>
                </div>

                <p>
                    The Most Creative Way to Bring Your Vision to Life Whether you're looking to create an immersive
                    website, design
                    captivating animations, or engage your audience with visually stunning digital experiences, motion
                    design and web
                    development are at the heart of it all. And Neura provides you with the most innovative, scalable,
                    and reliable
                    solutions to bring your ideas to life. Since 2025, our team has been helping clients transform their
                    digital presence
                    through cutting-edge websites and motion design – delivering impactful and memorable experiences
                    every time.
                </p>

                <br />
                <div style={styles.divider}>ㅤ</div>
                <div className="text-block">
                    <p>
                        Thanks for reading about us! We hope that you enjoy exploring the rest of our portfolio website
                        and everything it has
                        to offer.
                        <a
                            rel="noreferrer"
                            target="_blank"
                            href="https://t.me/ArTym0"
                        >
                            @TymoshenkoProduction
                        </a>{' '}
                        Good luck and have fun!
                    </p>
                    <br />
                    <p>
                        If you have any questions or comments We would love to hear them. You can reach us through
                        the{' '}
                        <Link to="/contact">contact page</Link> or shoot me an email at{' '}
                        <a href="mailto:arthurtymoshenko1@gmail.com">arthurtymoshenko1@gmail.com</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;
