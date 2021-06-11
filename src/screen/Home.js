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
                { company: "Freelancing", position: null, time: "Jun 2008 – Apr 2013" },
            ],
            portfolios: [
                {
                    title: "RS Onkologi Surabaya",
                    description: "Scheduling & customer relationship management for hospital patients on Android application.",
                    clientName: "RS Onkologi Surabaya",
                    year: 2017,
                    url: "https://rsonkologi.com",
                    googlePlay: "https://play.google.com/store/apps/details?id=com.rsonkologikonsumen",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-1.jpg"
                },
                {
                    title: "E-SIAP",
                    description: "Cloud based online garage information system.",
                    clientName: "PT Baladewa Otoplasa",
                    year: "2017-2019",
                    url: "https://e-siap.com",
                    googlePlay: "https://play.google.com/store/apps/details?id=com.esiap.owner",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-2.jpg"
                },
                {
                    title: "iKlop",
                    description: "Online shop for building material.",
                    clientName: "iKlop",
                    year: "2018-2019",
                    url: "https://i-klop.com",
                    googlePlay: "https://play.google.com/store/apps/details?id=com.iklopcorporate",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-3.jpg"
                },
                {
                    title: "ParkirQ",
                    description: "Booking application for car parking.",
                    clientName: "ParkirQ",
                    year: 2018,
                    url: "https://parkirq.com",
                    googlePlay: "https://play.google.com/store/apps/details?id=com.parkirq",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-4.jpg"
                },
                {
                    title: "Mi Burung Dara - Public Executive",
                    description: "Scheduling & customer relationship management for hospital patients on Android application.",
                    clientName: "Mi Burung Dara",
                    year: 2019,
                    url: null,
                    googlePlay: null,
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-5.jpg"
                },
                {
                    title: "EventQ Ticketing Application",
                    description: "Sell online ticketing system.",
                    clientName: "EventQ",
                    year: 2019,
                    url: "https://eventq.id",
                    googlePlay: "https://play.google.com/store/apps/details?id=com.eventq",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-6.jpg"
                },
                {
                    title: "Kopi Teman Mikir",
                    description: "Integrated system for café.",
                    clientName: "PT. Arya Duta Rhestana",
                    year: 2019,
                    url: "https://kopitemanmikir.com",
                    googlePlay: "https://kopitemanmikir.com/download",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-7.jpg"
                },
                {
                    title: "Biotekno",
                    description: "Herbal online shop android application.",
                    clientName: "PT. Algae Bioteknologi Internasional",
                    year: 2019,
                    url: null,
                    googlePlay: "https://play.google.com/store/apps/details?id=com.neoalgae",
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-8.jpg"
                },
                {
                    title: "TukangAja",
                    description: "Online on-demand technician.",
                    clientName: "TukangAja",
                    year: 2019,
                    url: null,
                    googlePlay: null,
                    appStore: null,
                    thumbnail: "/portfolio/portfolio-9.jpg"
                },
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
                                    <img src={portfolio.thumbnail} style={{ width: '100%', borderRadius: 10 }} />
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