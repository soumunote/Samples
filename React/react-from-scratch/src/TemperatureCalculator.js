import React from "react";

const scaleNames = {
  c: '摂氏',
  f: "華氏"
}

function BoilingVerdict(props) {
  return props.celsius >= 100 
    ? <p>The water would boil.</p>
    : <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {temperature: ''};
  }

  handleChange(e) {
    this.setState({temperature: e.target.value});
  }

  render() {
    const temperature = this.state.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange}/>
        <BoilingVerdict celsius={parseFloat(temperature)}/>        
      </fieldset>
    )
  }
}

class Calculator extends React.Component {
  render() {
    return (
      <div>
        <TemperatureInput scale="c"/>
        <TemperatureInput scale="f"/>
      </div>
    )
  }
}

export default Calculator;