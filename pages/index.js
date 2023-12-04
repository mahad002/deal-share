import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import {motion} from 'framer-motion';

export default function Home() {
  const {data: session} = useSession();
  // if(!session) return; 
  console.log({session});
  return (
    <Layout>
      <div className=" flex text-blue-900 justify-between">
        <h2>Hello!, <b>{session?.user?.name}</b></h2>
        <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
          <img className="w-6 h-6" src={session?.user?.image} alt= "img"/>
          <span className="px-2">
            {session?.user?.name}
          </span>
        </div>
      </div>
    </Layout>
  );
}
