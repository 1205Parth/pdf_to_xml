import { useState } from 'react'
import axios from 'axios'

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null)

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('pdf', file)

    const token = localStorage.getItem('token')
    const { data } = await axios.post('http://localhost:5000/api/files/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })

    onUploadSuccess(data)
  }

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>Upload & Convert</button>
    </div>
  )
}

export default FileUpload
