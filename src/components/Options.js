import React from 'react';

import Option from './Option' 

class Options extends React.Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleDeleteOptions}> Remove All </button>
        <ol>
          <p>{this.props.options.length > 0 ? 'list of options' : 'There is no option'}</p>
          {this.props.options.map((option) => (
            <Option
              key={option}
              option={option}
              handleDeleteOption={this.props.handleDeleteOption}
            />)
          )}
        </ol>
      </div>
    );
  }
}

export default Options;