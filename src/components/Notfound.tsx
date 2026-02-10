
import notFound from "../assets/tomato.png"

export const Notfound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-20 bg-amber-200">
      <h1 className="font-pro text-6xl font-semibold">Oops, this page coulden't be found</h1>
      <span className="flex items-center text-sprout-red text-8xl font-extrabold font-pro">4 <img src={notFound} alt="404" width={125} /> 4 </span>
      <button className="bg-sprout-red text-white p-2 rounded-lg font-semibold text-xl cursor-pointer">HomePage</button>
    </div>
  )
}
