import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { navigate } from "@reach/router";

const History = props => {

    const initialState = {
        id: props.userState['id'],
        response: null
    }

    const [state, setstate] = useState(initialState)

    useEffect(() => {
        if(!props.userState['isLoggedIn']) {
            navigate('/login');
        }
        axios.get(`http://localhost:5000/api/history`, { params: { id: props.userState['id'] } }, { withCredentials: true }).then(res => {
            setstate({ ...state, response: res.data });
        });
    }, []);


    if (state.response) {
        return (
            <div className="medium-container">
                <table>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Date</th>
                            <th>Mood</th>
                        </tr>
                    </thead>
                    <tbody>
                        {state.response.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{row.message}</td>
                                    <td>{row.date}</td>
                                    <td>{row.polarity}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Message</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }

}

export default History;
