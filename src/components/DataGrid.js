import React, { Component } from 'react';
import FlexibleInputGroup from './FlexibleInputGroup';
import Panel from './Panel';
import Switch from './Switch';
import moment from 'moment';
import ToolbarInput from './ToolbarInput';
import NoData from './NoData';
import ActivityIndicator from './ActivityIndicator';


export default class DataGrid extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let { filters, columns, data, isLoading } = this.props;
        //console.log({ filters, columns, data })

        return (
            <>
                <div className='row'>
                    {filters.map((filter, key) => {
                        let realStyle = null;
                        if (key != 0) {
                            realStyle = styles.topColumn;
                        }
                        return (
                            <div className={'grid-column ' + filter.className} key={key}>
                                <ToolbarInput
                                    title={filter.label}
                                    type={filter.type}
                                    data={filter.data}
                                    onChange={(val) => { filter.onChange(val) }} />
                            </div>
                        );
                    })}

                    {/* <div className='col-md-3'>
                        <FlexibleInputGroup title='Type'>
                            <Switch data={this.state.switchLabels} selectedIndex={this.state.selectedIndex} onChange={(selectedIndex) => {
                                this.setState({ selectedIndex });
                            }} />
                        </FlexibleInputGroup>
                    </div>
                    <div className='col-md-3'>
                        <FlexibleInputGroup title='Status'>
                            <select>
                                <option value='open'>Open</option>
                                <option value='close'>Close</option>
                            </select>
                        </FlexibleInputGroup>
                    </div> */}
                </div>
                <div style={{ margin: "0 -16px 0 -16px" }}>
                    <table style={{ width: '100%' }} className='grid'>
                        <thead style={{ borderBottom: "1px solid #ccc" }}>
                            <tr>
                                {columns.map((column, key) => {
                                    return <th key={key}>{column.label.toUpperCase()}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading == true && (
                                <tr>
                                    <td colSpan={columns.length}>
                                        <ActivityIndicator />
                                    </td>
                                </tr>
                            )}
                            {isLoading != true && (
                                <>
                                    {(data == null || data.length == 0) && (
                                        <tr>
                                            <td colSpan={columns.length}>
                                                <NoData>No data available</NoData>
                                            </td>
                                        </tr>
                                    )}
                                    {data.map((datum, key) => {
                                        return (
                                            <tr key={key} className={key % 2 == 0 ? '' : 'odd'}>
                                                {columns.map((column, key2) => {
                                                    let content = null;
                                                    if (column.renderItem != null) {
                                                        content = column.renderItem(datum);
                                                    } else {
                                                        content = datum[column.name];
                                                    }
                                                    return <td key={key + '.' + key2}>{content}</td>;
                                                })}
                                            </tr>
                                        );
                                    })}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

const styles = {
    topWrapper: {
        marginBottom: 16,
        display: "flex",
        flexDirection: "row",
    },
    topColumn: {
        marginLeft: 16
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16
    },
    image: {
        borderRadius: 20,
        width: 35,
        height: 35,
        objectFit: 'cover',
        marginRight: 10
    }
};