import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message as PrimeMessage } from "primereact/message";

interface EditSubjectDialogProps {
    visible: boolean;
    subject: string;
    updating: boolean;
    touched: boolean;
    onHide: () => void;
    onSubjectChange: (value: string) => void;
    onSubjectBlur: () => void;
    onSave: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

function EditSubjectDialog({
    visible,
    subject,
    updating,
    touched,
    onHide,
    onSubjectChange,
    onSubjectBlur,
    onSave,
    onKeyDown
}: EditSubjectDialogProps) {
    const isSubjectValid = subject.trim().length >= 10;
    const shouldShowError = touched && !isSubjectValid;
    
    const getErrorMessage = () => {
        if (!touched) return '';
        if (subject.trim().length === 0) return 'Message subject is required';
        if (subject.trim().length < 10) return 'Message subject must be at least 10 characters';
        return '';
    };

    return (
        <Dialog
            header="Edit Subject"
            visible={visible}
            style={{ width: '500px' }}
            onHide={onHide}
            closable={true}
            modal={true}
            className="p-fluid"
        >
            <div className="flex flex-col gap-4">
                <div className="field">
                    <label htmlFor="editSubject" className="block mb-2 font-medium">
                        Subject *
                    </label>
                    <InputText
                        id="editSubject"
                        value={subject}
                        onChange={(e) => onSubjectChange(e.target.value)}
                        onBlur={onSubjectBlur}
                        placeholder="Enter message subject (minimum 10 characters)..."
                        className={`w-full ${shouldShowError ? 'p-invalid' : ''}`}
                        disabled={updating}
                        invalid={shouldShowError}
                        onKeyDown={onKeyDown}
                    />
                    {shouldShowError && (
                        <PrimeMessage 
                            severity="error" 
                            text={getErrorMessage()}
                            className="mt-2"
                        />
                    )}
                    {!shouldShowError && subject.length > 0 && (
                        <small className="text-gray-500 mt-1 block">
                            {subject.trim().length}/10 characters minimum
                        </small>
                    )}
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                    <Button
                        label="Cancel"
                        severity="secondary"
                        onClick={onHide}
                        disabled={updating}
                    />
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={onSave}
                        loading={updating}
                        disabled={!isSubjectValid || updating}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default EditSubjectDialog;