class Step extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return [
      `This is step No ${this.props.no}.`,
      <br key="br"/>
    ];
  }
}
        
class Stepper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <h1>Sample Of React Render Tree !!!</h1>
        <h2>Header</h2>
        This Sample has children berow. <br/>
        {
          this.props.children.map(step => [step.key, <br key="br"/>])
        }
        <h2>Body</h2>
        {this.props.children}
      </>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <Stepper>
        <Step key="1" no="1">
          Let's try React.
        </Step>
        <Step key="2" no="2">
          Let's try Next.
        </Step>
      </Stepper>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
