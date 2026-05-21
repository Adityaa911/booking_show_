
import { useState, useEffect } from "react";
import { GetCurentUser } from "../Apis/User";
import { Link, useNavigate } from "react-router-dom";
import { message, Menu, Layout, Dropdown, Avatar, Space } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getValidUser = async () => {
    try {
      const response = await GetCurentUser();

      const currentUser = response.data; 
      setUser(currentUser);
      console.log(currentUser);

      if (!response) {
  navigate("/login");
  return;
}

      message.success(`Welcome ${currentUser.name}`);

      if (!currentUser?.isAdmin) {
        navigate("/");
        return;
      }
      if(currentUser?.isOwner){
        navigate('/showsManage')
      }


    } catch (error) {
      console.log("Auth error:", error.response?.data || error.message);
      navigate("/login");
    } finally {
      setLoading(false); // ✅ IMPORTANT FIX
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    getValidUser();
  }, []);

  // ✅ prevents render crash & refresh issue
  if (loading) return <div>Loading...</div>;

  const { Header } = Layout;

  const navItems = [
    {
      key: "home",
      label: "Home",
      icon: <HomeOutlined />,
      onClick: () => navigate("/"),
    },
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#0f172a",
          padding: "0 24px",
        }}
      >
        <div style={{ color: "#fff", fontSize: "18px", fontWeight: "bold" }}>
          🎬 BookMyShow
        </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={navItems}
          style={{ flex: 1, justifyContent: "center", background: "transparent" }}
        />

        <Dropdown
          menu={{
            items: [
              {
                key: "profile",
                icon: <ProfileOutlined />,
                label: (
                  <span
                   onClick={() => {
              if (user?.isOwner) {
                navigate("/showsmanage");
              } else if (user?.isAdmin) {
                navigate("/admin");
              } else {
                navigate("/my-profile");
              }
            }}
                  >
                    Profile
                  </span>
                ),
              },
              {
                key: "logout",
                icon: <LogoutOutlined />,
                label: (
                  <Link
                    to="/login"
                    onClick={() => localStorage.removeItem("token")}
                  >
                    Logout
                  </Link>
                ),
              },
            ],
          }}
          placement="bottomRight"
        >
          <Space style={{ cursor: "pointer", color: "white" }}>
            <Avatar icon={<UserOutlined />} />
            <span>{user?.name || "Guest"}</span>
          </Space>
        </Dropdown>
      </Header>

      <div style={{ padding: "20px" }}>{children}</div>
    </Layout>
  );
}

export default ProtectedRoute;