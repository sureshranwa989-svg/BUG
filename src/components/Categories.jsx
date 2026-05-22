import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "Men",
    path: "/men",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 2,
    title: "Women",
    path: "/women",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
  },

  {
    id: 3,
    title: "New Arrivals",
    path: "/new",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Categories() {
  return (
    <div className="px-10 py-20">

      {/* Heading */}
      <div className="mb-12 text-center">

        <p className="uppercase tracking-[4px] text-sm text-gray-500">
          Explore Collections
        </p>

        <h2 className="text-4xl font-light mt-3">
          Shop By Category
        </h2>

      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {categories.map((category) => (
          <Link
            key={category.id}
            to={category.path}
            className="relative group overflow-hidden rounded-md cursor-pointer"
          >

            {/* Image */}
            <img
              src={category.image}
              alt={category.title}
              className="h-[500px] w-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20" />

            {/* Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

              <h3 className="text-4xl font-light">
                {category.title}
              </h3>

              <button className="mt-4 border border-white px-6 py-2 text-sm uppercase tracking-[3px] hover:bg-white hover:text-black transition">
                Shop Now
              </button>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
