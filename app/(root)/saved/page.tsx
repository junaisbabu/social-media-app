import SavedList from "@/components/sections/center/post/saved-list";

export default function Saved() {
  return (
    <div className="h-full w-full flex-1 rounded-xl overflow-y-auto flex flex-col flex-nowrap space-y-4 pb-14 no-scrollbar">
      <h1 className="font-medium text-lg">Saved Posts</h1>
      <SavedList />
    </div>
  );
}
