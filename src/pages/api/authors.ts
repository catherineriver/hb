import { NextApiRequest, NextApiResponse } from "next";
import mockData from "./mockData.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { query, location, topics, formats } = req.query;

    let filteredAuthors = mockData.authors;

    if (query) {
        filteredAuthors = filteredAuthors.filter(author =>
            author.name.toLowerCase().includes(query.toString().toLowerCase())
        );
    }

    if (location) {
        filteredAuthors = filteredAuthors.filter(author =>
            author.location.toLowerCase() === location.toString().toLowerCase()
        );
    }

    if (topics) {
        const selectedTopics = topics.toString().split(",");
        filteredAuthors = filteredAuthors.filter(author =>
            author.topics.some(topic => selectedTopics.includes(topic))
        );
    }

    if (formats) {
        const selectedFormats = formats.toString().split(",");
        filteredAuthors = filteredAuthors.filter(author =>
            author.formats.some(format => selectedFormats.includes(format))
        );
    }

    res.status(200).json({ authors: filteredAuthors });
}
