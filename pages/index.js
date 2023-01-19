import { useSession, signIn } from 'next-auth/react';
import Navbar from '../components/navbar/Navbar'
import AppPage from '../components/home/AppPage'


// const router = useRouter()

export default function Home() {

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      signIn('cognito', { callbackUrl: "/" });
    },
  })

  
  return (
    <div >
      <Navbar/>
      <AppPage/>
    </div>
  )
}


