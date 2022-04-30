import {useEffect, useRef, useState} from "react";
import {io} from "socket.io-client";
import {useDispatch} from "react-redux";
import {addMsgAfterEvent, messageType, setAllReadMsg, setReadMsg} from "../redux/reducers/dialogReducer";
import {incrementUnreadMsg, setLoadingList, updateMsgFromUser} from "../redux/reducers/menuListReducer";
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
            console.log(id)
            const newMsg = {
                _id: id,
                userId: senderId,
                talkingGroupId: talkId,
                text: msg,
                prevText: null,
                cntLike: 0,
                cntWatch: 0,
                whoRead: [senderId],
                createDate: new Date().toISOString(),
                "__v": 0
            }
            const {__v, ...msgList} = newMsg

            dispatchAC(addMsgAfterEvent(newMsg))
            dispatchAC(updateMsgFromUser(getId, msgList))
            if (senderId !== idUser) dispatchAC(incrementUnreadMsg(senderId))
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
    }

    const seeMessage = (idMessage, curId) => {
        socketRef.current.emit('msg:see', idMessage, curId)
    }

    const joinNewRoom = (room) => {
        socketRef.current.emit('msg:joinroom', room)
    }

    const readAllMsg = () => {
        socketRef.current.emit('msg:readallmsg', idUser)
        dispatchAC(setAllReadMsg(idUser))
    }


    return {seeMessage, sendMessageEvent, readAllMsg}
}