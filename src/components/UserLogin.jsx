import React, { useState } from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import '../assets/styles/userLogin.css';

export default function UserLogin() {
    const [login, setLogin] = useState(false);
    const [picture, setPicture] = useState("");
    const [data, setData] = useState({});

    const responseFacebook = (response) => {
        console.log(response);
        if (response.status === "unknown") {
            alert("Login failed!");
            setLogin(false);
            setData({});
            setPicture("");
            return false;
        }
        setData(response);
        setPicture(response.picture.data.url);
        if (response.accessToken) {
            setLogin(true);
        } else {
            setLogin(false);
            setData({});
            setPicture("");
        }
    };
    const logout = () => {
        setLogin(false);
        setData({});
        setPicture("");
    };

    return (
        <div className="container">
            {!login && (
                <FacebookLogin
                    appId="327488172949885"
                    autoLoad={false}
                    fields="name,email,picture"
                    onSuccess={responseFacebook}
                    icon="fa-facebook"
                    style={{
                        backgroundColor: '#4267b2',
                        color: '#fff',
                        fontSize: '16px',
                        padding: '12px 24px',
                        border: 'none',
                        borderRadius: '4px',
                    }}
                />
            )}

            {login && (
                <div className="card">
                    <div className="card-body">
                        <img className="rounded" src={picture} alt="Profile" />
                        <h5 className="card-title">{data.name}</h5>
                        <p className="card-text">Email ID: {data.email}</p>
                        <a href="#" className="btn" onClick={logout}>
                            Logout
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
