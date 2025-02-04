import { useContext, useEffect } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { navContext } from "../App2"
import { useNavigate } from "react-router-dom"
import iLogout from "../assets/iLogout.svg"
import iBack from "../assets/iBack.svg"
import iSortir from "../assets/iSortir.svg"
import iClose from "../assets/iClose.svg"
export const Navbar = () => {
    const { nav, sort, asc, setasc, showsort, setshowsort } = useContext(navContext)
    const back = useNavigate()  

    const klikasc =(e) => {
        e.preventDefault()
        setasc("asc")
    }
    const klikascPoin = (e) => {
        e.preventDefault()
        setasc("ascP")
    }
    const klikdescPoin =(e) => {
        e.preventDefault()
        setasc("descP")
    }
    const klikdesc =(e) => {
        e.preventDefault()
        setasc("desc")
    }
    return (
        
        <div className={`flex ${nav=='home'?'text-white justify-between':'text-[#454545] justify-center relative bg-white shadow-md'} items-center h-[75px] w-full`}>
            
            <div className='mx-2 items-center gap-4 cursor-pointer'>
                {nav=='home'?
                <h4 className='pos-title'>Point Of Sale</h4>
                :
                <h4 className='font-medium text-[14px]'>{nav}</h4>
                }
            </div>
            <div className={` items-center gap-4 cursor-pointer ${nav!='home'?'absolute start-5':''}`}>
               {nav=='home'? <img src={iLogout} className="mt-2 me-5"/>:<button onClick={()=>{back(-1)}}><img src={iBack} className="mt-2"/></button>}
            </div>
            <div className={`absolute items-center gap-4 cursor-pointer ${sort?'end-9':'hidden'}`}>
               {nav=='home'?<></>:<button onClick={()=>{setshowsort(true)}}><img src={iSortir} className="mt-2"/></button>}
            </div>
            <div className={`ps-[30px] pe-[32px] pt-[30px] pb-[48px] gap-[20px] rounded-t-2xl fixed top-0 bg-black/20 start-0 flex min-w-full min-h-screen ${showsort? "" : "hidden"}`}>
            <div className={`ps-[30px] pe-[32px] pt-[30px] pb-[48px] gap-[20px] rounded-t-2xl mb-auto bg-white mx-auto place-items-center min-w-[375px] min-h-[218px] h-fit grid `}>
                <div className="flex justify-between w-full">
                <label htmlFor="" className="text-[14px] text-[#454545]">Urut Berdasarkan </label>
                <button onClick={(e)=>{
                    e.preventDefault()
                    setshowsort(false)
                }}><img src={iClose}/></button>
                </div>
                <div className="flex gap-[10px] w-full justify-between">
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] bg-white ${asc == 'asc' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikasc}>A-Z</button>
                    
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] bg-white ${asc == 'desc' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikdesc}>Z-A</button>
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] bg-white ${asc == 'ascP' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikascPoin}>Poin Terbanyak</button>
                </div>
                <div className="flex w-full justify-between">
                    
                    <button className={`border rounded-xl px-[20px] py-[10px] border-[#EAC564] bg-white ${asc == 'descP' ? 'bg-[#EAC564] text-white' : 'bg-white'}`} onClick={klikdescPoin}>Poin Tersedikit</button>
                </div>
                </div>
            </div>
            
        </div>

        
        
            
        
    )
}