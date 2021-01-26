import { navigate } from "@reach/router";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "../primitive.css";

const MoodCheck = props => {

    const initialState = {
        message: '',
        id: null,
        polarity: null
    }

    const [message, setMessage] = useState(initialState)

    const handleChange = event => {
        const { name, value } = event.target
        setMessage({ ...message, [name]: value })
    }

    useEffect(() => {
        setMessage({...message, id : props.userState['id']});
        if(!props.userState['isLoggedIn']) {
            navigate('/login');
        }
    }, []);

    const submitForm = (event) => {
        event.preventDefault();
        setMessage({id : props.userState['id']});

        axios.post("http://localhost:5000/api/calculateSentiment", message, {withCredentials : true}).then(res => {
            if (res.status === 201) {
                if (res.data['pos'] > res.data['neg']) {
                    setMessage({ ...message, polarity: 1 });
                    window.alert("You are thinking poitive!");
                }
                else {
                    setMessage({ ...message, polarity: 0 });
                    window.alert("You are thinking negative!");
                }
            }
        });
    }

    // const renderElement = () => {
    //     if(message.polarity === 1 )
    //         return <button type="button">You are thinking poitive!</button>
    //     return <button type="button">You are thinking negative!</button>
    // }

    return (
        <div className="medium-container">
            <div className="d-flex flex-column min-vh-100 justify-content-center">
                <form onSubmit={submitForm}>
                    <input type="text" name="message" placeholder="what's on your mind?" id="message" value={message.message} onChange={handleChange} required />
                    <button type="submit" className="button full-button">Check My Mood!</button>&nbsp;&nbsp;&nbsp;
                </form>
            </div>
            {/* {renderElement()} */}
        </div>
    )
}

export default MoodCheck
