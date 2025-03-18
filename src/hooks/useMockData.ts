import {useEffect, useState} from "react";

export interface Pitch {
    id: number;
    author: Author;
    is_booked: boolean;
    content: {
        tags: string[];
        date: string;
        location: string;
        deadline: string;
        budget: string;
        full: string[];
        plot: string[];
        status: string;
        format: string;
        title: string;
        key_description: string;
    }
}

interface Organization {
    id: number;
    name: string;
}

export interface Author {
    avatar_url: string,
    ready_for_urgent: boolean,
    ready_for_travel: boolean,
    regions: string[],
    location: string,
    topics: any,
    id: number,
    name: string,
    bio: string,
    articles: string[],
    organizations: Organization[],
    total_pitches: number,
    in_progress: number,
    completed: number,
    rejected: number,
    formats: string[],
    experience: boolean;
    stats: {
        completed_posts: number;
        total_posts: number;
    },
}

export interface MockData {
    formats: string[];
    tags: string[];
    data: Pitch[];
    authors: Author[];
}

const useMockData = () => {
    const [mockData, setMockData] = useState<MockData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("/data/mockData.json")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Ошибка загрузки данных");
                }
                return res.json();
            })
            .then((data: MockData) => {
                setMockData({
                    formats: data.formats,
                    tags: data.tags,
                    data: data.data,
                    authors: data.authors
                });
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    return {mockData, loading, error};
};

export default useMockData;
