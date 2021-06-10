import React from 'react';
import moment from 'moment';
import CircleImage from './CircleImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faSmile } from '@fortawesome/free-solid-svg-icons';
import { MILESTONE_NEGATIVE, MILESTONE_NEUTRAL, MILESTONE_POSITIVE } from '../store/constants';
import NoData from './NoData';

export default class MilestoneList extends React.Component {
    constructor(props) {
        super(props);
    }

    renderFace(face) {
        if (face == 1 || face == 2 || face == 3) {
            return (
                <div className='flex-column justify-center align-center' style={styles.circle}>
                    {face == MILESTONE_NEUTRAL && <CircleImage src='/icon-neutral.png' size={25} />}
                    {face == MILESTONE_POSITIVE && <CircleImage src='/icon-happy.png' size={25} />}
                    {face == MILESTONE_NEGATIVE && <CircleImage src='/icon-sad.png' size={25} />}
                </div>
            );
        }

        return <CircleImage src={face} size={40} />
    }

    render() {
        let { data } = this.props;
        //console.log("Data", data);

        return (
            <div className='flex-column'>
                {(data == null || data.length == 0) && (
                    <NoData>No Data Available</NoData>
                )}
                
                {data.map((item, key) => {
                    return (
                        <div key={key} className='flex-row'>
                            <div className='flex-column align-center'>
                                {this.renderFace(item.status)}
                                {key != data.length - 1 && <div className='flex-column' style={styles.line} />}
                            </div>
                            <div className='flex-column flex' style={styles.wrapper}>
                                <div className='flex-row align-center'>
                                    <div className='flex-column flex'>
                                        <div style={styles.title}>{item.title}</div>
                                        <div style={styles.time}>{moment(item.created).format("MM.DD ha")}</div>
                                    </div>
                                    <a>
                                        <FontAwesomeIcon icon={faEllipsisH} />
                                    </a>
                                </div>
                                <div style={styles.description}>{item.description}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

let styles = {
    circle: {
        border: "1px solid #cfd7db",
        borderRadius: 20,
        width: 40,
        height: 40,
        color: "green"
    },
    line: {
        width: 1,
        background: "#cfd7db",
        flex: 1
    },
    wrapper: {
        marginLeft: 16
    },
    title: {
        fontSize: 18,
        fontWeight: '600'
    },
    time: {
        fontSize: 12,
        fontWeight: 'normal',
    },
    description: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 20
    }
};