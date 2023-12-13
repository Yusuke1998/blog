export interface StrapiPost {
    id: number;
    attributes: {
        title: string;
        slug: string;
        content: string;
        image?: string;
        updatedAt: string;
    };
}