import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";

function MessageItemSkeleton() {
    return (
        <Card>
            <div className="flex justify-between items-center gap-3">
                {/* Message content skeleton */}
                <div className="px-2 py-1">
                    <Skeleton height="1.5rem" width="12rem" />
                </div>

                {/* Action buttons skeleton */}
                <div className="flex gap-2">
                    <Skeleton height="2rem" width="8rem" />
                    <Skeleton height="2rem" width="5rem" />
                    <Skeleton height="2rem" width="5rem" />
                </div>
            </div>
        </Card>
    );
}

export default MessageItemSkeleton;