import React, { Component } from 'react';

class App extends Component {

  constructor(props) {
    super(props);
    this.traverseChildren = this.traverseChildren.bind(this);
  }

  traverseChildren(parentComponent) {

    React.Children.forEach(parentComponent.props.children, (child) => {
      
      if (child.props && child.props.dataField) {
        if (child.props.dataField) {
          child.type.prototype.logging.apply(child);
          console.log(`${child.props.dataField}=${child.props.description}`);
        }
      }

      if (child.props && child.props.children) {
        return this.traverseChildren(child);
      }

    });
  }

  render() {
    this.traverseChildren(this.props.children);
    return this.props.children;
  }
}

export default App;
