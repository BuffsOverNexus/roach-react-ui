import { Dialog } from "primereact/dialog";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

interface ChannelSelectionDialogProps {
    visible: boolean;
    channels: any[];
    selectedChannelId: string;
    updating: boolean;
    onHide: () => void;
    onChannelChange: (channelId: string) => void;
    onUpdate: () => void;
}

function ChannelSelectionDialog({
    visible,
    channels,
    selectedChannelId,
    updating,
    onHide,
    onChannelChange,
    onUpdate
}: ChannelSelectionDialogProps) {
    return (
        <Dialog
            header="Select Channel"
            visible={visible}
            style={{ width: '400px' }}
            onHide={onHide}
            closable={true}
            modal={true}
            className="p-fluid"
        >
            <div className="flex flex-col gap-4">
                <div className="field">
                    <label htmlFor="channelSelect" className="block mb-2 font-medium">
                        Channel *
                    </label>
                    <Dropdown
                        id="channelSelect"
                        value={selectedChannelId}
                        onChange={(e) => onChannelChange(e.value)}
                        options={channels}
                        optionLabel="name"
                        optionValue="id"
                        placeholder="Select a channel..."
                        className="w-full"
                        disabled={updating}
                    />
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        label="Cancel"
                        severity="secondary"
                        onClick={onHide}
                        disabled={updating}
                    />
                    <Button
                        label="Update"
                        icon="pi pi-check"
                        onClick={onUpdate}
                        loading={updating}
                        disabled={!selectedChannelId || updating}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default ChannelSelectionDialog;