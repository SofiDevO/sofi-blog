import { wpquery } from "@src/data/wordpress";

export const fetchMenuData =
        await wpquery({
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
