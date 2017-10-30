import React from 'react';

import AddOptions from './AddOptions';
import Action from './Action';
import Header from './Header';
import Options from './Options';

class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Indecision",
      subtitle: "Your Decision Computer will take",
      options: []
    }
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }
  componentDidMount() { //this fires after mounting the component on DOM
    try {
      const options = JSON.parse(localStorage.getItem('options'));
      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {
      console.error('json parse failed');
    }
  }
  componentDidUpdate(prevProps, prevState) {  //this fires when component props or state updates
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount() { } //this is just before exiting page or replacing the component by anything else
  handleDeleteOptions() {
    this.setState(() => ({ options: [] }));
  }
  handleDeleteOption(option) {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option)
    }))
  }
  handleAddOption(newOption) {
    this.setState((prevState) => ({ options: prevState.options.concat(newOption) }));
  }
  handlePick() {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    alert(option);
  }
  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <Action
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOptions
          options={this.state.options}
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}

export default IndecisionApp;