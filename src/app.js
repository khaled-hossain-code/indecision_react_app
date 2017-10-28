console.log('Inside src app');
var app = {
  title: 'Indecision App',
  subtitle: 'Your decision Computer will take',
  options:[]
}
var appRoot = document.getElementById('app');

const removeAll = () => {
  app.options = [];
  renderApp();
}
const onFormSubmit = (e) => {
  e.preventDefault();
  const option = e.target.elements.option.value;

  if(option) {
    app.options.push(option);
    e.target.elements.option.value = '';
    renderApp();
  }
}

const decide = () => {
  let randomNum = Math.floor( Math.random() * app.options.length);
  let option = app.options[randomNum];
  alert(option);
}

const renderApp = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      {app.subtitle && <p>{app.subtitle}</p>}
      <p>{app.options.length > 0 ? 'Here are your Options' : 'No options'}</p>
      <button disabled={ app.options.length === 0 } onClick={decide}>What Should I do? </button>
      <button onClick={removeAll}> Remove All </button>
      <ul>
        {
          app.options.map( opt => <li key={opt}>{opt}</li> )
        }
      </ul>
      <form onSubmit={onFormSubmit}>
      <input type="text" name="option" />
      <button> Add Option </button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
}

renderApp();