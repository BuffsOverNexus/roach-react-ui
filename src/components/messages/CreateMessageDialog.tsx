import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message as PrimeMessage } from "primereact/message";

interface CreateMessageDialogProps {
    visible: boolean;
    subject: string;
    submitting: boolean;
    touched: boolean;
    onHide: () => void;
    onSubjectChange: (value: string) => void;
    onSubjectBlur: () => void;
    onSubmit: () => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
}

function CreateMessageDialog({
    visible,
    subject,
    submitting,
    touched,
    onHide,
    onSubjectChange,
    onSubjectBlur,
    onSubmit,
    onKeyDown
}: CreateMessageDialogProps) {
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
            header="Create Category"
            visible={visible}
            style={{ width: '500px' }}
            onHide={onHide}
            closable={true}
            modal={true}
            className="p-fluid"
        >
            <div className="flex flex-col gap-4">
                <div className="field">
                    <label htmlFor="messageSubject" className="block mb-2 font-medium">
                        Subject *
                    </label>
                    <InputText
                        id="messageSubject"
                        value={subject}
                        onChange={(e) => onSubjectChange(e.target.value)}
                        onBlur={onSubjectBlur}
                        placeholder="Enter message subject (minimum 10 characters)..."
                        className={`w-full ${shouldShowError ? 'p-invalid' : ''}`}
                        disabled={submitting}
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
                        disabled={submitting}
                    />
                    <Button
                        label="Create Message"
                        icon="pi pi-check"
                        onClick={onSubmit}
                        loading={submitting}
                        disabled={!isSubjectValid || submitting}
                    />
                </div>
            </div>
        </Dialog>
    );
}

export default CreateMessageDialog;