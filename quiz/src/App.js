import './App.css';
import React,{useState, useEffect} from 'react';
import Quiz from './component/Quiz';
import Axios from 'axios';

const APi_URL = "https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple" ;

function App() {

  const [questions,setQuestions]  = useState([]);
  const [CurrentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  
  useEffect(()=> {
    Axios.get(APi_URL)
    .then(res => res.data)
    .then(data=>{
      const questions = data.results.map((question) => ({
        ...question, 
        answers:[question.correct_answer, ...question.incorrect_answers].sort(()=> Math.random() -0.5)
      }))
      setQuestions(questions)
    })
  },[])

  const handleAnswer = (answer) => {
    if(!showAnswers){
      if(answer === questions[CurrentIndex].correct_answer){
        setScore(score+1)
      }
    }

    setShowAnswers(true)
  }

  const handleNextQuestion = () => {
    setCurrentIndex(CurrentIndex+1)
    setShowAnswers(false)
  }

  return ( questions.length > 0 ? (
    <div className="App">
      {CurrentIndex >= questions.length ? (
        <h1>Game end {score}</h1>):(
          <Quiz 
          handleAnswer={handleAnswer} 
          handleNextQuestion={handleNextQuestion}
          showAnswers={showAnswers}
          data={questions[CurrentIndex]} />
        ) 
      }
      
    </div>
  ): 'Loading....'
  );
}

export default App;
