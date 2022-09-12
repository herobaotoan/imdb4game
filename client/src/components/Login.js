import React, { useState, useEffect } from "react";

export default function Login() {
    const [data, setData] = useState([])
    const endPoint = "http://localhost:4001/users"
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [statement, setStatement] = useState('')
    const [isShown, setIsShown] = useState(false);

    const load = () => {
        fetch(endPoint)
          .then(response => response.json())
          .then(data => setData(data));
    }
    
    function login (usn, pwd){
        for (var i = 0; i < data.length; i++){
            if ((usn === data[i].username) && (pwd === data[i].password )){
                setStatement('Login Successful')
                setIsShown(true)
                break
            }
            setStatement('Username or Password Incorrect')
        }
    }
    const register = (usn) => {
        var check = false
        for (var i = 0; i < data.length; i++){
            if (usn === data[i].username){
                setStatement('Username Taken. Please Try Another Username')
                check = true
                break
            }  
        }
        if (check === false) {
            fetch(endPoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: username, password: password})
            })
            setStatement('User Registration Successful! Please Login')
            load()
        }
    }

    function cancel(){
        setIsShown(false)
        setUsername('')
        setPassword('')
        setStatement('')
    }

    useEffect(() => {
        load()
       }, [])
    

    return (
        <div class="container p-5" style={{width : 650, height : 320, marginTop: 170, backgroundColor: 'rgba(55, 55, 55, 0.8)'}}>
            <h1 class="mt-auto text-center">Welcome</h1>
            <form>
                <div class="row mb-5">
                    <input class="form-control form-control-lg col" style={{height : 50}} type="text" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div class="row mb-5">
                    <input class="form-control form-control-lg col" style={{height : 50}} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div class="row mb-2">
                    <button class="btn btn-secondary btn-lg" type="button" onClick={()=> login(username, password)}>Login</button> 
                    <p class="col-auto text-center mt-3">OR</p>
                    <button class="btn btn-secondary btn-lg" type="button"onClick={()=> register(username)}>Register</button>
                    <p class="col-auto text-center mt-3">{statement}</p>
                    {isShown && (
                        <div class="row">
                            <div class="col-auto">
                                <a href="/game" class="btn btn-secondary btn-lg">Continue</a> 
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-secondary btn-lg" onClick={()=> cancel()}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
            
        </div>
    )

}