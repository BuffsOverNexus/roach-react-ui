import SearchControl from "./SearchControl";
import PaginationControl from "./PaginationControl";

interface PageControlsProps {
    searchValue: string;
    onSearchChange: (value: string) => void;
    searchPlaceholder?: string;
    rows: number;
    onRowsChange: (rows: number) => void;
    rowOptions?: number[];
    disabled?: boolean;
    children?: React.ReactNode;
}

function PageControls({ 
    searchValue, 
    onSearchChange, 
    searchPlaceholder,
    rows, 
    onRowsChange, 
    rowOptions,
    disabled = false,
    children 
}: PageControlsProps) {
    return (
        <div className="flex justify-between items-center mb-4 gap-4">
            <div className="flex items-center gap-2">
                <SearchControl
                    value={searchValue}
                    onChange={onSearchChange}
                    placeholder={searchPlaceholder}
                    disabled={disabled}
                />
                {children}
            </div>
            <PaginationControl
                value={rows}
                onChange={onRowsChange}
                options={rowOptions}
                disabled={disabled}
            />
        </div>
    );
}

export default PageControls;