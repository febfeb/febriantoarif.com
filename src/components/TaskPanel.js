import React, { Component } from 'react';
import FlexibleInputGroup from './FlexibleInputGroup';
import Panel from './Panel';
import Switch from './Switch';
import moment from 'moment';


export default class TaskPanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            switchLabels: ["All", "Task", "Todo"],
            selectedIndex: 0,
            tasks: [
                { name: "Task Name 1", agent: 'Paul Stanley', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
                { name: "Task Name 2", agent: 'Gene Simmons', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
                { name: "Task Name 3", agent: 'Ace Frehley', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
                { name: "Task Name 4", agent: 'Me', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
                { name: "Task Name 5", agent: 'Me', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
                { name: "Task Name 6", agent: 'Me', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
                { name: "Task Name 7", agent: 'Me', patient: 'William Kinney', created_at: "2021-04-01 07:50:00" },
            ]
        };
    }

    render() {
        let { data } = this.props;

        return (
            <Panel shadow={true}>
                <h1 className='section-title'>Task assigned to me</h1>

                <div className='row' style={{ marginBottom: 16 }}>
                    <div className='col-md-3 col-sm-6 grid-column'>
                        <FlexibleInputGroup title='Type'>
                            <Switch data={this.state.switchLabels} selectedIndex={this.state.selectedIndex} onChange={(selectedIndex) => {
                                this.setState({ selectedIndex });
                            }} />
                        </FlexibleInputGroup>
                    </div>
                    <div className='col-md-3 col-sm-6 grid-column'>
                        <FlexibleInputGroup title='Status'>
                            <select className='grid'>
                                <option value='open'>Open</option>
                                <option value='close'>Close</option>
                            </select>
                        </FlexibleInputGroup>
                    </div>
                    <div className='col-md-3 col-sm-6 grid-column'>
                        <FlexibleInputGroup title='Issued By'>
                            <select className='grid'>
                                <option value='open'>Anyone</option>
                                <option value='close'>Paul Stanley</option>
                            </select>
                        </FlexibleInputGroup>
                    </div>
                    <div className='col-md-3 col-sm-6 grid-column'>
                        <FlexibleInputGroup title='Regarding'>
                            <select className='grid'>
                                <option value='open'>All</option>
                                <option value='close'>William Kinney</option>
                            </select>
                        </FlexibleInputGroup>
                    </div>
                </div>

                <table style={{ width: '100%' }}>
                    <thead style={{ borderBottom: "1px solid #ccc" }}>
                        <tr>
                            <th>TASK NAME</th>
                            <th>ISSUED BY</th>
                            <th>REGARDING</th>
                            <th>DATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.tasks.map((task, key) => {
                            return (
                                <tr key={key}>
                                    <td>{task.name}</td>
                                    <td>{task.agent}</td>
                                    <td>
                                        <img src='/icon-user.jpg' style={styles.image} />
                                        {task.patient}</td>
                                    <td>{moment(task.created_at).format("DD.MM")}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </Panel>
        );
    }
}

const styles = {
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