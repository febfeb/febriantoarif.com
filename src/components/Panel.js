import React from 'react';

export default function Panel({ children, shadow, style, onClick }) {
    let shadowStyle = {};
    if (shadow == true) {
        shadowStyle = styles.shadow;
    }
    let additionalStyle = {};
    if (style != null) {
        additionalStyle = style;
    }
    return (
        <div style={{ ...styles.panel, ...shadowStyle, ...style }} onClick={(e) => {
            if (onClick) {
                onClick(e);
            }
        }}>
            {children}
        </div>
    );
}

let styles = {
    panel: {
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: "16px 16px 16px 16px",
        marginBottom: 16
    },
    shadow: {
        boxShadow: "0px 4px 20px 0px rgba(0,0,0,0.1)"
    }
};