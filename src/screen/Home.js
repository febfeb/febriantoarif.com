import React from "react";
import CircleImage from "../components/CircleImage";


class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }


    render() {
        // console.log("Keys", Object.keys(this.state.bookingListPerHour));
        return (
            <div className='row'>
                <div className='col-md-12'>
                    <div className='flex-row' style={{ marginTop: 50 }}>
                        <CircleImage src='/headshot.jpg' size={150} />

                        <div className='flex flex-column justify-center' style={{ marginLeft: 40 }}>
                            <h1>Febrianto Arif Rakhman</h1>
                            <h5>Senior Full-stack Mobile Developer</h5>

                            <div className='flex-row'>
                                <div className='badge-skill'>React Native</div>
                                <div className='badge-skill'>Yii Framework</div>
                                <div className='badge-skill'>MySQL</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ height: 50 }} />

                    <h2>MY WORKING EXPERIENCE</h2>

                    <h2>MY PORTFOLIO</h2>
                </div>
            </div>
        );
    }
}

const styles = {

};

export default Home;