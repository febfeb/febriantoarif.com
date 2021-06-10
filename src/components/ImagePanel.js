import React from 'react';
import Panel from './Panel';

export default function ImagePanel({ imgSource, title, description, highlight }) {
    let name = "Guest";
    let className = 'text-normal';
    let border = {};
    if (title != null) {
        name = title;
    }
    if (highlight == true) {
        className = 'text-danger';
        border = { border: "2px solid #c75a59" };
    }
    if(imgSource == null){
        imgSource = '/favicon.png';
    }
    return (
        <Panel shadow={true} style={{ display: 'flex', flexDirection: 'row' }}>
            <img src={imgSource} style={{ ...styles.img, ...border }} />
            <div style={styles.textWrapper}>
                <div style={styles.title} className={className}>{name}</div>
                <div style={styles.description}>{description}</div>
            </div>
        </Panel>
    );
}

let styles = {
    img: {
        borderRadius: 25,
        width: 50,
        height: 50,
        objectFit: 'cover',

    },
    textWrapper: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1, marginLeft: 10,
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    description: {
        fontSize: 12
    }
};