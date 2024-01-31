"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
const Homepage = () => {
    const [downloads, setDownloads] = useState<string>('');
    const [input, setInput] = useState<string>('');
  
    const getDownloads = async () => {
      try {
        console.log("User entered query:", input);
        const res = await fetch(`/api/getDownloads?url=${input}`);
        const { downloads } = await res.json();
        setDownloads(downloads);
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-52">
    <div className="flex flex-col items-center gap-6">
    <div className="flex flex-col items-center">
  <h1 className="text-[40px] font-bold text-center">Package WebScraper</h1>
  <p className="text-sm text-gray-800 text-center w-[500px]">
    Explore real-time download stats. Enter a package name, click &quot;Go,&quot; and get quick insights. Simplifying package popularity analysis!
  </p>
</div>



      <div className="flex flex-col sm:flex-row gap-4 sm:gap-2">
        <Input placeholder="Enter package name" value={input} onChange={(e) => setInput(e.target.value)} className="w-80 h-[46px] shadow-xl" />
        <Button className="px-[30px] py-[23px] shadow-2xl" onClick={getDownloads}>Go</Button>
      </div>
      {downloads && <p className="text-sm text-black">This package has {downloads} downloads.</p>}
    </div>
  </main>
  )
}

export default Homepage