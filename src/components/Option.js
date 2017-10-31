import React from 'react';

class Option extends React.Component {
  render() {
    return (
      <div>
        <span>{this.props.option}</span>
        <button className="button button--link" onClick={(e) => { this.props.handleDeleteOption(this.props.option) }}> Remove </button>
      </div>
    );
  }
}

export default Option;