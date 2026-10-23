// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import './App.css'

// import MyWelcome from './components/welcome.jsx' we can also write MyWelcome instead of Welcome according to our convenience
// import Welcome from './components/welcome.jsx'
// import Message from './components/Message.jsx'


// function App() {
// just for practice
//   const user={
//     name:"Amar",
//     age:24
//   }

//   return(
//     <div>
//       <h2>Real-Time Chat</h2>
//       <Welcome user={user} > This is Children Prop </Welcome>
      
//     </div>
//   );
// }

// function App() {
//   const [messages, setMessages]= useState([]);
//   const [message, setMessage]=useState("");
  // useState([]) // [] this is initial value which we want if we do [] it will store array when we add messages/data with setMessage function ," " will make it string, 0 will make number and so on
  // ...message will store old values
  // function handleMessage(message){
    // Dont ignore this comments read it to revise again in future
    // textMessage.push(message) this will not work as it will push values in old array hence reference is same everytime we push but in useState react expects new reference so use ...message(spread operator) instead , as it creates new array and we simply add new message at the end
    
    // setMessages([...messages,message]);
    // console.log("Parent Received",message);

  //   setMessages(prev=>{
  //     return [...prev,message];
  //   })
  // }

  // function handleSend(){
  //   if(message.trim()===""){
  //     return;
  //   }

  //   setMessages(prev=>{
  //     return [...prev,message];
  //   });
  //   setMessage("");
  // }

  // function displayMessages(){
  //   return messages.map((messageData,index)=>{
  //       return <p key={index}>{messageData}</p>;
  //   });
  // }

  // useEffect(()=>{
  //   // messageEndRef.current?.scrollIntoView({ // ? is important but optional, if current is null ? will handle it else without ? it will throw error

  //   // console.log("Use Effect ran");
  //   // when we write ,[messages]); it creates dependency so everytime messages changes useEffect is ran with }) that is no dependency it will work useEffect everytime it renders and with empty dependency ,[]); it will run only once at initial render

  //   messageEndRef.current.scrollIntoView({
  //     behavior:"smooth"
  //   });

  //   if(!isTyping && inputMessage.length>0 && setIsTyping(true));
  //   else if(inputMessage.length==0) setIsTyping(false);

  //   const timer=setTimeout(()=>{
  //     console.log("User Stopped typing...");
  //     setIsTyping(false);
  //   }, 1200);

    
  //   return ()=>{
  //     clearTimeout(timer);
  //   };
  // }, [messages,inputMessage]);
  
  // return(
  //   <div>
  //     <h2>Real-Time Chat</h2>
  //     <Welcome onMessage={handleMessage} />
  //     {messages.length===0 ? <p>No Messages Yet</p>:displayMessages()}
  //     {messages.length>0 && (<p>Total Messages: {messages.length}</p>)}

       /* condition ? run(if true) : (else if false)
       condition && (run if true) */

      /* <input type="text" value={message} onChange={(event)=>{
        setMessage(event.target.value);
      }} />
      <button onClick={handleSend}>Send</button>
    </div>
  );
  // practice
}
export default App */