import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HttpRequest } from '../utils/http';
import CircleImage from './CircleImage';
import NoData from './NoData';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            query: '',
            patients: [
                { id: 1, user: { name: "XXX" } },
                { id: 2, user: { name: "YYYY" } },
            ],
            selectedIndex: -1,
            isShowResult: false
        };
    }

    render() {
        let typingTimer;

        let doneTyping = () => {
            console.log("Done!");

            HttpRequest.searchPatient(this.state.query).then((res) => {
                console.log("REs", res.data.results);
                let patients = res.data.results;

                this.setState({ patients, selectedIndex: -1, isShowResult: true });
            }).catch((err) => {
                console.log("Err", err, err.response);
            });
        };

        return (
            <>
                <div className='top-search-bar d-none d-md-flex'>
                    <FontAwesomeIcon icon={faSearch} className='icon' />
                    <input type='text' value={this.state.query} placeholder='Quick search for contact'
                        onBlur={(evt) => {
                            //this.setState({ isShowResult: false });
                        }}
                        onChange={(event) => {
                            this.setState({ query: event.target.value });
                        }}
                        onKeyUp={(event) => {
                            if (event.code == "ArrowDown") {
                                let selectedIndex = this.state.selectedIndex;
                                selectedIndex++;
                                if (selectedIndex > this.state.patients.length - 1) {
                                    selectedIndex = this.state.patients.length - 1;
                                }
                                this.setState({ selectedIndex });
                            } else if (event.code == "ArrowUp") {
                                let selectedIndex = this.state.selectedIndex;
                                selectedIndex--;
                                if (selectedIndex < -1) {
                                    selectedIndex = -1;
                                }
                                this.setState({ selectedIndex });
                            } else {
                                clearTimeout(typingTimer);
                                typingTimer = setTimeout(doneTyping, 500);
                            }
                        }}
                        onKeyDown={(event) => {
                            clearTimeout(typingTimer);
                        }}
                    />
                    {/* <div className='recent-text'>Recent Contact</div>
                    <img src='/icon-user.jpg' className='icon-recent' />
                    <img src='/icon-user.jpg' className='icon-recent' />
                    <img src='/icon-user.jpg' className='icon-recent' />
                    <img src='/icon-user.jpg' className='icon-recent' />
                    <div className='icon-recent-count'>+3</div> */}
                </div>

                {this.state.isShowResult && (
                    <>
                        <div className='search-overlay' onClick={(e) => {
                            this.setState({ isShowResult: false });
                        }}></div>
                        <div className='search-result'>
                            {this.state.patients.map((patient, key) => {
                                let selectedClass = null;
                                if (key == this.state.selectedIndex) {
                                    selectedClass = 'active'
                                }
                                return (
                                    <Link to={'/patient/detail/' + patient.id} className={'flex flex-row search-item ' + selectedClass} key={key} onClick={() => {
                                        this.setState({ isShowResult: false });
                                    }}>
                                        <CircleImage size={30} src={null} />
                                        <span style={{ marginLeft: 10 }}>{patient.user.name} {patient.user.last_name}</span>
                                    </Link>
                                );
                            })}
                            {this.state.patients.length == 0 && <NoData />}
                        </div>
                    </>
                )}
            </>
        );
    }
}