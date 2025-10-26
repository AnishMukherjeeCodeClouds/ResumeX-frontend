import { ClassicTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/ClassicTemplate";
import { ElegantTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/ElegantTemplate";
import { HybridTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/HybridTemplate";
import { ModernTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/ModernTemplate";

export const templates = {
  Classic: ClassicTemplateReact,
  Modern: ModernTemplateReact,
  Elegant: ElegantTemplateReact,
  Hybrid: HybridTemplateReact,
} as const;
