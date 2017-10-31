import React from 'react';

class AddOptions extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      error: ''
    }
  }
  formSubmit(e) {
    e.preventDefault();
    let newOption = e.target.elements.option.value.trim();

    if (!newOption) {
      this.setState(() => ({ error: 'Please enter an Option!' }));
    } else if (this.props.options.indexOf(newOption) > -1) {
      this.setState(() => ({ error: 'This Option already exist' }));
    } else {
      this.setState(() => ({ error: '' }));
      this.props.handleAddOption(newOption);
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <div>
        {this.state.error && (<p className="add-option-error"> {this.state.error} </p>)}
        <form className="add-option" onSubmit={this.formSubmit}>
          <input className="add-option__input" type="text" name="option" />
          <button className="button">Add Options</button>
        </form>
      </div>
    );
  }
}

export default AddOptions;