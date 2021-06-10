import React, { Component } from 'react';
import FlexibleInputGroup from './FlexibleInputGroup';
import Panel from './Panel';
import Switch from './Switch';
import moment from 'moment';


export default class ToolbarInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let { title, type, data, onChange } = this.props;
        return (
            <FlexibleInputGroup title={title}>
                {type == "select" && <select className='grid' onChange={(event) => {
                    if (onChange != null) {
                        onChange(event.target.value);
                    }
                }}>
                    {data.map((datum, key) => {
                        return <option key={key} value={datum.id}>{datum.label}</option>
                    })}
                </select>}

                {type == "switch" && (
                    <Switch data={data.map((datum) => { return datum.label })} selectedIndex={this.state[title]} onChange={(selectedIndex) => {
                        let obj = {};
                        obj[title] = selectedIndex;
                        this.setState(obj);
                        let id = data[selectedIndex]?.id;
                        onChange(id);
                    }} />
                )}

                {type == "textinput" && <input className='grid' onChange={(event) => {
                    if (onChange != null) {
                        onChange(event.target.value);
                    }
                }} />}
            </FlexibleInputGroup>
        );
    }
}

