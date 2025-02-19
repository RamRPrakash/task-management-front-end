import { useLoadingStore } from "../store/useLoadingStore";

export default function Loader() {
  const { isLoading } = useLoadingStore();

  if (!isLoading) return null; // Don't show loader if not loading

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-30 z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}
