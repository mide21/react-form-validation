import React, { Component } from 'react';
import 'bootstrap/js/dist/alert';
import 'bootstrap/dist/css/bootstrap.min.css';

export class SuccessAlert extends Component {
    render() {
        return (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>FORM SUBMITTED SUCCESSFULLY</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        )
    }
}

export default SuccessAlert
