import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";

function ProfileSkeleton() {
    return (
        <Card className="p-6">
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <Skeleton shape="circle" size="6rem" />
                    <div className="space-y-2">
                        <Skeleton width="12rem" height="2rem" />
                        <Skeleton width="8rem" height="1.5rem" />
                    </div>
                </div>
                <div className="space-y-4">
                    {Array.from({ length: 6 }, (_, i) => (
                        <div key={i} className="flex justify-between items-center">
                            <Skeleton width="8rem" height="1.5rem" />
                            <Skeleton width="10rem" height="1.5rem" />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default ProfileSkeleton;