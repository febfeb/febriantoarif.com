import React from "react";
import CircleImage from "../components/CircleImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnchor, faCommentAlt, faLink, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            works: [
                { company: "Crowdbotics", position: "Frontend Engineer", time: "Apr 2021 - Present" },
                { company: "Arkana Teknologi Indonesia", position: "Founder", time: "Jan 2018 - Present" },
                { company: "Indoartha Citra Media", position: "Technical Director", time: "Apr 2013 – Dec 2016" },
            ],
            portfolios: [
                {
                    title: "Example App",
                    description: "This is example app",
                    clientName: "Client Name",
                    year: 2017,
                    url: null,
                    googlePlay: "https://play.google.com/blabla",
                    appStore: "https://apps.apple.com/blabla",
                    thumbnail: "/portfolio/example.jpg"
                },
                {
                    title: "Example App",
                    description: "This is example app",
                    clientName: "Client Name",
                    year: 2017,
                    url: "https://google.com",
                    googlePlay: "https://play.google.com/blabla",
                    appStore: "https://apps.apple.com/blabla",
                    thumbnail: "/portfolio/example.jpg"
                }
            ]
        };
    }


    render() {
        // console.log("Keys", Object.keys(this.state.bookingListPerHour));
        return (
            <div className='row'>
                <div className='col-md-12'>
                    {/* Mobile View */}
                    <div className='d-lg-none'>
                        <div className='flex-column' style={{ marginTop: 50 }}>
                            <CircleImage src='/headshot.jpg' size={150} />

                            <div className='flex flex-column justify-center'>
                                <h1>Febrianto Arif Rakhman</h1>
                                <h5>Senior Full-stack Mobile Developer</h5>

                                <div className='flex-row' style={{ flexWrap: 'wrap' }}>
                                    <div className='badge-skill'>React Native</div>
                                    <div className='badge-skill'>Yii Framework</div>
                                    <div className='badge-skill'>MySQL</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Desktop View */}
                    <div className='d-none d-lg-block'>
                        <div className='flex-row ' style={{ marginTop: 50 }}>
                            <CircleImage src='/headshot.jpg' size={150} />

                            <div className='flex flex-column justify-center' style={{ marginLeft: 40 }}>
                                <h1>Febrianto Arif Rakhman</h1>
                                <h5>Senior Full-stack Mobile Developer</h5>

                                <div className='flex-row'>
                                    <div className='badge-skill'>React Native</div>
                                    <div className='badge-skill'>Yii Framework</div>
                                    <div className='badge-skill'>MySQL</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: 50 }} />

                    <h2>MY WORK EXPERIENCE</h2>

                    {this.state.works.map((work, key) => {
                        return (
                            <div key={key} className='work-row'>
                                <div className='left-side'>
                                    <div className='pre-connector' style={{ opacity: key == 0 ? 0 : 1 }} />
                                    <div className='circle' />
                                    <div className='connector' style={{ opacity: key == this.state.works.length - 1 ? 0 : 1 }} />
                                </div>

                                <div className='work-content'>
                                    <div className='company'>{work.company}</div>
                                    <div className='position'>{work.position}</div>
                                    <div className='time'>{work.time}</div>
                                </div>
                            </div>
                        );
                    })}

                    <h2>MY PORTFOLIO</h2>

                    {this.state.portfolios.map((portfolio, key) => {
                        return (
                            <div className='row portfolio' key={key}>
                                <div className='col-md-8'>
                                    <div className='title'>{portfolio.title}</div>
                                    <div className='description'>{portfolio.description}</div>
                                    <div className='year'>Year: {portfolio.year}</div>
                                    <div className='client'>Client: {portfolio.clientName}</div>

                                    <div className='button-row'>
                                        {portfolio.url && (
                                            <a href={portfolio.url} className='button' target='_blank'>
                                                <FontAwesomeIcon icon={faLink} />
                                            </a>
                                        )}

                                        {portfolio.googlePlay && (
                                            <a href={portfolio.googlePlay} className='button' target='_blank'>
                                                <img src='/icon-play.png' style={{ width: 30 }} />
                                            </a>
                                        )}

                                        {portfolio.appStore && (
                                            <a href={portfolio.appStore} className='button' target='_blank'>
                                                <img src='/icon-appstore.png' style={{ width: 30 }} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                                <div className='col-md-4'>
                                    <img src={portfolio.thumbnail} style={{ width: '100%' }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

const styles = {

};

export default Home;