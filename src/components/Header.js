import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1 className="header__title"> {this.props.title} </h1>
        <h2 className="header__subtitle"> {this.props.subtitle} </h2>
      </div>
    );
  }
}

export default Header;