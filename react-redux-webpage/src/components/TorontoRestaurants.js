import React, { Component } from 'react';


export default class DoctorsList extends Component {
    constructor(props) {
        super(props);
        this.state = { doctors: [] };
    }

    componentDidMount() {
        fetch(
        'http://localhost:3000/api/v1/restaurants')
        .then((response) => response.json())
        .then((result) => this.setState({ doctors: result }));
    }
    
    renderDoctors() {
        return this.state.doctors.map((doctor) => <div>{doctor.name}</div>);
    }

    render() {
        return (
            <>
                <h2>Doctors List</h2>
                {this.renderDoctors()}
            </>
            );
        }
    }
    