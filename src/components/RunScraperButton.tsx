"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button, buttonVariants } from "./ui/button";

const RunScraperButton = () => {
    const router = useRouter();
    const handleClick = () => {
        router.refresh()
        router.push(`book-scraper/?runScraperButton=${true}`);
    }
  return (
    <div>
        <Button onClick={handleClick}>
            Run Scraper
        </Button>
    </div>
  )
}

export default RunScraperButton