import { Message } from "primereact/message";

function DiscordsDataViewHeader() {
  return (
    <div className="text-left">
      <div className="text-2xl">Your Discords</div>
      <div className="italic text-sm">Note: You must be the owner or have administrator role to setup a Discord.</div>
    </div>
  );
}

export default DiscordsDataViewHeader;