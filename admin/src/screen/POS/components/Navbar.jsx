import { useContext } from "react"
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
export const NavbarPos = () => {
    const back = useNavigate()  
    return (
        
        <div className={`flex text-white justify-between items-center h-[75px] w-full`}>
            
            <div className='mx-2 items-center gap-4 cursor-pointer'>
                <h4 className='font-bold text-base'>Point Of Sale</h4>
                
            </div>
            <div className= {` items-center gap-4 cursor-pointer`}>
               <AiOutlineArrowRight className="mt-2 me-5"/>
                
            </div>
            
            
        </div>

        
        
            
        
    )

    
}