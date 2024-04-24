export interface StrapiPost {
    id: number;
    attributes: {
        title: string;
        slug: string;
        content: any;
        image: any;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
    };
}