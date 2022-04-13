import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {useDispatch} from "react-redux";
import {setReadMsg} from "../redux/reducers/dialogReducer";


const SERVER_URL = 'http://localhost:3000'


export const useChat = (roomId, idUser) => {
    // const [users, setUsers] = useState([])
    const [messages, setMessages] = useState('')
    const dispatchAC = useDispatch()

    const id = idUser
    const username = 'admin'

    const socketRef = useRef(null)


    useEffect(() => {
        socketRef.current = io(SERVER_URL, {
            query: {roomId, id}
        })


        socketRef.current.on('msg:read', (arg) => {
            dispatchAC(setReadMsg(arg, id))
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [roomId, id, username])


    const seeMessage = (idMessage) => {
        setMessages(idMessage)
        socketRef.current.emit('msg:see', idMessage)
    }

    return {seeMessage}
}