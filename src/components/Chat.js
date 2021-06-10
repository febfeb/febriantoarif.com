import React, { Component } from 'react';
import moment from 'moment';
import CircleImage from './CircleImage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperclip, faPaperPlane, faSearch, faSmile } from '@fortawesome/free-solid-svg-icons';


export default class Chat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            message: "",
        };

        this.messageContainer = null;
    }

    componentDidMount() {
        //setTimeout(() => {
        this.scrollToBottom();
        //}, 1000);
    }

    componentDidUpdate(oldProps) {
        if (oldProps.messages.length != this.props.messages.length) {
            this.scrollToBottom();
        }
    }

    scrollToBottom() {
        this.messageContainer?.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    sendMessage() {
        let message = this.state.message;
        if (message != "") {
            this.props.onSend(this.state.message);
            this.setState({ message: "" });
        }
    }

    render() {
        let { messages, userId } = this.props;

        let messageCount = messages.length;

        let messageTopMargin = (8 - messageCount) * 92;

        return (
            <>
                <div className='flex flex-row align-center' style={styles.searchBox}>
                    <FontAwesomeIcon icon={faSearch} style={styles.searchIcon} />
                    <input className='flex flex-column' style={styles.searchInput} type='text' placeholder='Search in discussion' />
                </div>

                <div style={{ height: "70vh", overflowY: "auto" }} >
                    <div style={{ height: messageTopMargin > 0 ? messageTopMargin : 0 }} />
                    {messages.map((message, key) => {
                        if (message.uuid != userId) {
                            //left
                            return (
                                <div style={styles.wrapper} key={key}>
                                    <div className='flex-row' style={styles.chatLine}>
                                        <CircleImage src={null} size={60} />
                                        <div className='flex flex-column' style={styles.bubbleLeft}>
                                            {message.message}
                                        </div>
                                    </div>
                                    <div className='text-right' style={styles.time}>{moment(parseInt(message.timetoken) / 10000).format("DD MMM, hh:mm a")}</div>
                                </div>
                            );
                        } else {
                            //right
                            return (
                                <div style={styles.wrapper} key={key}>
                                    <div className='flex-row' style={styles.chatLine}>
                                        <div className='flex flex-column' style={styles.bubbleRight}>
                                            {message.message}
                                        </div>
                                        <CircleImage src={null} size={60} />
                                    </div>
                                    <div className='text-left' style={styles.time}>{moment(parseInt(message.timetoken) / 10000).format("DD MMM, hh:mm a")}</div>
                                </div>
                            );
                        }
                    })}
                    <div ref={(el) => { this.messageContainer = el; }}></div>
                </div>
                <div style={styles.inputGroup} className='flex-row'>
                    <a href="#" style={{ ...styles.buttonIcon, paddingTop: 6 }}>
                        <FontAwesomeIcon icon={faPaperclip} />
                    </a>
                    <div style={styles.inputGroupTextWrap} className='flex-row flex'>
                        <input className='flex flex-column' value={this.state.message} style={styles.searchInput} type='text' placeholder='Type message here' onKeyPress={(event) => {
                            if (event.code == "Enter") {
                                this.sendMessage();
                            }
                        }} onChange={(event) => {
                            this.setState({ message: event.target.value });
                        }} />
                        <a href="#" style={styles.buttonIcon}>
                            <FontAwesomeIcon icon={faSmile} />
                        </a>
                        <a href="#" style={styles.buttonIcon} onClick={(e) => {
                            e.preventDefault();
                            this.sendMessage();
                        }}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </a>
                    </div>
                </div>
            </>
        );
    }
}

const styles = {
    searchBox: {
        border: "1px solid #ccc",
        padding: "5px 10px",
        borderRadius: 4,
        marginBottom: 10
    },
    searchIcon: {
        marginRight: 5
    },
    searchInput: {
        border: "0px",
    },

    wrapper: {
        marginBottom: 10,
    },
    chatLine: {
        alignItems: 'flex-end'
    },
    bubbleLeft: {
        background: "#EAF1F4",
        borderRadius: 20,
        borderBottomLeftRadius: 0,
        marginLeft: 8,
        padding: "16px 16px"
    },
    bubbleRight: {
        background: "#EAF1F4",
        borderRadius: 20,
        borderBottomRightRadius: 0,
        marginRight: 8,
        padding: "16px 16px"
    },
    time: {
        fontSize: 12,
        padding: "0px 16px"
    },

    inputGroup: {
        background: "#e6e6e6",
        padding: 10,
        margin: "0px -16px -16px",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    inputGroupTextWrap: {
        background: "#fff",
        borderRadius: 10,
        padding: "4px 14px"
    },
    buttonIcon: {
        fontSize: 20,
        marginRight: 10,
    }
};