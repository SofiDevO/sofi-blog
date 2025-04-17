/**
 * This utility file contains functions to transform a flat list of menu items
 * into a hierarchical (tree) structure for creating nested menus
 */

/**
 * Extracts the last part of a URL to use as a slug
 * Example: "https://example.com/blog/post-1" -> "post-1"
 * @param {string} url - The full URL to process
 * @returns {string} The extracted slug
 */
function getSlug(url) {
  // Remove trailing slash if present
  const urlWithoutTrailingSlash = url.endsWith("/") ? url.slice(0, -1) : url;
  // Split URL into parts and get the last segment
  const parts = urlWithoutTrailingSlash.split("/");
  return parts[parts.length - 1];
}

/**
 * Transforms a flat array of items into a hierarchical tree structure
 * @param {Array} data - Array of items to transform
 * @param {Object} options - Configuration options
 * @param {string} options.idKey - The property name for the item's ID (default: "id")
 * @param {string} options.parentKey - The property name for the parent ID (default: "parentId")
 * @param {string} options.childrenKey - The property name for children array (default: "children")
 * @returns {Array} Tree structure of the data
 */
const flatListToHierarchical = (
  data = [],
  { idKey = "id", parentKey = "parentId", childrenKey = "children" } = {}
) => {
  // Initialize the result tree array
  const tree = [];
  // Object to store parent-child relationships
  const childrenOf = {};

  // Process each item in the input data
  data.forEach((item) => {
    // Create new item with slug from URL
    const newItem = { ...item, slug: getSlug(item.url) };

    // Extract ID and parentId (default to 0 if no parent)
    const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;

    // Initialize children array for this item
    childrenOf[id] = childrenOf[id] || [];
    newItem[childrenKey] = childrenOf[id];

    // Add item to its parent's children array or to root if no parent
    parentId
      ? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
      : tree.push(newItem);
  });

  return tree;
};

export {
  flatListToHierarchical
}