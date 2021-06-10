import React, { Component } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import Switch from 'react-switch';
import { store } from '../store';
import { HttpRequest } from '../utils/http';
import Swal from 'sweetalert2';
import _ from 'lodash';

export default class BigCalendar extends Component {
    constructor(props) {
        super(props);

        let today = moment();
        let yesterday = moment().subtract(1, 'day');

        this.state = {
            timeList: [
                "06:00:00",
                "07:00:00",
                "08:00:00",
                "09:00:00",
                "10:00:00",
                "11:00:00",
                "12:00:00",
                "13:00:00",
                "14:00:00",
                "15:00:00",
                "16:00:00",
                "17:00:00",
            ],

            bookings: [],
            popoverPosition: null,
            title: '',
            status: 'open',
            type: 'task',
            notes: '',
            contact: null,
            checked: true,

            patients: [],
            currentDate: moment(),

            currentDateString: moment().format("YYYY-MM-DD"),
            selectedTime: null
        };
    }

    componentDidMount() {
        let user = store.getState().loginReducer.user;
        if (user) {
            this.loadPatient();
            this.loadBooking();
        }
    }

    loadPatient() {
        let user = store.getState().loginReducer.user;

        this.setState({ isLoading: true });

        HttpRequest.patientList().then((res) => {
            let data = res.data.results;
            console.log("HttpRequest.patientList", data);
            this.setState({
                isLoading: false,
                patients: data
            });
        }).catch((err) => {
            console.log("Err", err, err.response);
            this.setState({ isLoading: false });
            Swal.fire('Error', 'Cannot load patient list.', 'error');
        })
    }

    loadBooking() {
        let user = store.getState().loginReducer.user;
        var startOfWeek = moment(this.state.currentDateString).startOf('week').format("YYYY-MM-DD");
        var endOfWeek = moment(this.state.currentDateString).endOf('week').format("YYYY-MM-DD");

        this.setState({ isLoading: true });

        HttpRequest.getBooking(user.user.id, startOfWeek, endOfWeek).then((res) => {
            let bookings = res.data.results;
            console.log("HttpRequest.getBooking", bookings);
            this.setState({ isLoading: false, bookings })
        }).catch((err) => {
            console.log("Err", err, err.response);
            this.setState({ isLoading: false });
            Swal.fire('Error', 'Cannot load task list.', 'error');
        })
    }

    saveBooking() {
        if (this.state.contact == null) {
            Swal.fire('Error', 'Please choose contact.', 'error');
            return;
        }

        let user = store.getState().loginReducer.user;

        this.setState({ isLoading: true });

        let data = {
            is_removed: false,
            start: moment(this.state.selectedTime).format("YYYY-MM-DD HH:mm:ss"),//"2021-04-14T20:21:13.639Z",
            end: moment(this.state.selectedTime).add(1, "hour").format("YYYY-MM-DD HH:mm:ss"),//"2021-04-14T20:21:13.639Z",
            note: this.state.notes,
            status: "booked",
            //category: 0,
            patient: parseInt(this.state.contact),
            provider: user.user.id
        }

        HttpRequest.saveBooking(data).then((res) => {
            let data = res.data.data;
            console.log("HttpRequest.saveBooking", data);
            this.setState({ isLoading: false });
            Swal.fire('Information', 'Save task success.', 'success');
        }).catch((err) => {
            console.log("Err", err, err.response);
            this.setState({ isLoading: false });

            Swal.fire('Error', 'Save task failed.', 'error');
        });

        window.jQuery('#myModal').modal('hide');
    }

    addMeeting(){
        if (this.state.contact == null) {
            Swal.fire('Error', 'Please choose contact.', 'error');
            return;
        }

        Swal.fire('Error', 'Need to implement this feature.', 'error');

        window.jQuery('#modal-meeting').modal('hide');
    }

    render() {
        var startOfWeek = moment(this.state.currentDateString).startOf('week').toDate();
        var endOfWeek = moment(this.state.currentDateString).endOf('week').toDate();

        let days = [];
        for (let i = 0; i < 7; i++) {
            let curDay = moment(startOfWeek).add(i, 'day');
            days.push(curDay.format("YYYY-MM-DD"));
        }

        let today = moment().format("YYYY-MM-DD");

        let mapArray = {};
        this.state.bookings.forEach((task) => {
            let hour = parseInt(moment(task.start).format("HH"));
            if (hour < 9) {
                hour = 9;
            }
            if (hour > 16) {
                hour = 16;
            }
            let time = moment(task.start).format("YYYY-MM-DD") + " " + hour.toString().padStart(2, '0') + ":00:00";
            task.length = 1;
            mapArray[time] = task;
        });

        //console.log("MapArray", mapArray);

        let removeCellArray = {};

        let popoverPosition = this.state.popoverPosition;

        return (
            <>
                <div className='text-center m-2'>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        let currentDateString = moment(this.state.currentDateString).subtract(1, 'week').format("YYYY-MM-DD");
                        this.setState({ currentDateString }, () => {
                            this.loadBooking();
                        });
                    }}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </a>
                    <span style={{ margin: "0px 20px" }}>
                        {moment(startOfWeek).format("MMM DD, YYYY")} - {moment(endOfWeek).format("MMM DD, YYYY")}
                    </span>
                    <a href="#" onClick={(e) => {
                        e.preventDefault();
                        let currentDateString = moment(this.state.currentDateString).add(1, 'week').format("YYYY-MM-DD");
                        this.setState({ currentDateString }, () => {
                            this.loadBooking();
                        });
                    }}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </a>
                </div>
                <div style={{ overflowX: "auto" }}>
                    <table className='big-calendar' border='1' cellPadding='0' cellSpacing='0'>
                        <thead>
                            <tr>
                                <th style={{ width: 80 }}>

                                </th>
                                {days.map((day, key) => {
                                    let dayMoment = moment(day);
                                    return (
                                        <th className={today == day ? "active" : ""} key={'day' + key}>
                                            <div>{dayMoment.format("ddd")}</div>
                                            <div>{dayMoment.format("MMM DD")}</div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.timeList.map((time, key) => {
                                let d = moment("2020-01-01 " + time);

                                return (
                                    <tr key={key}>
                                        <td className='time'>
                                            <div>{d.format("H")}</div>
                                            <div>{d.format("A")}</div>
                                        </td>
                                        {days.map((day, key2) => {
                                            //check if exist in mapArray
                                            let mapElement = mapArray[day + " " + time];
                                            let dayMoment = moment(day);
                                            let dayName = dayMoment.format("ddd");
                                            // console.log("MapElement", day + " " + time, mapElement);
                                            if (mapElement) {
                                                // console.log("Map Element", mapElement);
                                                if (mapElement.length > 1) {
                                                    let curCellTime = moment(day + " " + time);
                                                    for (let i = 1; i < mapElement.length; i++) {
                                                        curCellTime.add(1, "hour");
                                                        removeCellArray[curCellTime.format("YYYY-MM-DD HH:mm:ss")] = 1;
                                                    }
                                                }
                                                // console.log("removeCellArray", removeCellArray);
                                                return (
                                                    <td rowSpan={mapElement.length} className='content ' key={key + "-" + key2}>
                                                        <div className='title'>Patient: {mapElement.patient}</div>
                                                        <div className='description'>{mapElement.note}</div>
                                                    </td>
                                                );
                                            } else {
                                                let removeCellElement = removeCellArray[day + " " + time];
                                                if (removeCellElement) {
                                                    //console.log("RemoveCell", removeCellElement)
                                                    return null;
                                                } else {
                                                    if (dayName == "Sun" || dayName == "Sat") {
                                                        return (
                                                            <td key={key + "-" + key2} style={{ background: "#ddd" }}>

                                                            </td>
                                                        );
                                                    } else {
                                                        return (
                                                            <td key={key + "-" + key2} className='calendar-hover'>
                                                                <a href="#" className='ellipsis' onClick={(e) => {
                                                                    e.preventDefault();
                                                                    console.log("Event", e.clientX, e.clientY);
                                                                    this.setState({
                                                                        popoverPosition: {
                                                                            x: e.clientX,
                                                                            y: e.clientY
                                                                        },
                                                                        selectedTime: day + " " + time
                                                                    });
                                                                }}>
                                                                    <FontAwesomeIcon icon={faEllipsisH} />
                                                                </a>
                                                            </td>
                                                        );
                                                    }
                                                }
                                            }
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {popoverPosition && (
                        <div className='popover-overlay'>
                            <div className='popover-clickable' onClick={(e) => {
                                this.setState({ popoverPosition: null });
                            }}></div>
                            <div className='popover-modal' style={{ left: popoverPosition.x - 30, top: popoverPosition.y + 20 }}>
                                <div className='flex-row align-center' style={{ marginBottom: 10 }}>
                                    <span style={{ marginRight: 10, fontWeight: "bold" }}>Unavailable</span>

                                    <Switch
                                        height={20}
                                        width={40}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        onChange={(checked) => {
                                            this.setState({ checked });
                                        }} checked={this.state.checked} />

                                    <span style={{ marginLeft: 10, fontWeight: "bold" }}>Available</span>
                                </div>

                                <div>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ popoverPosition: null });
                                        window.jQuery('#myModal').modal('show');
                                    }}>Add task</a>
                                </div>
                                <div>
                                    <a href="#" onClick={(e) => {
                                        e.preventDefault();
                                        this.setState({ popoverPosition: null });
                                        window.jQuery('#modal-meeting').modal('show');
                                    }}>Add meeting</a>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="modal" tabindex="-1" role="dialog" id="myModal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add task</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Patient</label>
                                        <div className="col-sm-10">
                                            <select className="form-control"
                                                value={this.state.contact}
                                                onChange={(event) => {
                                                    this.setState({ contact: event.target.value });
                                                }}>
                                                <option value=''>Choose Contact</option>
                                                {this.state.patients.map((user, key) => {
                                                    return <option value={user.id} key={key}>{user.user.name} {user.user.last_name}</option>
                                                })}

                                            </select>
                                        </div>
                                    </div>
                                    {/* <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Title</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" value={this.state.title} onChange={(event) => {
                                                this.setState({ title: event.target.value });
                                            }} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Open</label>
                                        <div className="col-sm-3">
                                            <select className="form-control"
                                                value={this.state.status}
                                                onChange={(event) => {
                                                    this.setState({ status: event.target.value });
                                                }}>
                                                <option value='open'>Open</option>
                                                <option value='closed'>Closed</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Type</label>
                                        <div className="col-sm-3">
                                            <select className="form-control"
                                                value={this.state.type}
                                                onChange={(event) => {
                                                    this.setState({ type: event.target.value });
                                                }}>
                                                <option value='todo'>Todo</option>
                                                <option value='task'>Task</option>
                                            </select>
                                        </div>
                                    </div> */}
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Notes</label>
                                        <div className="col-sm-10">
                                            <input type="text" className="form-control" value={this.state.notes}
                                                onChange={(event) => {
                                                    this.setState({ notes: event.target.value });
                                                }} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.saveBooking();
                                }}>Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal" tabindex="-1" role="dialog" id="modal-meeting">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add meeting</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-2 col-form-label">Patient</label>
                                        <div className="col-sm-10">
                                            <select className="form-control"
                                                value={this.state.contact}
                                                onChange={(event) => {
                                                    this.setState({ contact: event.target.value });
                                                }}>
                                                <option value=''>Choose Contact</option>
                                                {this.state.patients.map((user, key) => {
                                                    return <option value={user.id} key={key}>{user.user.name} {user.user.last_name}</option>
                                                })}

                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => {
                                    this.addMeeting();
                                }}>Save changes</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

const styles = {

};