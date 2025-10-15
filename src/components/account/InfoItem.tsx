interface InfoItemProps {
    label: string;
    value: string | React.ReactNode;
    icon?: string;
}

function InfoItem({ label, value, icon }: InfoItemProps) {
    return (
        <div className="flex justify-between items-center py-3">
            <div className="flex items-center gap-2">
                {icon && <i className={`${icon} text-primary`} />}
                <span className="font-medium">{label}</span>
            </div>
            <div className="font-semibold">{value}</div>
        </div>
    );
}

export default InfoItem;