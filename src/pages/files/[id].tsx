import Image from "next/image"
import { useRouter } from 'next/router'

function Avatar() {
  const router = useRouter()
  const { id } = router.query
  

  return (
    <div style={{
      background:'white',
      display:'flex',
      flex:'1',
      height:'100vh',
      width:'100vw',
      alignItems:'center',
      justifyContent:'center'
    }}>

      <Image 
      src={`/uploads/${id}`} 
      alt="me" 
      width={500}
      height={500}
      />
    </div>
  )
}

export default Avatar