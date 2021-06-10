import React from 'react';


export default function FlexibleInputGroup({ title, children }) {
    return (
        <div style={styles.wrapper}>
            <div style={styles.title}>{title}</div>
            <div style={styles.content}>{children}</div>
        </div>
    );
}

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: 'center'
    },
    title: {
        fontSize: 13,
        marginRight: 10
    },
    content: {
        display: "flex",
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center'
    }
};