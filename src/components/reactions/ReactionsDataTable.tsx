import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { EmptyState } from "@/components/common";
import ReactionItemSkeleton from "./ReactionItemSkeleton";
import type { Reaction } from "@/types/models";
import type { DiscordEmote } from "@/types/api";

interface ReactionsDataTableProps {
    reactions: Reaction[];
    emotes: DiscordEmote[];
    loading: boolean;
    rolesLoading: boolean;
    emotesLoading: boolean;
    rows: number;
    searchValue: string;
    onDelete: (reactionId: number) => void;
}

function ReactionsDataTable({
    reactions,
    emotes,
    loading,
    rolesLoading,
    emotesLoading,
    rows,
    searchValue,
    onDelete
}: ReactionsDataTableProps) {
    // Filter reactions based on search
    const filteredReactions = reactions.filter(reaction =>
        reaction.roleName.toLowerCase().includes(searchValue.toLowerCase())
    );

    // Column templates for DataTable
    const emoteTemplate = (rowData: Reaction) => {
        const emote = emotes.find(e => e.id === rowData.emoteId);
        
        return (
            <div className="flex items-center justify-center">
                {emote ? (
                    <Avatar 
                        image={emote.image} 
                        size="large"
                        shape="circle"
                        title={emote.name}
                    />
                ) : (
                    <Avatar 
                        icon="pi pi-image" 
                        size="large"
                        shape="circle"
                        className="bg-surface-100 text-surface-500"
                        title="Emote not found"
                    />
                )}
            </div>
        );
    };

    const roleNameTemplate = (rowData: Reaction) => {
        return <span>{rowData.roleName}</span>;
    };

    const dateTemplate = (rowData: Reaction) => {
        return (
            <span className="text-color-secondary italic">
                {new Date(rowData.createdAt).toLocaleDateString()}
            </span>
        );
    };

    const actionTemplate = (rowData: Reaction) => {
        return (
            <Button
                icon="pi pi-trash"
                severity="danger"
                size="small"
                outlined
                disabled={loading}
                onClick={() => onDelete(rowData.id)}
                tooltip="Remove this reaction role"
            />
        );
    };

    // Show skeleton while loading
    if (loading || emotesLoading || rolesLoading) {
        return (
            <div className="border border-surface-200 rounded-lg overflow-hidden">
                <table className="w-full">
                    <thead className="bg-surface-50 border-b border-surface-200">
                        <tr>
                            <th className="p-3 text-left font-semibold text-surface-700" style={{ width: '100px' }}>Emote</th>
                            <th className="p-3 text-left font-semibold text-surface-700">Role Name</th>
                            <th className="p-3 text-left font-semibold text-surface-700" style={{ width: '150px' }}>Created</th>
                            <th className="p-3 text-left font-semibold text-surface-700" style={{ width: '100px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.from({ length: rows }, (_, index) => (
                            <ReactionItemSkeleton key={`skeleton-${index}`} />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    // Show empty states
    if (!loading && filteredReactions.length === 0 && searchValue) {
        return (
            <EmptyState
                message={`No reaction roles found matching "${searchValue}"`}
                severity="info"
            />
        );
    }

    if (!loading && reactions.length === 0) {
        return (
            <EmptyState
                message="No reaction roles configured. Add your first reaction role to get started!"
                severity="info"
            />
        );
    }

    return (
        <DataTable
            value={filteredReactions}
            loading={false}
            paginator={filteredReactions.length > rows}
            rows={rows}
            emptyMessage="No reaction roles found"
            stripedRows
            showGridlines={false}
            sortMode="multiple"
            removableSort
        >
            <Column 
                field="emoteId" 
                header="Emote" 
                body={emoteTemplate}
                style={{ width: '100px' }}
            />
            <Column 
                field="roleName" 
                header="Role Name" 
                body={roleNameTemplate}
                sortable
            />
            <Column 
                field="createdAt" 
                header="Created" 
                body={dateTemplate}
                style={{ width: '150px' }}
                sortable
            />
            <Column 
                header="Actions" 
                body={actionTemplate}
                style={{ width: '100px' }}
            />
        </DataTable>
    );
}

export default ReactionsDataTable;