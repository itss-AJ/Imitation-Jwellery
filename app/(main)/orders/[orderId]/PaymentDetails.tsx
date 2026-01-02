import CommonButton from "@/app/components/button/CommonButton";
import { Download } from "lucide-react";

export default function PaymentDetails() {
  return (
    <div className="bg-background border border-foreground/20 rounded-2xl p-4 md:p-6">
      <p className="font-medium text-lg mb-4">Payment Details</p>

      <div className="space-y-3 text-sm">
        <Row label="Item Subtotal (GST Included)" value="₹2,499" />
        <Row label="Delivery Charges" value="₹0" />
        <div className="border-t pt-3 flex justify-between font-medium">
          <span>Total Amount</span>
          <span>₹2,499</span>
        </div>
      </div>

      <CommonButton variant="secondaryBtn" className="mt-6 w-full">
        <Download size={16} className="mr-2" />
        Download Invoice
      </CommonButton>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
