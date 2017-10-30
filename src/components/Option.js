import React from 'react';

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.option}</p>
        <button onClick={(e) => { this.props.handleDeleteOption(this.props.option) }}> Remove </button>
      </div>
    );
  }
}

export default Option;