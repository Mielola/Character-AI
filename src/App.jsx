import { useEffect, useState } from 'react'
import Sidebar from './component/sidebar'
import './App.css'
import { getAnswer } from './config/Ai'
import avatar from './assets/img/Avatar.png'

function App() {

  const [answers, setAnswers] = useState([]) // Ubah state ke array 'answers'
  const [prompt, setPrompt] = useState("") // Input untuk prompt
  const [extended, setExtended] = useState(true);
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setPrompt("")

    const currentPrompt = prompt;

    getAnswer(currentPrompt)
      .then(response => {
        setAnswers(prevAnswers => [...prevAnswers, { prompt: currentPrompt, response }])
        setLoading(false)
      })
      .catch(error => {
        console.error("Error fetching answer:", error)
        setLoading(false)
      })
  }

  return (
    <>
      {/* <Sidebar /> */}

      <div className="p-4 bg-[#131619]">
        <div className="p-4rounded-lg h-fit dark:border-gray-700">
          <div className='bg-[#0D0F10] max-h-full rounded-md p-4 h-[652px] overflow-auto mb-6'>
            {loading ? (
              <div className='loader bg-neutral-100 h-fit rounded-md p-4'>
                <hr />
                <hr />
                <hr />
              </div>
            ) : (
              answers.length === 0 ? null : (
                answers.map((item, index) => (
                  <div className='flex flex-col text-white px-4'>
                    <div className=' my-2 '>
                      <div className='w-fit items-center flex gap-4 bg-neutral-200 text-black py-3 px-3 rounded-md float-end'>
                        <img src={avatar} alt="" />
                        <div className='fl'>
                          <h1 className='font-bold'>Muhammad Tatang Dhiya Ulhaq</h1>
                          <p key={index}>{item.prompt}</p>
                        </div>
                      </div>
                    </div>
                    <div className=' my-2 w-fit flex gap-4 items-start py-4 px-4 rounded-md'>
                      <img src={avatar} alt="" className='' />
                      <div className=''>
                        <h1 className='font-bold'>AI</h1>
                        <p key={index}>{item.response}</p>
                      </div>
                    </div>
                  </div>
                ))

              )
            )}
          </div>

          <form onSubmit={handleSubmit} className='bg-[#0D0F10] shadow-lg w-full h-[50px] outline-none border-none rounded-full px-7 flex items-center'>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Input Text Here'
              className='h-full border-none w-full bg-[#0D0F10] outline-none focus:ring-0 focus:border-none focus:text-white'
            />
            <button type='submit' className='ml-2 text-white'>Submit</button>
          </form>
        </div>
      </div >
    </>
  )
}

export default App
