import { useContext } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { navContext } from "../App2"
import { useNavigate } from "react-router-dom"
export const Navbar = () => {
    const {nav} = useContext(navContext)
    const back = useNavigate()  
    return (
        
        <div className={`flex ${nav=='home'?'text-white justify-between':'text-black justify-center relative bg-white border-b-2 border-black/30'} items-center h-[75px] w-full`}>
            
            <div className='mx-2 items-center gap-4 cursor-pointer'>
                {nav=='home'?
                <h4 className='font-bold text-base'>Point Of Sale</h4>
                :
                <h4 className='font-bold text-base'>{nav}</h4>
                }
            </div>
            <div className={` items-center gap-4 cursor-pointer ${nav!='home'?'absolute start-5':''}`}>
               {nav=='home'? <AiOutlineArrowRight className="mt-2 me-5"/>:<button onClick={()=>{back(-1)}}><AiOutlineArrowLeft className="mt-2"/></button>}
                
            </div>
            
            
        </div>

        
        
            
        
    )
}