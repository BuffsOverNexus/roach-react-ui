import type { ReactNode } from "react";
import { Dialog } from "primereact/dialog";

interface DialogContainerProps {
    visible: boolean;
    onHide: () => void;
    header: string;
    children: ReactNode;
    width?: string;
    modal?: boolean;
    className?: string;
    closable?: boolean;
}

function DialogContainer({
    visible,
    onHide,
    header,
    children,
    width = "32rem",
    modal = true,
    className = "p-fluid",
    closable = true
}: DialogContainerProps) {
    return (
        <Dialog
            header={header}
            visible={visible}
            style={{ width }}
            onHide={onHide}
            modal={modal}
            className={className}
            closable={closable}
        >
            {children}
        </Dialog>
    );
}

export default DialogContainer;