import { Link, Text, Flex } from "@chakra-ui/react";
import React from "react";
import {Avatar} from "@/components/ui/avatar";
import {AuthorType} from "@/hooks/useMockData";

interface AuthorLinkProps {
    author: AuthorType;
    variant?: 'withAvatar' | string;
}

const AuthorLink: React.FC<AuthorLinkProps> = ({ variant, author }) => {
    if (!author) return null;

    return (
        <Link href={`/authors/${author.id}`}
              _hover={{ textDecoration: "underline"}}
        >
            <Flex
                direction="row"
                align="center"
                gap={variant === "withAvatar" ? 2 : 0}
            >
                {variant === "withAvatar" && <Avatar size="md" src={author.avatar_url} />}
                <Text fontSize="14px" fontWeight="medium">{author.name}</Text>
            </Flex>
        </Link>
    );
};

export default AuthorLink;
