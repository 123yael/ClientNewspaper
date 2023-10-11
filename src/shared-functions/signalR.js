import { HttpTransportType, HubConnectionBuilder, LogLevel } from "@microsoft/signalr"
import { useState } from "react"

export const SignalR = () => {
    
    const [connection, setConnection] = useState()
    const [messages, setMessages] = useState([])

    const joinRoom = async (user, room) => {

        try {
            const connection = new HubConnectionBuilder()
                .withUrl(`https://localhost:44305/chat`, {
                    skipNegotiation: true,
                    transport: HttpTransportType.WebSockets
                })
                .configureLogging(LogLevel.Information)
                .build()

            connection.on("ReceiveMessage", (user, message) => {
                setMessages(messages => [...messages, { user, message }])
            })

            await connection.start()
            await connection.invoke("JoinRoom", { user, room })

            setConnection(connection)

        } catch (e) {
            console.log(e);
        }
    }



    return <></>
}

