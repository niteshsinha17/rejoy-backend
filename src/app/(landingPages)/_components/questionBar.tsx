// "use client"

// import { useState, useEffect } from "react"


export default function QuestionBar() {
  // const [placeholder, setPlaceholder] = useState("Search...")
  // useEffect(() => {
  //   const placeholders = ["Find what you need...", "Type your query here", "Search the web"]
  //   let currentIndex = 0
  //   const interval = setInterval(() => {
  //     setPlaceholder(placeholders[currentIndex])
  //     currentIndex = (currentIndex + 1) % placeholders.length
  //   }, 2000)
  //   return () => clearInterval(interval)
  // }, [])
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-4xl mx-4 md:mx-0">
        <div className="relative">
          <input
            type="search"
            placeholder=" Search anything about health..."
            className="w-full px-6 py-2 text-lg rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            
            
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:bg-muted/50 rounded-full"
          >
            <SearchIcon className="w-6 h-6" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}