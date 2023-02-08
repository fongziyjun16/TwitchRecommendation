import React, {useEffect, useState} from "react";
import "./index.css";
import {Layout, Menu, message} from "antd";
import {getFavoriteItem, getTopGames, logout} from "./utils";
import PageHeader from "./components/PageHeader";
import CustomSearch from "./components/CustomSearch";
import {FireOutlined, LikeOutlined} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [favoriteItems, setFavoriteItems] = useState([])
    const [topGames, setTopGames] = useState([])

    useEffect(() => {
        getTopGames().then((data) => {
            setTopGames(data)
        }).catch((err) => {
            message.error(err.message)
        })
    }, [])

    const signInOnSuccess = () => {
        setLoggedIn(true)
        getFavoriteItem().then((data) => {
            setFavoriteItems(data)
        })
    }

    const signOutOnClick = () => {
        logout().then(() => {
            setLoggedIn(false)
            message.success('Successfully Signed out')
        }).catch((err) => {
            message.error(err.message)
        })
    }

    const mapTopGamesToProps = (topGames) => [
        {
            label: 'Recommend for you!',
            key: 'recommendation',
            icon: <LikeOutlined />
        },
        {
            label: 'Popular Games',
            key: 'popular_game',
            icon: <FireOutlined />,
            children: topGames.map((game) => ({
                label: game.name,
                key: game.id,
                icon: <img
                    alt="placeholder"
                    src={game.box_art_url.replace('{height}', '40').replace('{width}', '40')}
                    style={{borderRadius: '50%', marginRight: '20px'}}
                />
            }))
        }
    ]

    return (
        <Layout>
            <Header>
                <PageHeader
                    loggedIn={loggedIn}
                    signOutClick={signOutOnClick}
                    signInOnSuccess={signInOnSuccess}
                    favoriteItems={favoriteItems}
                />
            </Header>
            <Layout>
                <Sider width={300} style={{background: '#fff'}}>
                    <CustomSearch onSuccess={()=>{}} />
                    <Menu
                        mode="inline"
                        onSelect={() => {}}
                        style={{marginTop: '10px'}}
                        items={mapTopGamesToProps(topGames)}
                    />
                </Sider>
                <Layout style={{padding: '24px'}}>
                    <Content
                        style={{
                            background: '#fff',
                            padding: 24,
                            margin: 0,
                            height: 800,
                            overflow: 'auto'
                        }}
                    >
                        {'Home'}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
