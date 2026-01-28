  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  
  export const AiTool=()=>{


  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const askAI = async () => {
    const res = await axios.post("http://localhost:5000/api/ai", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything"
      />
      <button onClick={askAI}>Ask AI</button>

      <p>{answer}</p>
    </div>
  );
}


