import AddressBlock from "./AddressBlock";

export default function AddressDetails() {
  return (
    <div className="lg:col-span-2 bg-background border border-foreground/20 rounded-2xl p-4 md:p-6">
      <p className="font-medium text-lg mb-4">Address Details</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <AddressBlock title="Billing Address" />
        <AddressBlock title="Shipping Address" />
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <Info label="Order Placed by" value="Olivia S" />
        <Info label="Order Placed at" value="Customer Website" />
        <Info label="Order Delivered at" value="Doorstep" />
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-foreground/60">{label}</p>
      <p className="font-medium text-sm text-foreground">{value}</p>
    </div>
  );
}
