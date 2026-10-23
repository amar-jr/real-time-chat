
const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";
import {io} from "socket.io-client";
import { useState, useRef, useEffect } from 'react'
import './App.css'

import Welcome from './components/welcome.jsx'
import Message from './components/Message.jsx'

function App(){
  // states
  // used localStorage 
  // const [messages, setMessages]=useState(()=>{
  //   const saved=localStorage.getItem('messages');
  //   return saved!==null? JSON.parse(saved): [...messageData];
  // });

  const [messages, setMessages]=useState([]);
  const [inputMessage, setInputMessage]=useState("");

  // ref
  const messageEndRef=useRef(null);
  const inputRef=useRef(null);
  const [isTyping, setIsTyping]=useState(false);

  // backend
  const [serverMessage, setServerMessage]=useState("");

  // error state
  const [error, setError]=useState("");
  // Load state
  const [isLoading, setIsLoading]=useState(true);

  // user
  const [userId, setUserId] = useState(() => {
  const savedId = localStorage.getItem("chatUserId");

  if (savedId) return savedId;

  const newId = crypto.randomUUID();
  localStorage.setItem("chatUserId", newId);
  return newId;
});

  const [username, setUsername] = useState(() => {
  const savedName = localStorage.getItem("chatUsername");

  if (savedName) return savedName;

  const newName = `User-${Math.floor(Math.random() * 1000)}`;
  localStorage.setItem("chatUsername", newName);
  return newName;
});
  
  // useEffect(()=>{
  //   fetch("http://localhost:3000/api/hello")
  //   .then((response)=>{
  //     return response.json() })
  //   .then((data)=>{
  //     // console.log(typeof data); // returns object
  //     // console.log(data.message); // message is property in backend
  //     setServerMessage(data.message)})
  //   .catch((error)=>{
  //     console.log("Backend Error", error);
  //   })
  // }, []);

  useEffect(()=>{
    // messageEndRef.current?.scrollIntoView({ // ? is important but optional, if current is null ? will handle it else without ? it will throw error

    // console.log("Use Effect ran");
    // when we write ,[messages]); it creates dependency so everytime messages changes useEffect is ran with }) that is no dependency it will work useEffect everytime it renders and with empty dependency ,[]); it will run only once at initial render

    messageEndRef.current.scrollIntoView({
      behavior:"smooth"
    });

    if(!isTyping && inputMessage.length>0 && setIsTyping(true));
    else if(inputMessage.length==0) setIsTyping(false);

    const timer=setTimeout(()=>{
      console.log("User Stopped typing...");
      setIsTyping(false);
    }, 1200);

    
    return ()=>{
      clearTimeout(timer);
    };
  }, [messages,inputMessage]);
  

  useEffect(()=>{
    localStorage.setItem('messages', JSON.stringify(messages));
    return()=>{
      console.log("LocalStorage Chat Backup");
    };
  }, [messages]);

  useEffect(()=>{
    try{
      const startTime=Date.now();
      fetch(`${SERVER_URL}/api/messages`).then((response)=>{
        const statusCode=response.status;
        if(!response.ok){
          throw new Error("Failed to Fetch Messages");
        }
        if(statusCode>=500 && statusCode<=599){
          throw new Error('Backend server Error');
        }
        else if(statusCode>=400 && statusCode<=499){
          throw new Error("Client error refresh again..");
        }

        return response.json();
      }).then((data)=>{
        setMessages(data);
        setError("");
        // setIsLoading(false); we dont need this as our default isLoading is true so it will show loading messages and code will reach here then in finally it will be set false and messages will be displayed and if there is some error code pointer will go to catch and not in this code.. and in catch it will setError and in finally again isLoading will be set to false with setIsLoading and then display error on screen

      }).catch((error)=>{
        setError(error.message);
        // setIsLoading(true);
        console.log(`Some Error ${error}`);
      }).finally(()=>{
        const timerTillHere=Date.now()-startTime;
        console.log(timerTillHere);
        const remaining= Math.max(0, 2000-timerTillHere);
        // if api already took few seconds or more we dont want to spend extra time in setimeout so we are calculating remaining time and waiting for that particular time.. 0 if api already used 3 seconds or more so max will 0 as other term will result in negative .. this comment is just for understanding

        setTimeout(()=>{
          setIsLoading(false);
        }, remaining);
      })
    }
    catch(error){
      console.log("Refresh again got this error",error);
    }

  }, []);

  useEffect(()=>{
    const socket=io(SERVER_URL);

    socket.on("newMessage", (newMessage)=>{
      setMessages((prevMessages)=>{
        return [...prevMessages,newMessage];
      });
    });

    return ()=>{
      socket.disconnect();
    }
  }, []);

  async function testPostReq(){
    let success=true; // this is just for not clearing inputMessage if there is some error in addMessage function
    try{
      const response= await fetch(`${SERVER_URL}/api/messages`, {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          text:inputMessage,
          userId:userId,
          username:username
        })
      });

      if(!response.ok){
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data=await response.json();
      console.log("Backend responsed back:",data);
      // setMessages([...messages,data.message]); 
      // usally use arrow function as it show latest update 
      setError("");
    }
    catch(error){
      setError(error.message);
      console.log("Post request Failed",error);
      success=false;
    }
    return success;
  }

  async function addMessage(){
    if(inputMessage.trim().length===0){
      console.log("Enter Valid Input");
      return;
    }
    if(inputMessage==='clear()'){
      setMessages([]);
      setInputMessage("");
      return;
    }
    // setMessages((prev)=>{

      // At the beginning of project i made message obj in frontend itself now we will create it in the server(backend) with post request
      // return [...prev,{id:Date.now(), text:inputMessage, sender:"You", time:new Date().toLocaleTimeString([], {
      //     hour: "2-digit", minute: "2-digit", hour12:true
      //   })
      // }];
    // });

    // const response=fetch("http://localhost:3000/api/messages",{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:inputMessage
    // });

    // const data= await response.json();

    await testPostReq() && setInputMessage("");
    // console.log(inputRef.current);

    inputRef.current?.focus();
  }


  return(
    <div className="chat-container">
      <Welcome />
      <div className="messages-container">
        
        {/* <Message messages={messages} /> */}
        {isLoading? (<p>Loading Messages....</p>): (<Message messages={messages} userId={userId}/>)}
        {error && <p className="error-message">{error}</p>}

        {/* <p>Backend: {serverMessage}</p>
        <button onClick={()=>testPostReq(inputMessage)}>Test Backend</button> */}

        <div ref={messageEndRef}></div>
        {isTyping && <small>Typing....</small>}
      </div>



      <div className="message-input-container">

        <input 
          ref={inputRef} 
          placeholder="Enter here" value={inputMessage} 
          onChange={(event)=>{
            setInputMessage(event.target.value);
          }} 
          onKeyDown={(event)=>{
            if(event.key==="Enter"){
              addMessage();
            }
        }} />

        <button onClick={addMessage}> Send</button>

      </div>
      
    </div>
  );
}

export default App;