import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/register', { email, password })
      alert('Registered! Now login.')
      router.push('/login') // ✅ Use Next.js router
    } catch (err) {
      alert('Registration failed')
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Register
