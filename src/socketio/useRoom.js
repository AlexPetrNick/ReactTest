import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {useDispatch} from "react-redux";
import {addMsgAfterEvent, messageType, setReadMsg} from "../redux/reducers/dialogReducer";
import {updateMsgFromUser} from "../redux/reducers/menuListReducer";


const SERVER_URL = 'http://localhost:3000'


export const useChat = (roomId, idUser) => {
    const [rooms, setRooms] = useState([])
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

        socketRef.current.on('msg:newcreate', (id, senderId, talkId, msg, getId) => {
            const newMsg = {
                _id: id,
                userId: senderId,
                talkingGroupId: talkId,
                text: msg,
                prevText: null,
                cntLike: 0,
                cntWatch: 0,
                whoRead: [id],
                createDate: String(new Date()),
                "__v": 0
            }
            const { __v, ...msgList} = newMsg
            dispatchAC(addMsgAfterEvent(newMsg))
            dispatchAC(updateMsgFromUser(getId, msgList))
        })


        socketRef.current.on('test2', (a) => {
            console.log(a)
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [roomId, id, username])

    const sendMessageEvent = (id, message, room) => {
        console.log('there')
        socketRef.current.emit('msg:new', id, message, room)
    }


    const seeMessage = (idMessage) => {
        setMessages(idMessage)
        socketRef.current.emit('msg:see', idMessage)
    }

    const test1 = () => {
        console.log('in')
        socketRef.current.emit('test1', 'из 1 во 2')
    }

    return {seeMessage, sendMessageEvent, test1}
}