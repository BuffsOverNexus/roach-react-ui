import { Skeleton } from "primereact/skeleton";

function DiscordItemSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      {/* Left side: Avatar and Name Skeleton */}
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" size="4rem" />
        <div className="flex items-center gap-2">
          <Skeleton width="8rem" height="1.5rem" />
          <Skeleton width="5rem" height="1.25rem" />
        </div>
      </div>

      {/* Right side: Action Button Skeleton */}
      <div>
        <Skeleton width="6rem" height="2.5rem" />
      </div>
    </div>
  );
}

export default DiscordItemSkeleton;
