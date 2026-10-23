
// function Message({ messages }) {
//     return messages.map((message) => (
//         <div
//             key={message.id}
//             className={
//                 message.sender === "You"
//                     ? "message-row sent-row"
//                     : "message-row"
//             }
//         >
//             <div className={
//                 message.sender === "You"
//                     ? "message-avatarY"
//                     : "message-avatarD"
//             }>
//                 <img src={message.sender==="You"? "./src/assets/eyes.png" : "./src/assets/hero.png"} alt={message.sender==="You" ? "User avatar":"Demo's avatar"} />
//             </div>

//             <div className={
//                 message.sender === "You"
//                     ? "message sent"
//                     : "message"
//             }>
//                 <p>{message.text}</p>
//                 <small>{message.time}</small>
//             </div>
//         </div>
//     ));
// }



function Message({ messages, userId }) {
    return messages.map((message) => {
        const isMine = message.userId === userId;
    // console.log({
    //     messageUserId: message.userId,
    //     currentUserId: userId,
    //     isMine: isMine
    // });
        return (
            <div key={message.id}
                className={
                    isMine ? "message-row sent-row" : "message-row" } 
                    >
                <div className={isMine ? "message-avatarY" : "message-avatarD"} >
                    <img src={isMine ? "./src/assets/eyes.png": "./src/assets/hero.png"}
                        alt={isMine ? "Your avatar" : "Other user's avatar"} />
                </div>

                <div className={isMine? "message sent": "message"} >
                    {!isMine && <strong>{message.username}</strong>}
                    <p>{message.text}</p>
                    <small>{message.time}</small>
                </div>
            </div>
        );
    });
}


export default Message;