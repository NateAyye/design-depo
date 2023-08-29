import { Skeleton } from "./ui/skeleton";

function ItemSkeletonList() {
  return new Array(20).fill(1).map((_, i) => (
    <div key={i} className="flex flex-col items-center">
      <Skeleton className="h-24 w-full rounded-md mb-0.5" />
      <div className="flex w-full justify-between items-center px-1 pt-1">
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="w-6 h-6" />
      </div>
    </div>
  ))
}

export default ItemSkeletonList