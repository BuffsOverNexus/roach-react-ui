import { Dropdown } from "primereact/dropdown";

interface PaginationControlProps {
    value: number;
    onChange: (rows: number) => void;
    options?: number[];
    disabled?: boolean;
    label?: string;
}

function PaginationControl({ 
    value, 
    onChange, 
    options = [5, 10, 15, 25, 50],
    disabled = false,
    label = "Rows per page:"
}: PaginationControlProps) {
    const dropdownOptions = options.map(option => ({
        label: option.toString(),
        value: option
    }));

    return (
        <div className="flex items-center gap-2">
            <span className="text-sm">{label}</span>
            <Dropdown
                value={value}
                options={dropdownOptions}
                onChange={(e) => onChange(e.value)}
                className="w-20"
                disabled={disabled}
            />
        </div>
    );
}

export default PaginationControl;