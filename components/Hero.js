import Link from "next/dist/client/link";

//Main Homepage (top of Products List)
export default function Hero() {
  return (
    <div className="my-48 mx-auto px-4 max-w-7xl sm:mt-24 md:mt-72 text-center">
      <h1 className=" text-gray-900 font-extrabold">
        <p className="text-xl sm:text-3xl md:text-4xl">UPrintI </p>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-red-text-4xl sm:text-6xl md:text-7xl"> eCommerce store</p>
      </h1>
      <h2 className="mt-3 max-w-md mx-auto text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-x-3xl">
        Make the Next step
      </h2>
      <div className="mt-5 max-w-md mx-auto justify-center flex items-center md:mt-8"></div>
        <Link href='/products/player-ready'>
            <a className="inline-flex justify-center items-center h-12 px-6 mr-6 py-3 font-medium border-transparent rounded-md bg-gray-900 hover:bg-gray-900 text-white">
            Buy Now
            </a>
    
        </Link >
        <Link href="#second-section">
            <a className="items-center inline-flex font-semibold text-gray-900 hover:text-gray-700">
                Explore
            </a>
       
        </Link>
    </div>
  )
}
