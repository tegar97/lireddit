import { Box, Button, Flex, Link } from '@chakra-ui/core';
import React from 'react'
import NextLink from "next/link"
import { useMeQuery } from '../generated/graphql';
interface navbarProps {

}

const Navbar: React.FC<navbarProps> = ({}) => {
    const [{data,fetching}] = useMeQuery()
    let body =null

    if(fetching) {
        body = null;
    }else if(!data?.me) {
        body = (
            <>
                <NextLink href="/login">
                    <Link mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link mr={2}>register</Link>
                </NextLink>
            </>
        )

    }else {
        body = (
            <>
                <Flex>
                    <Box>{data.me.username}</Box>
                    <Button variant="link">Logout</Button>
                </Flex>
            </>
        )

    }
    
    return (
        <Flex bg="tomato" p={4} >
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    );
}
export default Navbar