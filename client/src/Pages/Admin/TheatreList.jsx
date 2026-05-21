
import { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import { getAlltheatre, deletetheatre } from "../../Apis/Theatre";
import TheatreForm from "./TheatreForm";

function TheatreList() {
  const [theatres, setTheatres] = useState([]);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getTheatreData = async () => {
    try {
      const response = await getAlltheatre();
      const allTheatres = response?.data || [];
       console.log("THEATRE RESPONSE:", response);
       

      setTheatres(
        allTheatres.map((item) => ({
          ...item,
          key: `theaters${item._id}`,
        }))
      );
      console.log("ALL THEATRES:", allTheatres);
    } catch (error) {
      console.log(error);
      message.error("Failed to fetch theatres");
    }
  };

  useEffect(() => {
    getTheatreData();
  }, []);

  
  const handleDelete = async (id) => {
    try {
      await deletetheatre(id);
      message.success("Theatre deleted successfully");
      getTheatreData();
    } catch (error) {
      console.log(error);
      message.error("Delete failed");
    }
  };

  
  const handleEdit = (record) => {
    setSelectedTheatre(record);
    setIsModalOpen(true);
  };

  const tableColumns = [
    {
      title: "Theatre Name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
     {
            title: 'Owner',
            dataIndex: 'owner',
            render: (text, data) => {
                return data.owner && data.owner.name;
            }
        },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isActive",
      render: (text) => (
        <span>{text ? "Active" : "Pending Approval"}</span>
      ),
    },
    {
      title: "Actions",
      render: (_, record) => {
        return (
          <div style={{ display: "flex", gap: "10px" }}>
            {/* EDIT */}
            <Button onClick={() => handleEdit(record)}>Edit</Button>

            {/* DELETE */}
            <Popconfirm
              title="Are you sure to delete this theatre?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {/* ADD BUTTON */}
      <Button
        type="primary"
        onClick={() => {
          setSelectedTheatre(null);
          setIsModalOpen(true);
        }}
      >
        Add Theatre
      </Button>

      {/* MODAL (FIXED CONDITIONAL RENDER) */}
      {isModalOpen && (
        <TheatreForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          reloadData={getTheatreData}
          selectedTheatre={selectedTheatre}
        />
      )}

      {/* TABLE */}
      <Table
        columns={tableColumns}
        dataSource={theatres}
        //pagination={{ pageSize: 5 }}
      />
    </>
  );
}

export default TheatreList;