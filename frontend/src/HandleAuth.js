import { createContext } from "react";

// const BACKEND_URI='http://localhost:4000'
const BACKEND_URI='https://productiwinapi.onrender.com'


export const authGET = async (url, setUserId, navigate) => {
    url = BACKEND_URI + url
    const response = await fetch(url);
    const json = await response.json();
    const userid = json.userid;

    if(setUserId)
        setUserId(userid);
    if(userid == null){
        if(navigate)
            navigate('/login');
        return null;
    }
    else
        return json;
}

export const authPOST = async (url, data, setUserId, navigate) => {
    url = BACKEND_URI + url
    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        
    });
    const json = await response.json();
    const userid = json.userid;

    if(setUserId)
        setUserId(userid);
    if(userid == null){
        if(navigate)
            navigate('/login');
    }
    return json;
}

export const authPUT = async (url, data, setUserId, navigate) => {
    url = BACKEND_URI + url
    const response = await fetch(url, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        
    });
    const json = await response.json();
    const userid = json.userid;

    if(setUserId)
        setUserId(userid);
    if(userid == null){
        if(navigate)
            navigate('/login');
        return null;
    }
    else
        return json;
}

export const authPATCH = async (url, data, setUserId, navigate) => {
    url = BACKEND_URI + url
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        
    });
    const json = await response.json();
    const userid = json.userid;

    if(setUserId)
        setUserId(userid);
    if(userid == null){
        if(navigate)
            navigate('/login');
        return null;
    }
    else
        return json;
}

export const authDELETE = async (url, setUserId, navigate) => {
    url = BACKEND_URI + url
    const response = await fetch(url, {
        method: 'DELETE'
    })
    const json = await response.json();
    const userid = json.userid;

    if(setUserId)
        setUserId(userid);
    if(userid == null){
        if(navigate)
            navigate('/login');
        return null;
    }
    else
        return json;
}

export const AuthContext = createContext({
    userId: null,
    setUserId: () => {}
});