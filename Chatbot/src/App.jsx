import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";


function App() {

  const apikey = import.meta.env.VITE_API_GEMINI_KEY;
  
 async function fetchChatResponseFromGemini(){
    const genAI = new GoogleGenerativeAI("apikey");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "What is 5+10 ?";

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
  }
  
  return (
    <>
      <h1 className="heading">AI Chatbot</h1>
      <div className="chatbot_container">

        <div className="chatbot_response">
          <p>Hi,how can i help you today?</p>
        </div>

        <div className="chatbot_input">
          <input type="text" name="input" placeholder="Enter your questions" className="input" />
          <button type="button"onClick={fetchChatResponseFromGemini}>submit</button>

        </div>


      </div>
    </>
  );
}

export default App;
