import { useEffect, useState } from "react";
import "./App.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { BeatLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function App() {
  const apikey = import.meta.env.VITE_API_GEMINI_KEY;

  //  Store data use state hook
  // destructure the use state into prompt and setprompt
  // prompt is the input from the user
  // setprompt is the function to update the prompt

  const [prompt, setPrompt] = useState("");

  // store the response from the user and shoew on the screen
  // array of object is used to store the prompt and response
  const [response, setResponse] = useState([
    {
      prompt: "Hi,how can i help you",
      response: "I am a chat, ask me anything",
    },
  ]);

  let [loading, setLoading] = useState(false);

  async function fetchChatResponseFromGemini() {
    setLoading(true);
    // create an instance of the GoogleGenerativeAI class
    const genAI = new GoogleGenerativeAI(apikey);
    // we have selected the model "gemini-1.5-flash"
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    // we have given the prompt to the model and it will generate the response

    const result = await model.generateContent(prompt);
    // console.log(result.response.text());

    const newResponse = [
      ...response,
      {prompt: prompt, response: result.response.text()},
    ]
    setResponse(newResponse);
    setPrompt("");
    setLoading(false);
    //  save the response in the local storage
    localStorage.setItem('chatbotResponse', JSON.stringify(newResponse));
  }

  useEffect(()=>{
// get the response from the local storage
  const data = localStorage.getItem('chatbotResponse');
  console.log("data", data);
  if(data){
    setResponse(JSON.parse(data));
}},[])

console.log("response", response);

  return (
    <>
      <h1 className="heading">AI Chatbot</h1>
      <div className="chatbot_container">
        <div className="chatbot_response_container">
          {
            // Map to show the data from the response array state
            response.map((res, index) => (
              <div key={index} className="response">
                <p className="chatbot_prompt">
                  <strong>user : </strong>
                  {res.prompt}
                </p>
                <p className="chatbot_response">
                  <strong>chatbot : </strong>
                  {res.response}
                </p>
              </div>
            ))
          }
          {loading && (
            <BeatLoader
              color={"chocolate"}
              loading={loading}
              cssOverride={override}
              size={25}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          )}
        </div>
        <div className="chatbot_input">
          <input
            type="text"
            name="input"
            value={prompt}
            placeholder="enter your questions"
            className="input"
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
          />

          <button type="button" onClick={fetchChatResponseFromGemini}>
            submit
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
