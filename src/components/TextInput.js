import React from 'react';

export default function TextInput({ title, value, placeholder, onChange, type, readOnly }) {
    if (type == null) {
        type = "text";
    }
    let styleWrapper = styles.wrapper;
    let styleInput = styles.input;
    if(readOnly){
        styleWrapper = styles.wrapperReadOnly;
        styleInput = styles.inputReadOnly;
    }
    return (
        <div style={styleWrapper}>
            <input style={styleInput} type='text' value={value} onChange={onChange} placeholder={placeholder} type={type} readOnly={readOnly} />
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
    wrapperReadOnly: {
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: "7px 10px",
        position: "relative",
        marginBottom: 16,
        background: "#f3f3f3",
        cursor: "not-allowed"
    },
    title: {
        color: 'darkgray',
        fontWeight: '600',
        fontSize: 14,
        position: "absolute",
        top: -13,
        left: 16,
        background: "#fff",
        padding: "0px 7px 0px 7px",
        borderRadius: 5
    },
    input: {
        border: "0px",
        width: '100%',
    },
    inputReadOnly: {
        border: "0px",
        width: '100%',
        background: "#f3f3f3",
        cursor: "not-allowed"
    }
};