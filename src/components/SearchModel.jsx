import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchModal({
  isOpen,
  onClose,
}) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  if (!isOpen) return null;

  const submitSearch = (event) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      onClose();
    }
  };

  const quickSearch = (value) => {
    navigate(`/search?q=${encodeURIComponent(value)}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-white">
      <div className="flex items-center justify-between border-b px-6 py-6 md:px-10">
        <h2 className="text-3xl font-light">Search</h2>
        <button onClick={onClose} aria-label="Close search">
          <X size={30} />
        </button>
      </div>

      <form onSubmit={submitSearch} className="px-6 py-10 md:px-10">
        <div className="flex items-center gap-4 border-b py-4">
          <Search size={28} />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full text-2xl outline-none"
            autoFocus
          />
        </div>
      </form>

      <div className="px-6 md:px-10">
        <p className="mb-6 text-sm uppercase tracking-[3px] text-gray-500">
          Trending Searches
        </p>

        <div className="flex flex-wrap gap-4">
          {["Hoodies", "Jackets", "Oversized Tees", "Dresses", "Shirts"].map((item) => (
            <button
              key={item}
              onClick={() => quickSearch(item)}
              className="rounded-full border px-5 py-2 transition hover:bg-black hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
