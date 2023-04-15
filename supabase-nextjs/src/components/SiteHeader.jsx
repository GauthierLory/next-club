import { Avatar, Button, Dropdown, Navbar, Text } from "@nextui-org/react";
import { ShoppingCartIcon, UserIcon } from  "@heroicons/react/24/solid";
import Link from "next/link";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'

const SiteHeader = () => {
    const supabase = useSupabaseClient()

    return (
        <Navbar isBordered>
            <Navbar.Brand>
                <Text b color="inherit" hideIn="xs">
                    ACME
                </Text>
            </Navbar.Brand>
            <Navbar.Content hideIn="xs">
                <Navbar.Link href="/team">Teams</Navbar.Link>
                <Navbar.Link isActive href="/user">Users</Navbar.Link>
                <Navbar.Link href="/account">profile</Navbar.Link>
            </Navbar.Content>
            <Navbar.Content>
                <Navbar.Item>
                    <Button color="inherit" href="#" onClick={() => supabase.auth.signOut()}>
                        Logout
                    </Button>
                </Navbar.Item>
                <Navbar.Item>
                    <Button auto flat as={Link} href="/">
                        Sign Up
                    </Button>
                </Navbar.Item>
            </Navbar.Content>
        </Navbar>
    );
};
export default SiteHeader;