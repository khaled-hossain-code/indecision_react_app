import React from 'react';

class Action extends React.Component {
  render() {
    return (
      <div>
        <button 
          disabled={!this.props.hasOptions} 
          onClick={this.props.handlePick}
          className="big-button"
        >
          What Should I do? </button>
      </div>
    );
  }
}

export default Action;