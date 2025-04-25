import { wpquery } from "@src/data/wordpress";

/**
 * Fetch menu data by menu ID.
 *
 * @param {string} menuID ID of the menu.
 *
 * @return {Object} The response data.
 */
export const fetchMenuData = async (menuID) => {
  const data = await wpquery({
    query: `
            query GET_MENU_BY_NAME {
                menu(id:"${menuID}", idType: NAME) {
                    menuItems {
                    nodes {
                      id
                      parentId
                      path
                      label
                    }
                    }
                }
                }
            `,
  });

  return data;
};
