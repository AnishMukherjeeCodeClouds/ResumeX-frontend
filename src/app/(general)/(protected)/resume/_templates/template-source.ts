import { ClassicTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/ClassicTemplate";
import { ElegantTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/ElegantTemplate";
import { HybridTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/HybridTemplate";
import { ModernTemplateReact } from "@/app/(general)/(protected)/resume/_templates/components/ModernTemplate";
import { ClassicTemplateReactPDF } from "@/app/(general)/(protected)/resume/_templates/react-pdf/ClassicTemplate";
import { ElegantTemplateReactPDF } from "@/app/(general)/(protected)/resume/_templates/react-pdf/ElegantTemplate";
import { ModernTemplateReactPDF } from "@/app/(general)/(protected)/resume/_templates/react-pdf/ModernTemplate";

export const templates = {
  Classic: ClassicTemplateReact,
  Modern: ModernTemplateReact,
  Elegant: ElegantTemplateReact,
  Hybrid: HybridTemplateReact,
} as const;

export const templatesPDF = {
  Classic: ClassicTemplateReactPDF,
  Modern: ModernTemplateReactPDF,
  Elegant: ElegantTemplateReactPDF,
  // Hybrid: HybridTemplateReact,
} as const;
