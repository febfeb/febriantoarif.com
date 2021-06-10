import React from 'react';

export default function HorizontalLine({ title }) {
    return (
        <div style={{ position: "relative", margin: "0px -16px", padding: "10px 0px" }}>
            <hr style={{ borderTop: "1px solid lightgray" }} />
            <div style={styles.text}>{title}</div>
        </div>
    );
}

const styles = {
    text: {
        color: 'darkgray',
        fontWeight: '600',
        fontSize: 16,
        position: "absolute",
        top: 14,
        left: 16,
        background: "#fff",
        padding: "0px 7px 0px 7px"
    }
};