import "./App.css";
import { Quiz } from "./containers/Quiz/Quiz";
import { QuizProvider } from "./providers/QuizProvider";

function App() {
  return (
    <div className="App">
      <QuizProvider>
        <Quiz />
      </QuizProvider>
    </div>
  );
}

export default App;
