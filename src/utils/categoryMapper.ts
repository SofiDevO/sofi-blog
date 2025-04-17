interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  databaseId: number;
}

interface CategoryMap {
  [key: string]: number;
}

export const generateCategoryMap = ( categoryNodes: CategoryNode[]): CategoryMap => {
  return categoryNodes.reduce((map: CategoryMap, category) => {
    map[category.slug || category.name] = category.databaseId;
    return map;
  }, {});
};