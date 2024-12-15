import { wpquery } from "@src/data/wordpress";

export const fetchMenuData = async () => {
    try {
        const response = await wpquery({
            query: `
            query GET_MENU_BY_NAME {
                menu(id: "menu", idType: NAME) {
                    menuItems {
                        nodes {
                            url
                            label
                            parentId
                            id
                        }
                    }
                }
            }
            `,
        });
        return response;
    } catch (error) {
        console.error("Error fetching menu data:", error);
        return null;
    }
};
