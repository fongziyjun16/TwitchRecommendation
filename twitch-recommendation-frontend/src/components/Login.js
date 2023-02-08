import {useState} from "react";
import {login} from "../utils";
import {Button, Form, Input, message, Modal} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';

function Login({onSuccess}) {
    const [displayModal, setDisplayModal] = useState(false);

    const handleCancel = () => {
        setDisplayModal(false);
    }

    const signInOnClick = () => {
        setDisplayModal(true);
    }

    const onFinish = (data) => {
        login(data).then(() => {
            setDisplayModal(false);
            message.success(`Welcome back`);
            onSuccess();
        }).catch((err) => {
            message.error(err.message);
        });
    }

    return (
        <>
            <Button shape="round" onClick={signInOnClick} style={{marginRight: '200px'}}>
                Login
            </Button>
            <Modal
                title="Log in"
                visible={displayModal}
                onCancel={handleCancel}
                footer={null}
                destroyOnClose={true}
            >
                <Form
                    name="normal_login"
                    onFinish={onFinish}
                    preserve={false}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your Username!'}]}
                    >
                        <Input prefix={<UserOutlined />} placeholder = "Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your Password!'}]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder = "Username"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );

}

export default Login;