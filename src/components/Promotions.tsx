import bg from '../assets/bg.jpg'
import offerImg from '../assets/offer.png'

const Promotions = () => {
    return (
        <div className="flex flex-col md:flex-row gap-5">
            <div className="bg-cover bg-center min-h-[280px] rounded-2xl mb-10 lg:w-[400px] shadow-sm" style={{ backgroundImage: `url(${offerImg})` }}></div>
            <div className="bg-cover bg-center min-h-[280px] rounded-2xl mb-10 w-full shadow-sm" style={{ backgroundImage: `url(${bg})` }}>
                <h1 className="text-6xl font-bold text-white text-left pt-10 px-5">Fresh food, fresh energy, fresh mindset.</h1>
            </div>
        </div>
    )
}

export default Promotions