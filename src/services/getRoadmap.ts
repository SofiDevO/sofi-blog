import { roadmapQuery } from "./querys/roadmap/roadmapQuery";

import { wpquery } from "@src/data/wordpress";
import type { Roadmap, RoadmapRoot } from "@src/types/roadmap.type";

export const getRoadmap: ()=> Promise<Roadmap> = async () => {
    const query = roadmapQuery;
    const data = await wpquery<RoadmapRoot["data"]>({ query });
    return data;
}
