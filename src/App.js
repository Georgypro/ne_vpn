import './App.css';
import './Languages/i18n';
import Header from "./Components/Header"
import Content from "./Components/Content"
import StartBlock from "./Components/StartBlock"
import Background from "./Components/Background"

function App() {
  return (
      <div className="App">
        <header>
          <Header/>
        </header>

        <div id="Body">
            <Background/>
            {/*<StartBlock/>*/}
            {/*<Content/>*/}
        </div>
      </div>
  );
}

export default App;
