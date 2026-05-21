
// import { useState, useEffect } from "react";
// import { Button, Table, Popconfirm, message  } from "antd";
// import { Form } from "antd";
// import ShowForm from "./ShowForm";
// import { getAllShows, deleteShow } from "../../Apis/Shows";

// function ShowsList() {
//   const [shows, setShows] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedShow, setSelectedShow] = useState(null);
//   const [form] = Form.useForm();

//   const loadShows = async () => {
//     try {
//       const res = await getAllShows();
//       const allshows = res.data || res.data.data || res ;
//        console.log(allshows);
//       setShows(
//         allshows.map((item) => ({
//               ...item,
//               key: item._id
//             }))
//       );
//     } catch (err) {
//       console.log(err);
//       message.error("Failed to load shows");
//       setShows([]);
//     }
//   };

//   useEffect(() => {
//     loadShows();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       await deleteShow(id);
//       message.success("Show deleted");
//       loadShows();
//     } catch {
//       message.error("Delete failed");
//     }
//   };

//   const handleEdit = (record) => {
//     setSelectedShow(record);
//     setIsModalOpen(true);
//   };

//   const columns = [
//     {
//       title: "Show Name",
//       dataIndex: "name"
//     },
//     {
//       title: "Movie",
//       dataIndex: ["movie", "title"]
//     },
//     {
//       title: "Theatre",
//       dataIndex: ["theatres", "name"]
//     },
//     {
//       title: "Date",
//       dataIndex: "Date",
//       render: (text) => new Date(text).toDateString()
//     },
//     {
//       title: "Time",
//       dataIndex: "time"
//     },
//     {
//       title: "Type",
//       dataIndex: "showType"
//     },
//     {
//       title: "Price",
//       dataIndex: "ticketPrice"
//     },
//     {
//       title: "Seats",
//       render: (_, r) =>
//         `${r.bookedSeats?.length || 0} / ${r.totalSeats}`
//     },
//     {
//       title: "Actions",
//       render: (_, record) => (
//         <div style={{ display: "flex", gap: 10 }}>
//           <Button onClick={() => handleEdit(record)}>Edit</Button>

//           <Popconfirm
//             title="Delete show?"
//             onConfirm={() => handleDelete(record._id)}
//           >
//             <Button danger>Delete</Button>
//           </Popconfirm>
//         </div>
//       )
//     }
//   ];

//   return (
//     <>
//       <Button
//         type="primary"
//         onClick={() => {
//           setSelectedShow(null);
//           setIsModalOpen(true);
//         }}
//       >
//         Add Show
//       </Button>

//       {isModalOpen && (
//         <ShowForm
//           isModalOpen={isModalOpen}
//           setIsModalOpen={setIsModalOpen}
//           reloadData={loadShows}
//           selectedShow={selectedShow}
//         />
//       )}

//       <Table columns={columns} dataSource={shows} />
//     </>
//   );
// }

// export default ShowsList;


import { useState, useEffect } from "react";
import { Button, Table, Popconfirm, message } from "antd";
import ShowForm from "./ShowForm";
import { getAllShows, deleteShow } from "../../Apis/Shows";

function ShowsList() {
  const [shows, setShows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);

  const loadShows = async () => {
    try {
      const res = await getAllShows();

      console.log("SHOW RESPONSE:", res);

      const allshows = res?.data?.data || [];

      setShows(
        allshows.map((item) => ({
          ...item,
          key: item._id
        }))
      );

    } catch (err) {

      console.log(err);

      message.error("Failed to load shows");

      setShows([]);
    }
  };

  useEffect(() => {
    loadShows();
  }, []);

  const handleDelete = async (id) => {
    try {

      await deleteShow(id);

      message.success("Show deleted");

      loadShows();

    } catch (err) {

      console.log(err);

      message.error("Delete failed");
    }
  };

  const handleEdit = (record) => {
    setSelectedShow(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Show Name",
      dataIndex: "name"
    },
    {
      title: "Movie",
      dataIndex: ["movie", "title"]
    },
    {
      title: "Theatre",
      dataIndex: ["theatres", "name"]
    },
    {
      title: "Date",
      dataIndex: "Date",
      render: (text) => new Date(text).toDateString()
    },
    {
      title: "Time",
      dataIndex: "time"
    },
    {
      title: "Type",
      dataIndex: "showType"
    },
    {
      title: "Price",
      dataIndex: "ticketPrice"
    },
    {
      title: "Seats",
      render: (_, r) =>
        `${r.bookedSeats?.length || 0} / ${r.totalSeats}`
    },
    {
      title: "Actions",
      render: (_, record) => (
        <div style={{ display: "flex", gap: 10 }}>
          <Button onClick={() => handleEdit(record)}>
            Edit
          </Button>

          <Popconfirm
            title="Delete show?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      )
    }
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setSelectedShow(null);
          setIsModalOpen(true);
        }}
      >
        Add Show
      </Button>

      {isModalOpen && (
        <ShowForm
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          reloadData={loadShows}
          selectedShow={selectedShow}
        />
      )}

      <Table
        columns={columns}
        dataSource={shows}
      />
    </>
  );
}

export default ShowsList;