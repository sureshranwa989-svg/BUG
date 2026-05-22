export default function ProductSkeleton() {
  return (
    <div className="animate-pulse">

      {/* Image */}
      <div className="bg-gray-200 h-[450px] rounded-md" />

      {/* Text */}
      <div className="mt-4 space-y-3">

        <div className="h-4 bg-gray-200 rounded w-3/4" />

        <div className="h-4 bg-gray-200 rounded w-1/4" />

      </div>

    </div>
  );
}