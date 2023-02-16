import "../styles/about.css"
import userIcon from '../assets/images/userIcon.jpg'
import {Documentation} from '../components/Documentation'
export const About = () =>{
    return (
        <>
            <div className="about-section">
                <h1>About Us</h1>
            </div>
            <div className="aboutContainer">


                <h2>Our Team</h2>
                <div className="row">
                    <div className="column">
                        <div className="card">
                            <img src={userIcon} alt="Nick" className="userImg"></img>
                            <div className="container">
                                <h2>Nick Obreiter</h2>
                                <p className="title">CEO & Founder</p>
                                <p>Jung, Brutal, Gut aussehender CEO</p>
                                <br/>
                                <p>neeroxz@hotmail.com</p>
                                <p>
                                    <button className="button">Contact</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <img src={userIcon} alt="Marvin" className="userImg"></img>

                            <div className="container">
                                <h2>Marvin Samouelian</h2>
                                <p className="title">CEO & Founder</p>
                                <p>Jung, Brutal, Gut aussehender CEO</p>
                                <br/>
                                <p>marvin@web.com</p>
                                <p>
                                    <button className="button">Contact</button>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="column">
                        <div className="card">
                            <img src={userIcon} alt="Martin" className="userImg"></img>

                            <div className="container">
                                <h2>Martin Hofsäß</h2>
                                <p className="title">CEO & Founder</p>
                                <p>Jung, Brutal, Gut aussehender CEO</p>
                                <br/>
                                <p>martin@google.com</p>
                                <p>
                                    <button className="button">Contact</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Documentation/>
        </>
    );
}