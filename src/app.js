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
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
  }
  componentDidMount() { //this fires after mounting the component on DOM
    try {
      const options = JSON.parse(localStorage.getItem('options'));
      if(options){
        this.setState( () => ({options}));
      }
    }catch(e){
      console.error('json parse failed');
    }
  }
  componentDidUpdate(prevProps, prevState) {  //this fires when component props or state updates
    if(prevState.options.length !== this.state.options.length){
      const json = JSON.stringify(this.state.options);
      localStorage.setItem('options', json);
    }
  }
  componentWillUnmount(){} //this is just before exiting page or replacing the component by anything else
  handleDeleteOptions () {
    this.setState( () => ({ options: []}) );
  }
  handleDeleteOption (option) {
    this.setState( (prevState) => ({
      options: prevState.options.filter( (opt) =>  opt !== option )
    }))
  }
  handleAddOption (newOption) {
    this.setState( (prevState) => ({options: prevState.options.concat(newOption)}) );
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
          handleDeleteOption={this.handleDeleteOption}
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
        { this.props.options.map( (option) => (
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

class Option extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.option}</p>
        <button onClick={ (e) => { this.props.handleDeleteOption(this.props.option)}}> Remove </button>
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
      this.setState( () =>  ({error: 'Please enter an Option!'}) );
    } else if (this.props.options.indexOf(newOption) > -1){
      this.setState( () => ({ error : 'This Option already exist' }) );
    } else {
      this.setState( () => ({ error: '' }) );
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