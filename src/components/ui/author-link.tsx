import { Link, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";

import React from "react";

interface AuthorLinkProps {
    author: {
        id: number;
        name: string;
    };
}

const AuthorLink = ({ author }: AuthorLinkProps) => {
    if (!author) return null;

    return (
        <Link href={`/authors/${author.id}`} color="blue.500">
            {/*<Avatar size="2xs"></Avatar>*/}
            <Text fontFamily="heading" fontSize='14px'>{author.name}</Text>
        </Link>
    );
};

export default AuthorLink;
