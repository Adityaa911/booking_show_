// import { Modal, Form, Input, Button } from "antd";
// import { useEffect,useState } from "react";

// import {
//   ShopOutlined,
//   EnvironmentOutlined,
//   PhoneOutlined,
//   MailOutlined
// } from "@ant-design/icons";

// import { Postnewtheatre, updatetheatre } from "../../Apis/Theatre";
// import { getAllUsers } from "../../Apis/User";




// function TheatreForm({ isModalOpen, setIsModalOpen, reloadData, selectedTheatre}) {

//   const [form] = Form.useForm();
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     if (isModalOpen) {
//       if (selectedTheatre) {
//         form.setFieldsValue(...selectedTheatre , userId : ...selectedTheatre.owner?._id)
//       } else {
//         form.resetFields();
//       }
//     }
//   }, [selectedTheatre, isModalOpen]);

//   const fetchUsers = async () => {
//   try {
//     const res = await getAllUsers();
//     setUsers(res.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

//   const handleSubmit = async (values) => {
//     console.log("FORM VALUES:", values);
//     let response;

//     if (selectedTheatre) {
//       response = await updatetheatre(selectedTheatre._id, values);
//     } else {
//       response = await Postnewtheatre(values);
//     }

//     console.log("API RESPONSE:", response);

//     reloadData();

//     form.resetFields();
//     setIsModalOpen(false);

//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//   };

//   return (
//     <Modal
//       title={
//         <span>
//           <ShopOutlined style={{ marginRight: 8 }} />
//           {selectedTheatre ? "Edit Theatre" : "Add Theatre"}
//         </span>
//       }
//       open={isModalOpen}
//       footer={null}
//       onCancel={handleCancel}
//     >
//       <Form form={form} layout="vertical" onFinish={handleSubmit}>

//         <Form.Item
//           label="Theatre Name"
//           name="name"
//           rules={[{ required: true, message: "Enter theatre name" }]}
//         >
//           <Input
//             prefix={<ShopOutlined />}
//             placeholder="Enter theatre name"
//           />
//         </Form.Item>

//         <Form.Item
//           label="Address"
//           name="address"
//           rules={[{ required: true, message: "Enter address" }]}
//         >
//           <Input
//             prefix={<EnvironmentOutlined />}
//             placeholder="Enter theatre address"
//           />
//         </Form.Item>

//         {user?.isAdmin && (
//          <><Form.Item
//             label="Assign Owner"
//             name="userId"
//             rules={[{ required: true, message: "Select user" }]}
//           >
//             <Select placeholder="Select owner">
//               {users.map((u) => (
//                 <Select.Option key={u._id} value={u._id}>
//                   {u.name}
//                 </Select.Option>
//               ))}
//             </Select>
//           </Form.Item>
//           <Form.Item
//             label="Phone"
//             name="phone"
//             rules={[{ required: true, message: "Enter phone number" }]}
//           >
//               <Input
//                 prefix={<PhoneOutlined />}
//                 placeholder="Enter phone number" />
//             </Form.Item><Form.Item
//               label="Email"
//               name="email"
//               rules={[{ required: true, message: "Enter email" }]}
//             >
//               <Input
//                 prefix={<MailOutlined />}
//                 placeholder="Enter theatre email" />
//             </Form.Item><Form.Item style={{ textAlign: "center" }}>
//               <Button type="primary" htmlType="submit" size="large">
//                 {selectedTheatre ? "Update Theatre" : "Add Theatre"}
//               </Button>
//             </Form.Item></>

//       </Form>)
//     </Modal>
//   );
// }

// export default TheatreForm;

import { Modal, Form, Input, Button, Select ,message} from "antd";
import { useEffect, useState } from "react";

import {
  ShopOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  MailOutlined
} from "@ant-design/icons";

import { Postnewtheatre, updatetheatre } from "../../Apis/Theatre";
import { getAllUsers } from "../../Apis/User";

function TheatreForm({ isModalOpen, setIsModalOpen, reloadData, selectedTheatre }) {

  const [form] = Form.useForm();
  const [users, setUsers] = useState([]);

  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (isModalOpen) {

      if (users?.isAdmin) {
        fetchUsers();
      }

      if (selectedTheatre) {
        form.setFieldsValue({
          ...selectedTheatre,
          userId: selectedTheatre.owner?._id
        });
      } else {
        form.resetFields();
      }
    }
  }, [selectedTheatre, isModalOpen]);

  // const fetchUsers = async () => {
  //   try {
  //     const res = await getAllUsers();
  //     setUsers(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  const fetchUsers = async () => {
  try {
    const res = await getAllUsers();
    console.log("Users API Response:", res);

    // If API helper returns response.data
    const userData = res.data || [];

    // If API helper returns full axios response, use:
    // const userData = res.data.data || [];

    setUsers(Array.isArray(userData) ? userData : []);
  } catch (err) {
    console.log("FETCH USERS ERROR:", err);
    message.error("Failed to load users");
    setUsers([]);
  }
};

  const handleSubmit = async (values) => {
    let response;

    if (selectedTheatre) {
      response = await updatetheatre(selectedTheatre._id, values);
    } else {
      response = await Postnewtheatre(values);
    }

    reloadData();
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <span>
          <ShopOutlined style={{ marginRight: 8 }} />
          {selectedTheatre ? "Edit Theatre" : "Add Theatre"}
        </span>
      }
      open={isModalOpen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>

        <Form.Item
          label="Theatre Name"
          name="name"
          rules={[{ required: true, message: "Enter theatre name" }]}
        >
          <Input prefix={<ShopOutlined />} placeholder="Enter theatre name" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Enter address" }]}
        >
          <Input prefix={<EnvironmentOutlined />} placeholder="Enter address" />
        </Form.Item>

        {/* ✅ Only admin sees this */}
        {user?.isAdmin && (
          <Form.Item
            label="Assign Owner"
            name="userId"
            rules={[{ required: true, message: "Select user" }]}
          >
            <Select placeholder="Select owner">
              {users.map((u) => (
                <Select.Option key={u._id} value={u._id}>
                  {u.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true, message: "Enter phone number" }]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Enter email" }]}
        >
          <Input prefix={<MailOutlined />} placeholder="Enter email" />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" size="large">
            {selectedTheatre ? "Update Theatre" : "Add Theatre"}
          </Button>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default TheatreForm;