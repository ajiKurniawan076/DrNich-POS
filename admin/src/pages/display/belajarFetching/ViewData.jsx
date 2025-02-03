
import { data } from "autoprefixer"
import axios from "axios"
import { useState, useEffect } from "react"


const ViewData = () => {
    const [datax, setdatax] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://api.drnich.co.id/api/pos/user/pelanggan').then(
                (response) => setdatax(response.data)
            )
        }
        fetchData()
    }, [])


    console.log(datax)

    return (
        <div className="flex flex-col px-5 py-3 gap-1 bg-white w-full h-full">
            <h1>Belajar fetching data</h1>

            {
                datax.map((data, i) => (
                    <div className="flex flex-col items-center m-3 gap-2 border rounded-lg shadow-lg" key={i}>
                        <ul className="m-2">
                            <li>{data.namaPelanggan}</li>
                            <li>{data.nomorTelepon}</li>
                            <li>{data.alamat}</li>
                        </ul>
                    </div>
                ))
            }


        </div >
    )
}

export default ViewData