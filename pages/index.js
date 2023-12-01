import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
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
    <div>
      Signed in as {session.user.email} <br/>
    </div>
  )
}
