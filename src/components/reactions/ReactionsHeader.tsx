import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";

interface ReactionsHeaderProps {
    loading: boolean;
    reactionsCount: number;
    onCreate: () => void;
    onPublish: () => void;
}

function ReactionsHeader({ loading, reactionsCount, onCreate, onPublish }: ReactionsHeaderProps) {
    if (loading) {
        return (
            <div className="flex justify-between items-center mb-6">
                <div>
                    <Skeleton width="16rem" height="2rem" className="mb-2" />
                </div>
                <div className="flex gap-2">
                    <Skeleton width="8rem" height="2.5rem" />
                    <Skeleton width="10rem" height="2.5rem" />
                </div>
            </div>
        );
    }

    return (
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-2xl font-bold">Reaction Roles</h1>
            </div>
            <div className="flex gap-2">
                <Button
                    label="Publish"
                    icon="pi pi-discord"
                    severity="info"
                    onClick={onPublish}
                    disabled={loading || reactionsCount === 0}
                    tooltip="Publish all reaction roles to Discord"
                />
                <Button
                    label="Add Reaction"
                    icon="pi pi-plus"
                    severity="success"
                    onClick={onCreate}
                    disabled={loading}
                    tooltip="Create new reaction role"
                />
            </div>
        </div>
    );
}

export default ReactionsHeader;