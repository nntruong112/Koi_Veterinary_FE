// import React, {useContext, useEffect} from 'react'
// import { useParams } from 'react-router-dom'
// import { AppContext} from '../context/AppContext'

// const Appointment = () => {

//     const {vetID} = useParams()
//     const {vet} = useContext(AppContext)

//     const [vetInfo,setVetInfo]
//     const fetchVetInfo = async () => {
//         const vetInfo = vet.find(doc => vet._id === vetID)
//         setVetInfo(vetInfo)
//         console.log(vetInfo);
        
//     }
//     useEffect(()=>{
//         fetchVetInfo()
//     }   
//     ),[vetInfo,vetID]

// return vetInfo(
// <div>
//     {/* doc details */}
//     <div>
//         <img src={vetInfo.img} alt=''/>
//     </div>
//     <div>
//         {/* vet info */}
//         <p>{vetInfo.name} <img src={} /></p>
//         <div>
//             <button>{docInfo.experience}</button>
//         </div>
//         <div>
//             <p>About</p>
//             <p>{vetInfo.about}</p>

//         </div>
//     </div>
// </div>
// )
// }

