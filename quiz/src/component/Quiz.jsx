import React from 'react'
import './Quiz.css'

const Quiz = ({handleAnswer, handleNextQuestion, showAnswers, data:{question, correct_answer, answers}}) => {
  return (
    <div>
      {/* 1 membuat judul dari quiz */}
      <div className="header">
        <h1>Quiz Computer sience</h1>
      </div>
      {/* pertanyaan */}
      <div className="questionClass">
        <h1 dangerouslySetInnerHTML={{__html:question}}/> 
        <ul>
            {answers.map((answer,idx) => {
              const specialClassName = showAnswers ?(
                answer === correct_answer ? "green-btn" : "red-btn"
              ): "";
              return(<li><button className={`btn-standard ${specialClassName}`}
                onClick={()=> handleAnswer(answer)}
                dangerouslySetInnerHTML={{__html:answer}} /></li>)

            })}
        </ul>
      </div> 
      {showAnswers && (
        <button onClick={handleNextQuestion} className='next-question' > Next Question</button>
      )}
      {/* Multipe Choice */}
    </div>
  )
}

export default Quiz
