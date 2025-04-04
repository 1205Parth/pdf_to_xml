import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      })
      localStorage.setItem('token', data.token)
      router.push('/dashboard')  // ✅ Next.js way of navigating
    } catch (err) {
      alert('Invalid credentials')
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login
