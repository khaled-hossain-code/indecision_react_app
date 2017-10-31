import React from 'react';

class Option extends React.Component {
  render() {
    return (
      <div className="option">
        <p className="option__text"> {this.props.count}. {this.props.option}</p>
        <button className="button button--link" onClick={(e) => { this.props.handleDeleteOption(this.props.option) }}> Remove </button>
      </div>
    );
  }
}

export default Option;