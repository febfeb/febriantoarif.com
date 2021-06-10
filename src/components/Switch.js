import React, { Component } from 'react';

export default class Switch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    render() {
        let { data, selectedIndex, onChange } = this.props;

        if (selectedIndex == null) {
            selectedIndex = 0;
        }

        return (
            <div style={styles.wrapper}>
                {data.map((item, key) => {
                    return (
                        <div style={styles.text} onClick={() => {
                            onChange(key);
                        }} key={key}>
                            {key == selectedIndex && <div style={styles.textActive}>{item}</div>}
                            {item}
                        </div>
                    );
                })}
            </div>
        );
    }
}

const styles = {
    wrapper: {
        display: "flex",
        flexDirection: "row",
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        height: 30,
        // justifyContent: 'space-between'
    },
    text: {
        display: "flex", flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        cursor: 'pointer'
    },
    textActive: {
        display: "flex",
        color: "#fff",
        backgroundColor: "#375668",
        width: '100%',
        height: 30,
        borderRadius: 40,
        position: "absolute",
        justifyContent: 'center',
        alignItems: 'center',
    }
};