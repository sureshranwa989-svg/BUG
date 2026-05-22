export default function EmptyState({
  title,
  subtitle,
  buttonText,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">

      {/* Title */}
      <h2 className="text-4xl font-light">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 mt-4 max-w-md leading-7">
        {subtitle}
      </p>

      {/* Button */}
      <button className="mt-8 bg-black text-white px-8 py-4 uppercase tracking-[3px] hover:bg-gray-900 transition">

        {buttonText}

      </button>

    </div>
  );
}