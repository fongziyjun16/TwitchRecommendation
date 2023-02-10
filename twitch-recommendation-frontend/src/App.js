import React, {useEffect, useState} from "react";
import "./index.css";
import {Layout, Menu, message} from "antd";
import {getFavoriteItem, getRecommendations, getTopGames, logout, searchGameById} from "./utils";
import PageHeader from "./components/PageHeader";
import CustomSearch from "./components/CustomSearch";
import {FireOutlined, LikeOutlined} from "@ant-design/icons";
import Home from "./components/Home";

const { Header, Sider, Content } = Layout;

function App() {

    const [loggedIn, setLoggedIn] = useState(false)
    const [favoriteItems, setFavoriteItems] = useState([])
    const [topGames, setTopGames] = useState([])
    const [resources, setResources] = useState({
        videos: [],
        streams: [],
        clips: []
    })

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

    const customSearchOnSuccess = (data) => {
        setResources(data)
    }

    const onGameSelect = ({key}) => {
        if (key === "recommendation") {
            getRecommendations().then((data) => {
                setResources(data);
            });
            return;
        }

        searchGameById(key).then((data) => {
            setResources(data);
        })
    }

    const favoriteOnChange = () => {
        getFavoriteItem().then((data) => {
            setFavoriteItems(data);
        }).catch(err => {
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
                    <CustomSearch onSuccess={customSearchOnSuccess} />
                    <Menu
                        mode="inline"
                        onSelect={onGameSelect}
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
                        <Home
                            resources={resources}
                            loggedIn={loggedIn}
                            favoriteItems={favoriteItems}
                            favoriteOnChange={favoriteOnChange}
                        />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default App;
