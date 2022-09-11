import React from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import LoginForm from "../users/LoginFrom";

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src={require('../../assets/logo.png')} alt='logo' style={{ marginBottom: 12 }} />
                    Ants Plaza
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Ants Plaza' />
                        <Button as={Link} to='/trading' size='huge' inverted>
                            Go to Trading!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})