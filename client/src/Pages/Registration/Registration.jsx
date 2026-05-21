import React from "react";
import { Form, Input, Button, Card } from "antd";
import { Link } from "react-router-dom";
import {RegisterUser} from '../../Apis/User'

function Registration() {

  const onFinish = async (values) => {
     const response = await RegisterUser(values)
    console.log(response);
    

  };

  return (
    <div style={{display:"flex", justifyContent:"center", marginTop:"100px"}}>
      <Card title="Register" style={{width:400}}>
        <Form layout="vertical" onFinish={onFinish}>

          <Form.Item
            label="Name"
            name="name"
            rules={[{required:true, message:"Please enter your name"}]}
          >
            <Input placeholder="Enter your name"/>
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{required:true, message:"Please enter email"}]}
          >
            <Input placeholder="Enter email"/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required:true, message:"Enter password"}]}
          >
            <Input.Password placeholder="Enter password"/>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Sign Up
            </Button>
          </Form.Item>

           <p style={{ textAlign: "center" }}>
            Already have an account? <Link to="/login">Login</Link>
           </p>
        </Form>
      </Card>
    </div>
  );
}

export default Registration;