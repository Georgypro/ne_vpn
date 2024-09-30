import './App.css';
import './Languages/i18n';
import Background from "./Components/Background";
import Content from './Components/Content'

function App() {
  return (
      <div className="App">

          <div id="Body">
              <div>
                  <Background/>
              </div>
              <Content/>
          </div>

      </div>
  );
}

export default App;
