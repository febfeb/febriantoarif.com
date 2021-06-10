import React from 'react';

export default function Combobox({ title, value, data, onChange, type }) {
    if (type == null) {
        type = "text";
    }
    return (
        <div style={styles.wrapper}>
            <select style={styles.input} type='text' value={value} onChange={onChange}>
                {data.map((item, key) => {
                    return (<option key={key} value={item.id}>{item.label}</option>);
                })}
            </select>
            <div style={styles.title}>{title}</div>
        </div>
    );
}

const styles = {
    wrapper: {
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "7px 10px",
        position: "relative",
        marginBottom: 16
    },
    title: {
        color: 'darkgray',
        fontWeight: '600',
        fontSize: 14,
        position: "absolute",
        top: -13,
        left: 16,
        background: "#fff",
        padding: "0px 7px 0px 7px"
    },
    input: {
        border: "0px",
        width: '100%',
    }
};