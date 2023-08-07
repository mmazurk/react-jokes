import JokeList from "./JokeList";
import {Component} from "react"; 

// function App() {
//   return (
//     <div className="App">
//       <JokeList />
//     </div>
//   );
// }

// Note that App.js and JokeList.js have been refactored to be class-based components
// This was done as an exercise! 

class App extends Component {
  render()  {
    return (
      <div className="App">
        <JokeList />
      </div>
    )
  }
}

export default App;
