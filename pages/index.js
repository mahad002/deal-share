import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from 'next/image';
import {motion} from 'framer-motion';
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const {data: session} = useSession();
  // if(!session) return; 
  console.log({session});
  console.log("Email:", session?.user?.email);
  

  const fetchStore = async () =>{
    if(session?.user){
      const {email} = session?.user;
      console.log(email)
      const res = await axios.get(`/api/user`);
      console.log(res?.data);

      if(res.data === false){
        console.log("No store found");
        const data = {
          store: "",
          description: "",
          bannerImage: "",
          storeImage: "",
          isAdmin: false
        }
        const res1 = await axios.post(`/api/user`, data);
        console.log(res1?.data);
      }
      else{
        console.log("Store found");
      }
    }
  }

  useEffect(()=>{
    fetchStore();
  },[session])

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
