import React from 'react'
import Register from '../components/Register'
import Login from '../components/Login'

const RegAndLogin = () => {
    return(
        <div style={{height: '100%',position: 'absolute', left: '0', overflow: 'hidden', width: '100%', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover',backgroundImage: `url(https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NXx8fGVufDB8fHx8&w=1000&q=80)`, }}>
            <h1 style={{margin: '5%'}}>Welcome to FamilyBook!</h1>
            <div style={{display: 'flex'}}>
                <div style={{width: '60%'}}>
                    <h3>Register here</h3>
                    <Register />
                </div>
                <div style={{width: '40%'}}>
                    <h3>Login</h3>
                    <Login /> 
                </div>  
            </div>
        </div>


    )
}

export default RegAndLogin