import { Client } from "@notionhq/client";
import { NotionCompatAPI } from "notion-compat";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface PageInfo {
    id: string;
    title: string;
    cover: string | null;
    publishedDate: string;
    excerpt?: string;
}

export interface PageListResponse {
    results: PageInfo[];
    hasMore: boolean;
}

const notionClient = new Client({
    auth: process.env.NOTION_TOKEN,
});

const notion = new NotionCompatAPI(notionClient);

const parsePageProperties = (page: PageObjectResponse): PageInfo => {
    const { properties, cover } = page;
    const title =
        properties.Title?.type === "title"
            ? properties.Title.title?.[0]?.plain_text || "Untitled"
            : "Untitled";
    const publishedDate =
        properties.PublishedDate?.type === "date"
            ? properties.PublishedDate.date?.start || new Date().toISOString()
            : new Date().toISOString();
    const excerpt =
        properties.Excerpt?.type === "rich_text"
            ? properties.Excerpt.rich_text?.[0]?.plain_text || ""
            : "";
    const coverUrl =
        cover?.type === "external"
            ? cover.external.url
            : cover?.type === "file"
            ? cover.file.url
            : null;

    return {
        id: page.id.replace(/-/g, ""),
        title,
        cover: coverUrl,
        publishedDate,
        excerpt,
    };
};

export const getPublishedPages = async (
    pageSize: number = 10,
    cursor?: string
): Promise<PageListResponse> => {
    const databaseId = process.env.NOTION_DATABASE_ID as string;

    const response = await notionClient.databases.query({
        database_id: databaseId,
        filter: {
            property: "Published",
            checkbox: { equals: true },
        },
        sorts: [{ property: "PublishedDate", direction: "descending" }],
        page_size: pageSize,
        start_cursor: cursor,
    });

    return {
        results: response.results.map((page) =>
            parsePageProperties(page as PageObjectResponse)
        ),
        hasMore: response.has_more,
    };
};

export const getPageMetadata = async (pageId: string): Promise<PageInfo> => {
    try {
        const page = await notionClient.pages.retrieve({ page_id: pageId });
        if (!page) {
            throw new Error(`페이지를 찾을 수 없습니다. (pageId: ${pageId})`);
        }
        return parsePageProperties(page as PageObjectResponse);
    } catch (error) {
        console.error("Metadata 로드 시 에러:", error);
        throw error;
    }
};

export const getPageRecordMap = async (pageId: string) => {
    try {
        const page = await notion.getPage(pageId);
        if (!page || Object.keys(page).length === 0) {
            throw new Error(
                `페이지 데이터를 찾을 수 없습니다. (pageId: ${pageId})`
            );
        }
        return page;
    } catch (error) {
        console.error("RecordMap 로드 시 에러:", error);
        throw error;
    }
};
