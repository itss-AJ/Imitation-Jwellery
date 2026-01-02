const orderSteps = [
  { label: "Order Placed", date: "19 Dec 2025", completed: true },
  { label: "Order Confirmed", date: "19 Dec 2025", completed: true },
  { label: "Order Dispatched", completed: false },
  { label: "Out for Delivery", completed: false },
  { label: "Delivered", completed: false },
];

export default function OrderTracking() {
  return (
    <div className="border border-foreground/20 rounded-xl p-4 md:p-5 overflow-x-auto">
      <div className="relative min-w-[640px]">
        <div className="absolute top-4 left-0 right-0 h-[2px] bg-foreground/20" />
        <div className="absolute top-4 left-0 h-[2px] bg-brand" style={{ width: "40%" }} />

        <div className="relative z-10 flex justify-between">
          {orderSteps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center w-full">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm
                  ${step.completed
                    ? "bg-brand text-background"
                    : "bg-background border border-foreground/30"}`}
              >
                {step.completed ? "✓" : idx + 1}
              </div>

              <p className="mt-2 text-sm font-medium">{step.label}</p>
              {step.date && (
                <p className="text-xs text-foreground/60">{step.date}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
