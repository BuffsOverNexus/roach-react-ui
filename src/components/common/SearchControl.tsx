import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";

interface SearchControlProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    disabled?: boolean;
}

function SearchControl({ 
    value, 
    onChange, 
    placeholder = "Search...", 
    className = "w-80",
    disabled = false 
}: SearchControlProps) {
    return (
        <IconField iconPosition="left">
            <InputIcon className="pi pi-search" />
            <InputText
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={className}
                disabled={disabled}
            />
        </IconField>
    );
}

export default SearchControl;