import MainBlock from './components/MainBlock/MainBlock';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='Header'>
        <h1>Marvelous Marvel Questionnaire</h1>
        <br/>
        <h2>Can you answer all the questions and prove yourself a Marvel superfan?</h2>
      </div>
      <div className='Content'>
        <MainBlock/>
      </div>
    </div>
  );
}

export default App;
