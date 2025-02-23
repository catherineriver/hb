import { Link, Text } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import NextLink from "next/link";

interface AuthorLinkProps {
    author: {
        id: number;
        name: string;
    };
}

const AuthorLink = ({ author }: AuthorLinkProps) => {
    if (!author) return null;

    return (
            <NextLink href={`/authors/${author.id}`} passHref>
                <Link color="blue.500" display="flex" alignItems="center">
                    <Avatar size="sm" />
                    <Text fontSize="xl" ml={2}>{author.name}</Text>
                </Link>
            </NextLink>
    );
};

export default AuthorLink;
