import { Link, Text, Flex } from "@chakra-ui/react";
import React from "react";
import {Avatar} from "@/components/ui/avatar";
import {AuthorType} from "@/hooks/useMockData";

interface AuthorLinkProps {
    author: AuthorType;
    variant?: 'withAvatar' | 'onlyAvatar' | string;
    size?: 'small' | 'medium' | 'large';
}

const AuthorLink: React.FC<AuthorLinkProps> = ({ size= 'small', variant, author }) => {
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
                {variant === "withAvatar" || variant === "onlyAvatar" && <Avatar size="md" src={author.avatar_url} />}
                {variant !== 'onlyAvatar' && <Text fontSize={size === 'medium' ? '18px' : '14px' } fontWeight="bold">{author.name}</Text>}
            </Flex>
        </Link>
    );
};

export default AuthorLink;
