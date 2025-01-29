export interface LoggedUser {
    id: number;
    name: string;
    url: string;
    description: string;
    link: string;
    slug: string;
    avatar_urls: Avatar;
    meta: any[];
    _links: any;
    iat: number;
    exp: number;
    email: string;
    website: string;
}
interface Avatar {
    '24': string;
    '48': string;
    '96': string;
}