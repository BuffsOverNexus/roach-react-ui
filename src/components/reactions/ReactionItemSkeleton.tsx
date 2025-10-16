import { Skeleton } from "primereact/skeleton";

function ReactionItemSkeleton() {
    return (
        <tr>
            {/* ID Column */}
            <td>
                <Skeleton width="2rem" height="1.25rem" />
            </td>
            
            {/* Emote Column */}
            <td>
                <div className="flex items-center gap-2">
                    <Skeleton shape="circle" size="2rem" />
                    <Skeleton width="6rem" height="1.25rem" />
                </div>
            </td>
            
            {/* Role Column */}
            <td>
                <Skeleton width="8rem" height="1.25rem" />
            </td>
            
            {/* Channel Column */}
            <td>
                <Skeleton width="7rem" height="1.25rem" />
            </td>
            
            {/* Message ID Column */}
            <td>
                <Skeleton width="10rem" height="1.25rem" />
            </td>
            
            {/* Actions Column */}
            <td>
                <div className="flex gap-1">
                    <Skeleton width="2rem" height="2rem" />
                    <Skeleton width="2rem" height="2rem" />
                </div>
            </td>
        </tr>
    );
}

export default ReactionItemSkeleton;