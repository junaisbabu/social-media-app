import SavedList from "@/components/sections/center/post/saved-list";

export default function Saved() {
  return (
    <div className="h-full w-6/12 flex-1 rounded-xl overflow-y-auto flex flex-col flex-nowrap space-y-6 pb-14 no-scrollbar">
      <SavedList />
    </div>
  );
}
