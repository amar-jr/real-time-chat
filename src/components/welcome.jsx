import { Children } from "react";

// function Welcome({user,children}){
   // without {} braces just write props it will have all properties which are sent and children is inbuild prop in this case text between <welcome> component is children prop

   // return(
   //    <>
   //       <p>Welcome to my Chat Application..</p>
         {/* <p>{user.name} </p>
         <p>{user.age} </p>
         <p>{children}</p> */}
      // </>
//    );
// }

function Welcome(){
   return <h2>Welcome to Real-Time Chat</h2>
}

export default Welcome;