import React from 'react';

import AddOptions from './AddOptions';
import Action from './Action';
import Header from './Header';
import Options from './Options';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
  state = {
    title: "Indecision",
    subtitle: "Your Decision Computer will take!!",
    options: [],
    selectedOption: undefined
  }
  
  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  }

  handleDeleteSelectedOption = () => {
    this.setState( () => ({selectedOption : undefined}))
  }

  handleDeleteOption = (option) => {
    this.setState((prevState) => ({
      options: prevState.options.filter((opt) => opt !== option)
    }))
  }
  handleAddOption = (newOption) => {
    this.setState((prevState) => ({ options: prevState.options.concat(newOption) }));
  }
  handlePick = () => {
    const randomNum = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNum];
    this.setState(() => ({ selectedOption: option}))
  }
  render() {
    return (
      <div>
        <Header title={this.state.title} subtitle={this.state.subtitle} />
        <div className="container">
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
        <OptionModal 
          selectedOption={this.state.selectedOption}
          handleDeleteSelectedOption = {this.handleDeleteSelectedOption}
        />
      </div>
    );
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
}

export default IndecisionApp;