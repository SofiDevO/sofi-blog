import { wpquery } from "@src/data/wordpress";

export const getLogo = async () => {
    try {
        const data = await wpquery({
            query: `
                query getLogo {
                    allSettings {
                        generalSettingsDescription
                        generalSettingsTitle
                    }
                    siteLogo {
                        altText
                        link
                    }
                    }
            `,
        });
        return data;

    } catch (error) {
        console.log(error);
    }
};

const data = await getLogo();
export const logoItems =  {
    siteLogo: data.siteLogo.link,
    siteTitle: data.allSettings.generalSettingsTitle,
    siteSlogan: data.allSettings.generalSettingsDescription
  }
