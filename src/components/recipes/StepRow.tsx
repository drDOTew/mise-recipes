import { StepBadge } from "@/components/ui/StepBadge";
import type { Step } from "@/lib/types";

interface StepRowProps {
  step: Step;
  index: number;
}

export function StepRow({ step, index }: StepRowProps) {
  return (
    <li className="flex gap-3">
      <StepBadge number={index + 1} />
      <p className="flex-1 leading-relaxed pt-1">{step.body}</p>
    </li>
  );
}