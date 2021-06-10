import React from 'react';

export default function PanelTab({ tabs, selectedIndex, onChange }) {

    const renderBadge = (badge) => {
        return (
            <div style={styles.badge}>
                {badge}
            </div>
        );
    };

    return (
        <div className='flex-row'>
            {tabs.map((item, key) => {
                let label = item;
                let exist = false;
                let badge = 0;
                if (item.indexOf("#") !== -1) {
                    label = item.substr(0, item.indexOf("#"));
                    badge = parseInt(item.substr(item.indexOf("#") + 1));
                    if(badge != 0){
                        exist = true;
                    }
                }

                if (key == selectedIndex) {
                    return (
                        <div key={key} className='flex-row' style={{ alignItems: 'flex-end' }}>
                            <div className='curved-corner-bottomright' />

                            <div style={styles.tabActive} className='flex-row align-center justify-center' key={key}>
                                {label}

                                {exist && renderBadge(badge)}
                            </div>
                            <div className='curved-corner-bottomleft' />
                        </div>
                    );
                } else {
                    return (
                        <div key={key} className='flex-row' style={{ alignItems: 'flex-end' }} onClick={() => {
                            onChange(key);
                        }}>
                            <div className='curved-corner-bottomright curved-corner-inactive' />

                            <div style={styles.tab} className='flex-row align-center justify-center' key={key}>
                                {label}

                                {exist && renderBadge(badge)}
                            </div>
                            <div className='curved-corner-bottomleft curved-corner-inactive' />
                        </div>
                    );
                }
            })}
        </div>
    );
}

let styles = {
    tab: {
        background: "#e6e6e6",
        padding: "10px 16px",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        cursor: "pointer"
    },
    tabActive: {
        background: "#fff",
        padding: "10px 16px",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        cursor: "pointer"
    },
    badge: {
        marginLeft: 10,
        padding: "0px 5px",
        background: "#f44336",
        color: "#fff",
        borderRadius: 8
    }
};