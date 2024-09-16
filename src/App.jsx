import { useEffect, useState } from 'react'
import Sidebar from './component/sidebar'
import './App.css'
import { getAnswer } from './config/Ai'

function App() {

  const [answers, setAnswers] = useState([]) // Ubah state ke array 'answers'
  const [prompt, setPrompt] = useState("") // Input untuk prompt
  const [extended, setExtended] = useState(true);
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setPrompt("")

    getAnswer(prompt)
      .then(response => {
        setAnswers(prevAnswers => [...prevAnswers, response]) // Tambahkan jawaban baru ke array 'answers'
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching answer:", error)
        setLoading(false)
      })
  }

  return (
    <>
      <Sidebar />

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg h-fit dark:border-gray-700">
          <div className='bg-red-400 max-h-full rounded-md p-4 h-[600px] overflow-auto mb-6'>
            {loading ? (
              <div className='loader bg-neutral-100 h-fit rounded-md p-4'>
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              answers.length === 0 ? null : (
                answers.map((item, index) => (
                  <div className='m-2'>
                    <div className='bg-neutral-100 rounded-md p-4'>
                      <p key={index}>{item}</p>
                    </div>
                  </div>
                ))

              )
            )}
          </div>

          <form onSubmit={handleSubmit} className='bg-neutral-200 shadow-lg w-full h-[50px] outline-none border-none rounded-full px-7 flex items-center'>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Input Text Here'
              className='h-full border-none w-full bg-neutral-200 outline-none focus:ring-0 focus:border-none'
            />
            <button type='submit' className='ml-2'>Submit</button>
          </form>
        </div>
      </div >
    </>
  )
}

export default App
