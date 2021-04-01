import React from 'react';
import PropTypes from 'prop-types'

class  Child extends React.Component {

    constructor(props) {
        super(props);
        this.logging = this.logging.bind(this);
    }
    
    logging() { console.log(`My name is ${this.props.dataField}`); }

    render () {
        return <div>{this.props.dataField}={this.props.description}</div>
    }
}
Child.propTypes = {
    dataField: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Child;