import React from "react";
import { Link } from "react-router-dom";
import { Container, Dropdown, DropdownItem, DropdownMenu, Image, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

export default function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header as={Link} to='/' exact >
                    <img src={require('../../assets/logo.png')} alt="logo" style={{ marginRight: '10px' }} />
                    Ants Plaza
                </Menu.Item>
                <Dropdown item text='Home'>
                    <DropdownMenu>
                        <DropdownItem as={Link} to='/trading' text='Trading' icon='dollar' />
                        <DropdownItem as={Link} to='/dashboard' text='Dashboard' icon='dashboard' />
                    </DropdownMenu>
                </Dropdown>
                <Dropdown item text='Admin'>
                    <DropdownMenu>
                        <DropdownItem as={Link} to='/strategy_setting' text='Strategy Setting' icon='setting' />
                        <DropdownItem as={Link} to='/symbols' text='Symbols Setting' icon='dollar' />
                        <DropdownItem as={Link} to='/api_setting' text='API Setting' icon='address card' />
                        <DropdownItem text='Robot Run' icon='play' />
                        <DropdownItem text='Emergency Exit' icon='fire extinguisher' />
                    </DropdownMenu>
                </Dropdown>
                <Dropdown item text='Reports'>
                    <DropdownMenu>
                        <DropdownItem as={Link} to='/report' text='Daily' icon='chart area' />
                        <DropdownItem as={Link} to='/report' text='Weekly' icon='chart line' />
                        <DropdownItem as={Link} to='/report' text='Monthly' icon='chart bar' />
                        <DropdownItem as={Link} to='/orders' text='Orders' icon='exchange' />

                    </DropdownMenu>
                </Dropdown>
                <Menu.Item position='right' >
                    <Image src={require('../../assets/user.png')} avatar spaced='right' />
                    <Dropdown pointing='top right' text={user?.username}  >
                        <DropdownMenu>
                            <DropdownItem text='My Profile' icon='user' />
                            <DropdownItem text='Logout' icon='power' onClick={logout} />
                        </DropdownMenu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
}