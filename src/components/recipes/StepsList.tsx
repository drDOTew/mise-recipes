import { StepRow } from "./StepRow";
import type { Step } from "@/lib/types";

interface StepsListProps {
  steps: Step[];
}

export function StepsList({ steps }: StepsListProps) {
  return (
    <div>
      <h3 className="font-heading text-lg mb-4">Pasos</h3>
      <ol className="space-y-4">
        {steps.map((step, index) => (
          <StepRow key={`${step.id}-${index}`} step={step} index={index} />
        ))}
      </ol>
    </div>
  );
}