import Navbar from "@/components/Navbar";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const { data: session } = useSession();
  console.log("Session", session);
  
  if(!session) {
    return (
    <div className={'bg-blue-900 w-screen h-screen flex items-center'}>
      <div className={'text-center w-full'}>
        <button onClick={() => signIn()} className={'bg-white p-2 px-4 rounded-lg'}>Login with Google</button>
      </div>
    </div>
  );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Navbar/>
      <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4">
        {children}
      </div>
    </div>
  )
}
