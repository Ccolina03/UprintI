
import Image from "next/image"

export default function AddOn() {
  return (
    <div className="bg-black" id="bonus">
      <div className="text-7xl text-center mb-16 font-bold">
        +
      </div>
      <div className="max-w-2xl mx-auto pb-12 pt-12 px-4 sm:px-6 lg:max-w-7xl lg:px-8 border-2 border-black  border-dashed rounded-3xl">
        <div className="lg:text-center pb-8">
          <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 font-bold tracking-wide uppercase">FOR A LIMITED TIME</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold  bg-gradient-to-r from-green-600 via-yellow-200 to-red-400 inline-block text-transparent bg-clip-text sm:text-4xl">
            One Dollar Products!!
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-100 lg:mx-auto">
            Great opportunity to get your kid a small distraction 
          </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-2 xl:gap-x-8">
          <div className="">
            <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/../public/images/espacio2.jpg"
                  alt="Espacio"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="mt-4">
              <span className="text-2xl text-white line-through ">$5</span><span className="mt-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400 font-semibold"> Just $1</span>
            </p>
            <h3 className="mt-4 text-xl font-bold text-gray-300">Kung Fu Panda</h3>
            <p className="mt-1 text-sm text-gray-400">Our favorite panda is back in the market, but this time with his marvelous costume. Limited quantity! 
            </p>

          </div>
          <div className="">
            <div className="w-full bg-gray-200 rounded-3xl overflow-hidden">
              <div className="relative h-72">
                <Image
                  src="/../public/images/espacio.webp"
                  alt="espacio"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            <p className="mt-4">
              <span className="text-2xl text-white line-through">$5</span><span className="mt-4 text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-red-400 font-semibold"> Just $1</span>
            </p>
            <h3 className="mt-4 text-xl font-bold text-gray-300"> Gohan SSJ 2 </h3>
            <p className="mt-1 text-sm text-gray-400">The famous Dragon Ball Z character is back! Get this small, but powerful character with special features for less than a Tim Hortons Coffee  </p>
          </div>
        </div>
        <div className="mt-6 md:mt-12 flex justify-center">
          <div className="rounded-md shadow w-full md:w-1/3">
            <a
              href=""
              className="flex items-center text-center justify-center px-5 py-3 text-xl rounded-md text-white bg-gradient-to-r from-blue-400 to-pink-500 font-bold hover:from-indigo-500 hover:to-pink-600"
            >
              Just one click away!!
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}