class IndecisionApp extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title : "Indecision",
      subtitle : "Your Decision Computer will take",
      options : []
    }
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
  }
  handleDeleteOptions () {
    this.setState( () => {
      return {
        options: []
      }
    })
  }
  handleAddOption (newOption) {
    this.setState( (prevState) => {
      return {
        options: prevState.options.concat(newOption)
      }
    })
  }
  handlePick () {
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
        />
        <AddOptions
          options={this.state.options}        
          handleAddOption={this.handleAddOption}
        />
      </div>
    );
  }
}
class Header extends React.Component {
  render () {
    return (
      <div>
        <h1> {this.props.title} </h1>
        <h2> {this.props.subtitle} </h2>
      </div>
    );
  }
}

class Action extends React.Component {
  render () {
    return (
      <div>
        <button disabled={!this.props.hasOptions} onClick={this.props.handlePick}> What Should I do? </button>
      </div>
    );
  }
}

class Options extends React.Component {
  render () {
    return (
      <div>
      <button onClick={this.props.handleDeleteOptions}> Remove All </button>
      <ol>
        <p>{this.props.options.length > 0 ? 'list of options' : 'There is no option'}</p>
        { this.props.options.map( (option) => <Option key={option} option={option} />) }
      </ol>
      </div>
    );
  }
}

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.option}</p>
      </div>
    );
  }
}

class AddOptions extends React.Component {
  constructor (props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      error: ''
    }
  }
  formSubmit (e) {
    e.preventDefault();
    let newOption = e.target.elements.option.value.trim();

    if (!newOption) {
      this.setState( () => {
        return {error: 'Please enter an Option!'}
      } );
    } else if (this.props.options.indexOf(newOption) > -1){
      this.setState(() => { return { error : 'This Option already exist' } });
    } else {
      this.setState(() => { return { error: '' } });
      this.props.handleAddOption(newOption);
      e.target.elements.option.value = '';
    }
  }
  render() {
    return (
      <div>
      {this.state.error && (<p> {this.state.error} </p>)}
      <form onSubmit={this.formSubmit}>
        <input type="text" name="option" />
        <button>Add Options</button>
      </form> 
      </div>
    );
  }
}

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));