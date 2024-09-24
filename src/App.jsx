import { useEffect, useState } from "react"
import Footer from "./components/Footer"
import Shru from "./components/Shru"
import SideBar from "./components/SideBar"

function App() {
  const[data,setData]=useState(null)
  const[loading,setLoading]=useState(false)
const[showModal,setShowModal]=useState(false);
function handleToggleModal(){
  setShowModal(!showModal)
}
useEffect(()=>{
  async function fetchAPIData() {
    const NASA_KEY=import.meta.env.VITE_NASA_API_KEY
    const url='https://api.nasa.gov/planetary/apod'+ `?api_key=${NASA_KEY}`
    //cache info so that api limit do not exceed
     const today=(new Date()).toDateString()
     const localKey=`NASA-${today}`
     if(localStorage.getItem(localKey)){
       const apiData=JSON.parse(localStorage.getItem(localKey))
       console.log('fetched from cache today')
       setData(apiData)
       return
     }
     localStorage.clear()
    try{
const res=await fetch(url)
const apiData=await res.json()
 localStorage.setItem(localKey,JSON.stringify(apiData))
setData(apiData)
console.log('DATA\n',apiData)
console.log('fetched from api today')
    }catch(err){
      console.log(err.message)
    }
  }
  fetchAPIData()
},[])
  return (
    <>
    { data?<Shru data={data}/>:(
      <div className="loadingState">
        <i className="fa-solid fa-gear"></i>
      </div>
    )}
     {showModal &&( <SideBar data={data}  handleToggleModal={handleToggleModal}/>)}       {/*only if showmodal is true we render the sidebar */}
     {data&&(<Footer data={data}handleToggleModal={handleToggleModal}/>)}
    </>
  )
}

export default App
