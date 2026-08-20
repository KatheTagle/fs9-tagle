import HeroImage from "../assets/hero_image.png";
import ProductList from "../components/Productlist";


function Hero({title}) {
  
  return (
    <>
      <section className="relative overflow-hidden bg-[#F8FAFC]">
        <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center gap-12 px-6 py-16 md:grid-cols-2 lg:px-8">
          {/* Left Content */}
          <div className="relative z-10">
            <span className="mb-5 inline-flex rounded-full bg-black px-4 py-2 text-sm font-medium text-white">
              Network Switches
            </span>

            <h1 className="max-w-xl text-5xl font-bold tracking-tight text-gray-950 md:text-6xl lg:text-7xl">
              Switch on the power of your network
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-8 text-gray-600">
              Your network needs to evolve to meet new demands. So do your switches.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-gray-950 px-8 py-4 text-base font-semibold text-white transition hover:bg-gray-800"
              >
                Shop Now
              </a>

              <a
                href="/collections"
                className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-950 transition hover:border-gray-950"
              >
                View Latest Devices
              </a>
            </div>

            {/* Stats */}
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div>
                <p className="text-2xl font-bold text-gray-950">20K+</p>
                <p className="mt-1 text-sm text-gray-500">Customers</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-950">500+</p>
                <p className="mt-1 text-sm text-gray-500">Products</p>
              </div>

              <div>
                <p className="text-2xl font-bold text-gray-950">4.9</p>
                <p className="mt-1 text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>

          {/* Right Image Area */}
          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-orange-200 blur-3xl" />
            <div className="absolute bottom-10 right-0 h-40 w-40 rounded-full bg-blue-200 blur-3xl" />

            <div className="relative mx-auto max-w-md rounded-[2rem] bg-white p-4 shadow-2xl md:max-w-lg">
              <div className="overflow-hidden rounded-[1.5rem] bg-gray-100">
                <img
                  src={HeroImage}
                  alt="Featured ecommerce product"
                  className="h-[480px] w-full object-cover"
                />
              </div>

              {/* Floating Card */}
              <div className="absolute -bottom-6 left-6 right-6 rounded-2xl bg-white p-5 shadow-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Featured Product</p>
                    <h3 className="mt-1 text-lg font-bold text-gray-950">
                      Premium Runner
                    </h3>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Starting at</p>
                    <p className="mt-1 text-lg font-bold text-gray-950">$89</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="pointer-events-none absolute right-0 top-0 -z-0 h-72 w-72 rounded-full bg-gray-200/60 blur-3xl" />
      </section>
        {/* Product List */}
       <ProductList showAll={false}/>
    </>
  );
}


export default Hero;