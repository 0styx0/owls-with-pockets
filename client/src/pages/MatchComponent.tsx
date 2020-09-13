import { render } from "@testing-library/react";
import React from "react";

interface Props {
    websocket: WebSocket,
}

class MatchComponent extends React.Component<Props, {}> {
    sendMessage=()=>{
        const {websocket} = this.props // websocket instance passed as props to the child component.

        try {
            websocket.send("test") //send data to the server
        } catch (error) {
            console.log(error) // catch error
        }
    }
    render() {
        return <div>Click to Match Up with a Player!</div>;
    }
}
export default MatchComponent;