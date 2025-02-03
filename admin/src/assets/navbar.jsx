import { useContext } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { navContext } from "../App2"
import { useNavigate } from "react-router-dom"
import iLogout from "../assets/iLogout.svg"
import iBack from "../assets/iBack.svg"
import iSortir from "../assets/iSortir.svg"
export const Navbar = () => {
    const { nav, sort } = useContext(navContext)
    const back = useNavigate()  
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
               {nav=='home'?<></>:<button onClick={()=>{back(-1)}}><img src={iSortir} className="mt-2"/></button>}
            </div>
            
            
        </div>

        
        
            
        
    )
}