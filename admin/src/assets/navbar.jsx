import { useContext, useEffect } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { navContext } from "../App2"
import { useNavigate } from "react-router-dom"
import iLogout from "../assets/iLogout.svg"
import iBack from "../assets/iBack.svg"
import iSortir from "../assets/iSortir.svg"
import iClose from "../assets/iClose.svg"
import axios from "axios"
import { toast, ToastContainer } from "react-toastify"
export const Navbar = () => {
    const { nav, sort, asc, setasc, showsort, setshowsort, link, ascP, setascP } = useContext(navContext)
    const back = useNavigate()  

    const klikasc =(e) => {
        e.preventDefault()
        setasc("asc")
        setascP('')
    }
    const klikascPoin = (e) => {
        e.preventDefault()
        setascP("ascP")
        setasc('')
    }
    const klikdescPoin =(e) => {
        e.preventDefault()
        setascP("descP")
        setasc('')
    }
    const klikdesc =(e) => {
        e.preventDefault()
        setasc("desc")
        setascP('')
    }

    const handleLogout = async(e) => {
        e.preventDefault()
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL_BACKEND}/api/pos/logout`);
            localStorage.removeItem("token"); // Remove token from storage
            toast.success('Berhasil Logout')
            setTimeout(()=>{
                window.location.href = "/";  // Redirect to login page
            },1000)
            
          } catch (error) {
            console.error("Logout failed:", error);
          }
    }
    return (
        <>
        <div className={`fixed flex z-30 start-50 top-0 max-w-[500px] w-[100%]  ${nav=='home'?'text-white md:w-[80%] md:max-w-[700px] lg:w-[60%]  lg:max-w-[900px] justify-between':'text-[#454545] justify-center md:w-[100%] md:max-w-[700px] lg:w-[100%]  lg:max-w-[900px] relative bg-white shadow-md'} items-center h-[75px] `}>
            <div className='mx-2 items-center gap-4 cursor-pointer'>
                {nav=='home'?
                <h4 className='pos-title'>Point Of Sale</h4>
                :
                <button onClick={(e)=>{e.preventDefault(); window.location.reload();}}><h4 className='font-medium text-[14px]'>{nav}</h4></button>
                }
            </div>
            <div className={` items-center gap-4 cursor-pointer ${nav!='home'?'absolute start-5':''}`}>
               {nav=='home'? <button onClick={handleLogout}><img src={iLogout} className="mt-2 me-5"/></button>:<button onClick={()=>{back(link)}}><img src={iBack} className="mt-2"/></button>}
            </div>
            <div className={`absolute items-center gap-4 cursor-pointer ${sort?'end-9':'hidden'}`}>
               {nav=='home'?<></>:<button onClick={()=>{setshowsort(true)}}><img src={iSortir} className="mt-2"/></button>}
            </div>
            <div className={`ps-[30px] pe-[32px] pt-[30px] pb-[48px] gap-[20px] rounded-t-2xl fixed bottom-0 bg-black/20 start-0 flex min-w-full min-h-screen ${showsort? "" : "hidden"}`}>
            <div className={`ps-[30px] pe-[32px] pt-[30px] pb-[48px] gap-[20px] rounded-t-2xl mt-auto bg-white mx-auto place-items-center min-w-[375px] min-h-[218px] h-fit grid `}>
                <div className="flex justify-between w-full">
                <label htmlFor="" className="text-[14px] text-[#454545]">Urut Berdasarkan </label>
                <button onClick={(e)=>{
                    e.preventDefault()
                    setshowsort(false)
                }}><img src={iClose}/></button>
                </div>
                <div className="flex gap-[10px] w-full justify-between">
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] ${asc == 'asc' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikasc}>A-Z</button>
                    
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] ${asc == 'desc' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikdesc}>Z-A</button>
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] ${ascP == 'ascP' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikascPoin}>Poin Terbanyak</button>
                </div>
                <div className="flex w-full justify-between">
                    
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] ${ascP == 'descP' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikdescPoin}>Poin Tersedikit</button>
                </div>
                </div>
            </div>
        </div>
        <ToastContainer/>
        </>

        
        
            
        
    )
}