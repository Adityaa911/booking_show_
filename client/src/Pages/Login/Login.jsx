
import { Button,  Form, Input } from 'antd';
import { LoginUser } from '../../Apis/User';
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import {message} from 'antd'
function Login() {
    const navigate = useNavigate()
    
    const onFinish = async (values) => {
    try {
        const response = await LoginUser(values);
         
        if(response.success){
            localStorage.setItem("token", response.token);

            navigate("/")
            // console.log(response)
            message.success('logged in !')
        }else{
            console.log(response.message)
            message.error(response.message)
        }
        
    } catch (error) {
        console.log("Login error:", error);
    }
}
    useEffect(()=>{
     if(localStorage.getItem('token')){
        navigate("/")
}},[]);
    

    return (
        <header className="App-header">
            <main className="main-area mw-500 text-center px-3">
                <section className="left-section">
                    <h1 className="login-title">
                        Login to BookMyShow
                    </h1>
                </section>
                <section className="right-section">
                    <Form
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[{ required: true, message: "Email is required" }]}
                        >
                            <Input
                                id="email"
                                type="text"
                                placeholder="Enter your Email"
                            ></Input>
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is required" }]}
                        >
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your Password"
                            ></Input>
                        </Form.Item>
                        <Form.Item className="d-block">
                            <Button
                                type="primary"
                                block
                                htmlType="submit"
                                style={{ fontSize: "1rem", fontWeight: "600" }}
                            >
                                Login
                            </Button>
                            <p style={{ textAlign: "center" }}>
                                 Don't have an account? <Link to="/signup">Register</Link>
                            </p>
                        </Form.Item>
                    </Form>
                </section>
            </main>
        </header>
    )
}
export default Login;