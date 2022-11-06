import axios from 'axios'
import { useContext } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    })
    const navigator = useNavigate()
    const { error, loading, dispatch } = useContext(AuthContext)
    const handleInput = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    }
    const handleLogin = async (e) => {
        dispatch({ type: 'LOGIN_START' })
        try {
            const responce = await axios.post('/auth/login', credentials)
            dispatch({ type: 'LOGIN_SUCCESS', payload: responce.data })
            navigator('/')
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE', payload: error.response.data })
            console.log(error)
        }
    }
    return (
        <div className='login'>
            <input
                className='lInput'
                placeholder='login'
                type='text'
                id='username'
                onChange={(e) => handleInput(e)}
            />
            <input
                className='lInput'
                placeholder='password'
                type='password'
                id='password'
                onChange={(e) => handleInput(e)}
            />
            <button className='lButton' onClick={handleLogin} disabled={loading}>
                Login
            </button>
            {error && error.message}
        </div>
    )
}

export default Login
