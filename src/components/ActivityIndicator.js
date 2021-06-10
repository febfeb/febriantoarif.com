import React from 'react';

export default function ActivityIndicator({ size }) {
    if (size == null) {
        size = "medium";
    }

    let width = 15;

    if (size == 'small') {
        width = 15;
    } else if (size == 'medium') {
        width = 30;
    } else if (size == 'large') {
        width = 45;
    }

    return (
        <img src='/loading.gif' style={{ width: width, height: width }} />
    );
}

const styles = {
};