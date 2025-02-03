import { AiOutlineArrowLeft } from "react-icons/ai"
import { useNavigate } from "react-router-dom"

export const NavbarPosActive = (props) => {
    const back = useNavigate()
    return(
        <div className={`flex relative text-white justify-center items-center h-[75px] w-full`}>
        
        <div className='mx-2 items-center gap-4 cursor-pointer'>
            <h4 className='font-bold text-base'>{props.Title}</h4>
            
        </div>
        <div className= {`absolute start-0 items-center gap-4 cursor-pointer`}>
        <button onClick={()=>{back(-1)}}><AiOutlineArrowLeft className="ms-3 me-5"/></button>
            
        </div>
        
        
    </div>
    )
}
