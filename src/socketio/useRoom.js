import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {useDispatch} from "react-redux";
import {addMsgAfterEvent, messageType, setReadMsg} from "../redux/reducers/dialogReducer";
import {setLoadingList, updateMsgFromUser} from "../redux/reducers/menuListReducer";
import {getRoomsSocketIo} from "../DAL/authRequest";
import {listGroupFoundThunk} from "../redux/thunk";


const SERVER_URL = 'http://localhost:3000'


export const useChat = (roomsId, idUser) => {
    const dispatchAC = useDispatch()

    const socketRef = useRef(null)


    useEffect(() => {
        socketRef.current = io(SERVER_URL, {
            query: {idUser}
        })

        roomsId.forEach(room => {
            socketRef.current.emit('joinRoom', room)
        })

        socketRef.current.on('msg:read', (arg) => {
            dispatchAC(setReadMsg(arg, idUser))
        })

        socketRef.current.on('msg:newroom', (arg) => {
            joinNewRoom(arg)
        })

        socketRef.current.on('msg:newcr', (id, senderId, talkId, msg, getId) => {
            console.log('message return to user')
            const newMsg = {
                _id: id,
                userId: senderId,
                talkingGroupId: talkId,
                text: msg,
                prevText: null,
                cntLike: 0,
                cntWatch: 0,
                whoRead: [id],
                createDate: new Date().toISOString(),
                "__v": 0
            }
            const {__v, ...msgList} = newMsg
            dispatchAC(addMsgAfterEvent(newMsg))
            dispatchAC(updateMsgFromUser(getId, msgList))

        })

        socketRef.current.on('user:newfriend', () => {
            dispatchAC(listGroupFoundThunk())
        })



        socketRef.current.on('hi:user', (a) => {
            console.log(`New user ${a}`)
        })

        return () => {
            socketRef.current.disconnect()
        }
    }, [roomsId, idUser])

    const sendMessageEvent = (id, message, room, curId) => {
        socketRef.current.emit('msg:new', id, message, room, curId)
        // dispatchAC(setLoadingList(true))

    }

    const seeMessage = (idMessage, curId) => {
        socketRef.current.emit('msg:see', idMessage, curId)
    }

    const joinNewRoom = (room) => {
        socketRef.current.emit('msg:joinroom', room)
    }


    return {seeMessage, sendMessageEvent}
}