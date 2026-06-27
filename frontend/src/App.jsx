import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Navbar from './components/Navbar'
import { IoMdSave } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { IoCopy } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify';

function App() {
  const [form, setform] = useState({ id: "", site: "", username: "", password: "" })
  const [passwords, setpasswords] = useState([])
  const [showPassword, setshowPassword] = useState(false)
  const [loaded, setloaded] = useState(false)

  const getPasswords = async () => {
    const res = await fetch("http://localhost:3000/")
    const passwordArray = await res.json()
    setpasswords(passwordArray)
  }

  useEffect(() => {
    getPasswords();
  }, [])

  useEffect(() => {
    localStorage.setItem("passwords", JSON.stringify(passwords))
  }, [passwords])

  useEffect(() => {
    setloaded(true)
  }, [])


  const handleSave = async () => {
    if (form.site.trim() === "") {
      toast.error('Website URL cannot be empty!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return
    } else if (form.username.trim() === "") {
      toast.error('Username cannot be empty!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return
    } else if (form.password.trim() === "") {
      toast.error('Password cannot be empty!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return
    } else {
      let res = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: uuidv4(),
          site: form.site,
          username: form.username,
          password: form.password,
        }),
      });

      console.log(await res.json())
      setform({ id: "", site: "", username: "", password: "", })
      getPasswords();

      toast.success('Password saved!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

    }

  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this password?")) {
      let res = await fetch(`http://localhost:3000/${id}`, {
        method: "DELETE",
      });
      console.log(await res.json())

      getPasswords();

      toast.success('Password deleted!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    } else {
      return
    }
  };
  const handleEdit = async (id) => {
    let item = passwords.find(item => item.id === id)
    setform(item)
    let res = await fetch(`http://localhost:3000/${id}`, {
      method: "DELETE",
    });
    console.log(await res.json())

    getPasswords();
  }

  const handleCopy = (item)=> {
    navigator.clipboard.writeText(item.password)
    toast.success('Password copied to clipboard!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Navbar />
      <main className={`transition-all duration-1000 ease-out ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="container flex flex-col items-center gap-2 p-5 mx-auto max-w-[80vw] min-h-[35vh]">
          <div className="heading flex flex-col items-center">
            <div className='text-2xl font-bold'>
              <span className='text-green-400'>&lt;</span>PMUltra<span className='text-green-400'>/&gt;</span>
            </div>
            <p className='font-bold'>Your Own Password Manager</p>
          </div>

          <div className="url">
            <input onChange={handleChange} name="site" value={form.site} className='bg-white border border-green-400 rounded-full w-xs md:w-lg px-3 py-0.5' type="text" placeholder='Enter Website URL' />
          </div>
          <div className="data flex gap-3">
            <input onChange={handleChange} name="username" value={form.username} className='bg-white border border-green-400 rounded-full w-40 md:w-xs px-3 py-0.5' type="text" placeholder='Enter Username' />
            <div className="input_ps relative">
              <input type={showPassword ? "text" : "password"} onChange={handleChange} name="password" value={form.password} className='bg-white border border-green-400 rounded-full w-40 md:w-xs px-3 py-0.5' placeholder='Enter Password' />
              {showPassword ? <IoEyeOff onClick={() => setshowPassword(!showPassword)} className='absolute right-3 top-2 cursor-pointer' /> :
                <IoEye onClick={() => setshowPassword(!showPassword)} className='absolute right-3 top-2 cursor-pointer' />}
            </div>
          </div>
          <button onClick={handleSave} className='save flex items-center gap-1 hover:scale-105 transition-all duration-300 bg-green-300 border border-black text-black px-5 py-1 rounded-full cursor-pointer mt-2'><IoMdSave />Save</button>
        </div>
        <div className="passwords flex flex-col mx-auto max-w-[70vw] min-h-[48vh] pb-20">
          <h1 className='font-bold mb-2'>Your Passwords</h1>
          <div className="info ">
            <ul className='flex justify-around items-center p-1 bg-green-800'>
              <li className='text-sm text-white font-bold'>Site</li>
              <li className='text-sm text-white font-bold'>Username</li>
              <li className='text-sm text-white font-bold'>Password</li>
              <li className='text-sm text-white font-bold'>Actions</li>
            </ul>
          </div>
          {passwords.map((item) => {
            return <div key={item.id} className="ps">
              <ul className='flex items-center p-1 bg-green-300'>
                <li className='text-sm text-black min-w-[13vw] sm:min-w-[15vw] break-all flex justify-center'>{item.site}</li>
                <li className='text-sm text-black min-w-[19vw] sm:min-w-[17vw] lg:min-w-[20vw] break-all flex justify-center'>{item.username}</li>
                <li className='text-sm text-black min-w-[21vw] lg:min-w-[16vw] break-all flex justify-center'>{item.password}</li>
                <li className='text-sm text-black min-w-[15vw] lg:min-w-[20vw] flex justify-center gap-2'>
                  <FaEdit onClick={() => handleEdit(item.id)} className='cursor-pointer hover:scale-115 transition-all duration-300' />
                  <MdDelete onClick={() => handleDelete(item.id)} className='cursor-pointer hover:scale-115 transition-all duration-300' />
                  <IoCopy onClick={() => handleCopy(item)} className='cursor-pointer hover:scale-115 transition-all duration-300'/>
                </li>
              </ul>
            </div>
          })}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
