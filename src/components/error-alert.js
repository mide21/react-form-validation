import React, { Component } from 'react'
import 'bootstrap/js/dist/alert';
import 'bootstrap/dist/css/bootstrap.min.css';

export class ErrorAlert extends Component {
    render() {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>ERROR MESSAGE - FORM INVALID</strong>
            </div>
        )
    }
}

export default ErrorAlert
