import React from "react";
import {Button, Col, Layout, Row} from "antd";
import Register from "./Register";
import Login from "./Login";
import Favorites from "./Favorites";

const {Header} = Layout;

function PageHeader({loggedIn, signOutClick, signInOnSuccess, favoriteItems}) {
    return (
        <Header>
            <Row justify='space-between'>
                <Col>
                    {loggedIn && <Favorites favoriteItems={favoriteItems}/>}
                </Col>
                <Col>
                    {
                        loggedIn && <Button shape="round" onClick={signOutClick}>Logout</Button>
                    }
                    {
                        !loggedIn && (
                            <>
                                <Login onSuccess={signInOnSuccess}/>
                                <Register/>
                            </>
                        )
                    }
                </Col>
            </Row>
        </Header>
    )
}

export default PageHeader;