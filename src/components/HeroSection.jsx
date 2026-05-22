export default function Hero() {
  return (
    <div className="w-full">

      {/* Hero Section */}
      <div className="relative h-[90vh] w-full overflow-hidden">

        {/* Background Image */}
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1600&auto=format&fit=crop"
          alt="Hero"
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">

          <p className="uppercase tracking-[6px] text-sm mb-4">
            New Collection 2026
          </p>

          <h1 className="text-5xl md:text-7xl font-light leading-tight max-w-4xl">
            Elevate Your Everyday Style
          </h1>

          <p className="mt-6 text-lg max-w-2xl text-gray-200">
            Discover premium fashion pieces designed for modern lifestyle.
          </p>

          <button className="mt-8 border border-white px-10 py-3 uppercase tracking-[3px] text-sm hover:bg-white hover:text-black transition duration-300">
            Shop Now
          </button>

        </div>
      </div>
    </div>
  );
}