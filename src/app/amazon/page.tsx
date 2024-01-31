// "use client"
// import Image from "next/image";
// import { FormEvent, useEffect, useState } from "react";

// type WSResults = {
// 	price: string;
// 	title: string;
// 	review: string;
// 	imageUrl: string;
// };

// const page = () => {
//   const [searchPrompt, setSearchPrompt] = useState("");
// 	const [searchResults, setSearchResults] = useState<WSResults[]>([]);
// 	const [isLoading, setIsLoading] = useState(false);

// 	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
// 		event.preventDefault();
// 		setIsLoading(true);

// 		const res = await fetch("../api/searchprod", {
// 			method: "POST",
// 			body: JSON.stringify({ searchPrompt }),
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 		});
// 		const { products } = await res.json();

// 		console.log(products);
// 		setSearchResults(products);
// 		console.log(searchResults);
// 		setSearchPrompt("");
// 		setIsLoading(false);
// 	};
//   return (
//     <main className=" max-w-5xl mx-auto flex flex-col mt-5  justify-center">
// 			<form
// 				onSubmit={handleSubmit}
// 				className="flex justify-center space-x-2 my-4"
// 			>
// 				<input
// 					value={searchPrompt}
// 					onChange={(e) => setSearchPrompt(e.target.value)}
// 					type="text"
// 					placeholder="Product to be searched..."
// 					className="px-2 bg-transparent border rounded-md text-black outline-none"
// 				/>
// 				<button
// 					disabled={searchPrompt === ""}
// 					className="bg-blue-500 text-black px-2 py-1 rounded-md disabled:bg-blue-500/40 disabled:cursor-not-allowed"
// 				>
// 					{isLoading ? "Searching..." : "Search"}
// 				</button>
// 			</form>

// 			{isLoading && <p className="text-black">Loading...</p>}

// 			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
// 				{searchResults?.map((prod, i) => (
// 					<div
// 						key={i}
// 						className="text-white bg-transparent border pb-2  rounded-lg"
// 					>
// 						<div className="relative h-[300px] w-full mb-3">
// 							<Image
// 								src={prod.imageUrl}
// 								alt={prod.title}
// 								fill
// 								className="object-cover rounded-lg"
// 							/>
// 						</div>
// 						<h1 className="truncate text-2xl">{prod.title}</h1>
						
// 						<div className="flex m-2 justify-between">
// 							<p>Reviews : {prod.review}</p>
// 							<p>Price : {prod.price}</p>
// 						</div>
// 					</div>
// 				))}
// 			</div>
// 		</main>
//   )
// }

// export default page
import React from 'react'

const page = () => {
  return (
	<div>page</div>
  )
}

export default page