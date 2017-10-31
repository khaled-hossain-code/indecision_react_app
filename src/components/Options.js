import React from 'react';

import Option from './Option' 

class Options extends React.Component {
  render() {
    return (
      <div>
        <div className="widget-header">
          <h3 className="widget-header__title"> Your Options </h3>
          <button 
            className="button button--link" 
            onClick={this.props.handleDeleteOptions}
          > 
            Remove All 
          </button>
        </div>
          <p className="widget__message">{this.props.options.length > 0 ? 'list of options' : 'Please Add an Option to get Started'}</p>
          {this.props.options.map((option) => (
            <Option
              key={option}
              option={option}
              handleDeleteOption={this.props.handleDeleteOption}
            />)
          )}
      </div>
    );
  }
}

export default Options;