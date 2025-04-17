export function findCategory(categories, queryMethod = []) {
  return (
    queryMethod.find((category) => category.databaseId == categories)?.posts ||
    []
  );
}
