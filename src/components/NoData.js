import { faInfo, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function NoData({ children }) {
    return (
        <div className='flex-column align-center' style={styles.wrapper}>
            <FontAwesomeIcon icon={faInfoCircle} />
            <div style={styles.text}>
                {children}
            </div>
        </div>
    );
}

const styles = {
    wrapper: {
        fontSize: 30,
        color: "var(--color-text)"
    },
    text: {
        textAlign: 'center',
        fontSize: 12,
        color: "var(--color-text)"
    }
};