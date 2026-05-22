export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 md:px-10 py-20">

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <h1 className="text-4xl font-serif">
            HYPE
          </h1>

          <p className="text-gray-400 mt-5 leading-7 text-sm">
            Premium fashion for modern lifestyle.
            Discover the latest trends with
            luxury streetwear aesthetics.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h3 className="uppercase tracking-[3px] text-sm mb-5">
            Shop
          </h3>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <a href="#">Men</a>
            <a href="#">Women</a>
            <a href="#">New Arrivals</a>
            <a href="#">Collections</a>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="uppercase tracking-[3px] text-sm mb-5">
            Support
          </h3>

          <div className="flex flex-col gap-3 text-gray-400 text-sm">
            <a href="#">Contact Us</a>
            <a href="#">Shipping</a>
            <a href="#">Returns</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>

        {/* Social */}
        <div>
          <h3 className="uppercase tracking-[3px] text-sm mb-5">
            Follow Us
          </h3>

          <div className="flex gap-5 text-gray-400 text-sm">

            <a
              href="#"
              className="hover:text-white transition"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Twitter
            </a>

            <a
              href="#"
              className="hover:text-white transition"
            >
              Github
            </a>

          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-16 pt-6 text-center text-gray-500 text-sm">
        © 2026 HYPE. All Rights Reserved.
      </div>

    </footer>
  );
}