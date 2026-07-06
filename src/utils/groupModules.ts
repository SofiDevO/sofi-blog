import type { Node3 } from "@src/types/LanguageDetail.type";

export function groupLessonsByModule(lessons: Node3[]): Record<string, Node3[]> {
  return (lessons || []).reduce((acc, curr) => {
    const moduleName = curr.moduleFields?.modulo || "Otros";
    if (!acc[moduleName]) {
      acc[moduleName] = [];
    }
    acc[moduleName].push(curr);
    return acc;
  }, {} as Record<string, Node3[]>);
}
