import "./App.css";
import { Quiz } from "./containers/Quiz";
import { QuizProvider } from "./providers/QuizProvider";

function App() {
  return (
    <div className="App h-100">
      <QuizProvider>
        <Quiz />
      </QuizProvider>
    </div>
  );
}

export default App;
