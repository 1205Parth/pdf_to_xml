import { useEffect, useState } from 'react'
import axios from 'axios'
import FileUpload from '../components/FileUpload'

const Dashboard = () => {
  const [files, setFiles] = useState([])

  const fetchFiles = async () => {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('http://localhost:5000/api/files', {
      headers: { Authorization: `Bearer ${token}` }
    })
    setFiles(data)
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  return (
    <div>
      <h2>Upload PDF</h2>
      <FileUpload onUploadSuccess={fetchFiles} />

      <h3>Your Converted Files</h3>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.filename} - <a href={`http://localhost:5000/${file.xmlPath}`} target="_blank">Download XML</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard
