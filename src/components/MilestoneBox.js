import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import CircleImage from './CircleImage';
import Panel from './Panel';

export default class MilestoneBox extends Component {
    render() {
        let { milestone } = this.props;

        let icon = null;
        let mediaLength = null;

        return (
            <Panel style={{ position: 'relative' }}>
                {/* <div style={{ background: "url(" + milestone.background + ")", ...styles.bgMilestone }} /> */}
                <div style={{ background: "white", ...styles.bgMilestone }}>
                    {milestone.description}{milestone.description}{milestone.description}{milestone.description}
                </div>
                <div style={styles.milestone}>
                    <div className='flex-row align-center' style={styles.type}>
                        {icon != null && <FontAwesomeIcon icon={icon} style={{ marginRight: 5 }} />}
                        {mediaLength}
                    </div>
                    <CircleImage src={milestone.user} size={40} style={{ margin: "7px 0 12px" }} />
                    <div style={styles.name}>{milestone.title}</div>
                </div>
            </Panel>
        );
    }
}

const styles = {
    milestone: {
        color: "#D6D6D6",
        height: 130,
        position: 'relative'
    },
    bgMilestone: {
        position: "absolute",
        width: "100%",
        height: "100%",
        opacity: 0.3,
        top: 0,
        left: 0,
        backgroundSize: "cover",
        borderRadius: 10,

        overflow: "hidden",
        padding: "10px 13px"
    },
    type: {
        color: "var(--color-text)",
        height: 25
    },
    name: {
        color: "var(--color-text)",
        fontSize: 16,
        fontWeight: '600',
        lineHeight: "19px"
    },
};