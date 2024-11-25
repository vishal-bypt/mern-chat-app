import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversation();
   useEffect(() => {
		socket?.on("newMessage", (newMessage) => { console.log("event new message");
			newMessage.shouldShake = true;
			const sound = new Audio(notificationSound);
			sound.play();
			setMessages([...messages, newMessage]);
		});

		socket?.on("newMessage2", (newMessage) => { console.log("event new test", newMessage);
			const sound = new Audio(notificationSound);
			sound.play();
		});
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;
