import logo from './logo.svg';
import './App.css';
import ComponentSample from './ComponentSample';
import MyComponent1 from './MyComponent1';
import DebugComponent from './DebugComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>code sample</p>
      <ComponentSample value="value"></ComponentSample>
      <MyComponent1></MyComponent1>
      <DebugComponent debugDataStoreName="debugData"></DebugComponent>
    </div>
  );
}

export default App;
