import { Link, Text } from "@chakra-ui/react";
// import { Avatar } from "@/components/ui/avatar";

import React from "react";
import {Avatar} from "@/components/ui/avatar";

interface AuthorLinkProps {
    author: {
        id: number;
        name: string;
    };
    withAvatar?: boolean;
}

const AuthorLink: React.FC<AuthorLinkProps> = ({ author , withAvatar}) => {
    if (!author) return null;

    return (
        <Link href={`/authors/${author.id}`}
              _hover={{ textDecoration: "underline"}}
        >
            {withAvatar && <Avatar size="md" />}
            <Text fontFamily="heading" fontSize='20px' fontWeight="bold">{author.name}</Text>
        </Link>
    );
};

export default AuthorLink;
