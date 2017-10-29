class Visibility extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showMessage:false,
      message: 'This is the message need to be hidden'
    }
    this.makeVisible = this.makeVisible.bind(this);
  }

  makeVisible () {
    this.setState( (prevState) => {
      return {
        showMessage : !prevState.showMessage
      }
    })
  }

  render() {
    return (
      <div>
        <h1> Visibility App </h1>
        <button onClick={this.makeVisible}> { this.state.showMessage ? 'Hide message' : 'Show message'} </button>
        { this.state.showMessage && (<p> {this.state.message} </p>) }
      </div>
    );
  }
}

ReactDOM.render(<Visibility />, document.getElementById('app'));