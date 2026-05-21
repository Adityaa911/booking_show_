
// import {
//   Modal,
//   Form,
//   Select,
//   DatePicker,
//   InputNumber,
//   Input,
//   message
// } from "antd";
// import { useEffect, useState } from "react";
// import dayjs from "dayjs";
// import { updateShow, createShows } from "../../Apis/Shows";
// import { getMyTheatres } from "../../Apis/Theatre";
// import { getAllmovies } from "../../Apis/Movies";

// const { Option } = Select;

// function ShowForm({
//   isModalOpen,
//   setIsModalOpen,
//   reloadData,
//   selectedShow
// }) {
//   const [form] = Form.useForm();

//   const [theatres, setTheatres] = useState([]);
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     loadData();
//   }, []);

//   useEffect(() => {
//     if (selectedShow) {
//       form.setFieldsValue({
//         name: selectedShow.name,
//         Date: selectedShow.Date ? dayjs(selectedShow.Date) : null,
//         time: selectedShow.time,
//         movie: selectedShow.movie?._id || selectedShow.movie,
//         theatres: selectedShow.theatres?._id || selectedShow.theatres,
//         ticketPrice: selectedShow.ticketPrice,
//         totalSeats: selectedShow.totalSeats,
//         showType: selectedShow.showType
//       });
//     } else {
//       form.resetFields();
//     }
//   }, [selectedShow, form]);

//  const loadData = async () => {
//   try {
//     const [theatreRes, movieRes]  = await Promise.all([getMyTheatres(), getAllmovies()]);
//     const theatreData = theatreRes.data || theatreRes;
//     const movieData = movieRes.data || movieRes;
//     setTheatres(theatreData);
//     setMovies(movieData);
//   }
//  catch (err) {
//   console.log(err);
//   message.error("Failed to load theatres or movies");
// }
//   const submit = async (values) => {
//     try {
//       const payload = {
//         ...values,
//         Date: values.Date?.toISOString()
//       };

//       if (selectedShow) {
//         await updateShow(selectedShow._id, payload);
//         message.success("Show updated");
//       } else {
//         await createShows(payload);
//         message.success("Show created");
//       }

//       setIsModalOpen(false);
//       reloadData();
//       form.resetFields();
//     } catch (err) {
//       console.log(err);
//       message.error("Operation failed");
//     }
//   };

//   return (
//     <Modal
//       title={selectedShow ? "Edit Show" : "Add Show"}
//       open={isModalOpen}
//       onCancel={() => setIsModalOpen(false)}
//       onOk={() => form.submit()}
//       destroyOnClose
//     >
//       <Form form={form} layout="vertical" onFinish={submit}>

//         <Form.Item name="name" label="Show Name" rules={[{ required: true }]}>
//           <Input placeholder="Enter show name" />
//         </Form.Item>

//         <Form.Item name="theatres" label="Theatre" rules={[{ required: true }]}>
//           <Select placeholder="Select theatre">
//             {theatres?.map((t) => (
//               <Option key={t._id} value={t._id}>
//                 {t.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="movie" label="Movie" rules={[{ required: true }]}>
//           <Select placeholder="Select movie">
//             {movies?.map((m) => (
//               <Option key={m._id} value={m._id}>
//                 {m.title}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="Date" label="Date" rules={[{ required: true }]}>
//           <DatePicker style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item name="time" label="Time" rules={[{ required: true }]}>
//           <Input placeholder="e.g. 7:00 PM" />
//         </Form.Item>

//         <Form.Item name="showType" label="Show Type">
//           <Select>
//             <Option value="morning">Morning</Option>
//             <Option value="afternoon">Afternoon</Option>
//             <Option value="evening">Evening</Option>
//             <Option value="night">Night</Option>
//           </Select>
//         </Form.Item>

//         <Form.Item name="ticketPrice" label="Ticket Price" rules={[{ required: true }]}>
//           <InputNumber style={{ width: "100%" }} />
//         </Form.Item>

//         <Form.Item name="totalSeats" label="Total Seats" rules={[{ required: true }]}>
//           <InputNumber style={{ width: "100%" }} />
//         </Form.Item>

//       </Form>
//     </Modal>
//   );
// }
// }

// export default ShowForm;


// import {
//   Modal,
//   Form,
//   Select,
//   DatePicker,
//   InputNumber,
//   Input,
//   message
// } from "antd";

// import { useEffect, useState } from "react";

// import dayjs from "dayjs";

// import {
//   updateShow,
//   createShows
// } from "../../Apis/Shows";

// import {
//   getMyTheatres
// } from "../../Apis/Theatre";

// import {
//   getAllmovies
// } from "../../Apis/Movies";

// const { Option } = Select;

// function ShowForm({
//   isModalOpen,
//   setIsModalOpen,
//   reloadData,
//   selectedShow
// }) {

//   const [form] = Form.useForm();

//   const [theatres, setTheatres] = useState([]);

//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     loadData();
//     console.log("THEATRE RESPONSE", theatreRes);
//     console.log("MOVIE RESPONSE", movieRes);
//   }, []);

//   useEffect(() => {

//     if (selectedShow) {

//       form.setFieldsValue({
//         name: selectedShow.name,

//         Date: selectedShow.Date
//           ? dayjs(selectedShow.Date)
//           : null,

//         time: selectedShow.time,

//         movie:
//           selectedShow.movie?._id ||
//           selectedShow.movie,

//         theatres:
//           selectedShow.theatres?._id ||
//           selectedShow.theatres,

//         ticketPrice: selectedShow.ticketPrice,

//         totalSeats: selectedShow.totalSeats,

//         showType: selectedShow.showType
//       });

//     } else {

//       form.resetFields();
//     }

//   }, [selectedShow, form]);

//   const loadData = async () => {

//     try {

//       const [theatreRes, movieRes] =
//         await Promise.all([
//           getMyTheatres(),
//           getAllmovies()
//         ]);

//       const theatreData =
//         theatreRes?.data?.data || [];

//       const movieData =
//         movieRes?.data?.data || [];

//       setTheatres(theatreData);

//       setMovies(movieData);

//     } catch (err) {

//       console.log(err);

//       message.error(
//         "Failed to load theatres or movies"
//       );
//     }
//   };

//   const submit = async (values) => {

//     try {

//       const payload = {
//         ...values,
//         Date: values.Date?.toISOString()
//       };

//       if (selectedShow) {

//         await updateShow(
//           selectedShow._id,
//           payload
//         );

//         message.success("Show updated");

//       } else {

//         await createShows(payload);

//         message.success("Show created");
//       }

//       setIsModalOpen(false);

//       reloadData();

//       form.resetFields();

//     } catch (err) {

//       console.log(err);

//       message.error("Operation failed");
//     }
//   };

//   return (
//     <Modal
//       title={
//         selectedShow
//           ? "Edit Show"
//           : "Add Show"
//       }
//       open={isModalOpen}
//       onCancel={() => setIsModalOpen(false)}
//       onOk={() => form.submit()}
//       destroyOnClose
//     >

//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={submit}
//       >

//         <Form.Item
//           name="name"
//           label="Show Name"
//           rules={[{ required: true }]}
//         >
//           <Input placeholder="Enter show name" />
//         </Form.Item>

//         <Form.Item
//           name="theatres"
//           label="Theatre"
//           rules={[{ required: true }]}
//         >
//           <Select placeholder="Select theatre">

//             {theatres?.map((t) => (
//               <Option
//                 key={t._id}
//                 value={t._id}
//               >
//                 {t.name}
//               </Option>
//             ))}

//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="movie"
//           label="Movie"
//           rules={[{ required: true }]}
//         >
//           <Select placeholder="Select movie">

//             {movies?.map((m) => (
//               <Option
//                 key={m._id}
//                 value={m._id}
//               >
//                 {m.title}
//               </Option>
//             ))}

//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="Date"
//           label="Date"
//           rules={[{ required: true }]}
//         >
//           <DatePicker
//             style={{ width: "100%" }}
//           />
//         </Form.Item>

//         <Form.Item
//           name="time"
//           label="Time"
//           rules={[{ required: true }]}
//         >
//           <Input placeholder="e.g. 7:00 PM" />
//         </Form.Item>

//         <Form.Item
//           name="showType"
//           label="Show Type"
//         >
//           <Select>
//             <Option value="morning">
//               Morning
//             </Option>

//             <Option value="afternoon">
//               Afternoon
//             </Option>

//             <Option value="evening">
//               Evening
//             </Option>

//             <Option value="night">
//               Night
//             </Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="ticketPrice"
//           label="Ticket Price"
//           rules={[{ required: true }]}
//         >
//           <InputNumber
//             style={{ width: "100%" }}
//           />
//         </Form.Item>

//         <Form.Item
//           name="totalSeats"
//           label="Total Seats"
//           rules={[{ required: true }]}
//         >
//           <InputNumber
//             style={{ width: "100%" }}
//           />
//         </Form.Item>

//       </Form>
//     </Modal>
//   );
// }

// export default ShowForm;

import {
  Modal,
  Form,
  Select,
  DatePicker,
  InputNumber,
  Input,
  message,
} from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { updateShow, createShows } from "../../Apis/Shows";
import { getMyTheatres } from "../../Apis/Theatre";
import { getAllmovies } from "../../Apis/Movies";

const { Option } = Select;

function ShowForm({
  isModalOpen,
  setIsModalOpen,
  reloadData,
  selectedShow,
}) {
  const [form] = Form.useForm();
  const [theatres, setTheatres] = useState([]);
  const [movies, setMovies] = useState([]);

  // Load theatres and movies when modal opens
  useEffect(() => {
    if (isModalOpen) {
      loadData();
    }
  }, [isModalOpen]);

  // Set form values when editing
  useEffect(() => {
    if (selectedShow) {
      form.setFieldsValue({
        name: selectedShow.name,
        Date: selectedShow.Date ? dayjs(selectedShow.Date) : null,
        time: selectedShow.time,
        movie: selectedShow.movie?._id || selectedShow.movie,
        theatres: selectedShow.theatres?._id || selectedShow.theatres,
        ticketPrice: selectedShow.ticketPrice,
        totalSeats: selectedShow.totalSeats,
        showType: selectedShow.showType,
      });
    } else {
      form.resetFields();
    }
  }, [selectedShow, form]);

  const loadData = async () => {
    try {
      // IMPORTANT: theatreRes and movieRes are defined here
      const [theatreRes, movieRes] = await Promise.all([
        getMyTheatres(),
        getAllmovies(),
      ]);

      console.log("THEATRE RESPONSE:", theatreRes);
      console.log("MOVIE RESPONSE:", movieRes);

      // Works whether your API returns response.data or full axios response
      const theatreData =
        theatreRes?.data?.data ||
        theatreRes?.data ||
        theatreRes ||
        [];

      const movieData =
        movieRes?.data?.data ||
        movieRes?.data ||
        movieRes ||
        [];

      console.log("THEATRES:", theatreData);
      console.log("MOVIES:", movieData);

      setTheatres(Array.isArray(theatreData) ? theatreData : []);
      setMovies(Array.isArray(movieData) ? movieData : []);
    } catch (err) {
      console.log("LOAD DATA ERROR:", err);
      message.error("Failed to load theatres or movies");
      setTheatres([]);
      setMovies([]);
    }
  };

  const submit = async (values) => {
    try {
      const payload = {
        ...values,
        Date: values.Date?.toISOString(),
      };

      if (selectedShow) {
        await updateShow(selectedShow._id, payload);
        message.success("Show updated");
      } else {
        await createShows(payload);
        message.success("Show created");
      }

      setIsModalOpen(false);
      reloadData();
      form.resetFields();
    } catch (err) {
      console.log(err);
      message.error("Operation failed");
    }
  };

  return (
    <Modal
      title={selectedShow ? "Edit Show" : "Add Show"}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={submit}>
        <Form.Item
          name="name"
          label="Show Name"
          rules={[{ required: true }]}
        >
          <Input placeholder="Enter show name" />
        </Form.Item>

        <Form.Item
          name="theatres"
          label="Theatre"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select theatre">
            {theatres.map((theatre) => (
              <Option key={theatre._id} value={theatre._id}>
                {theatre.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="movie"
          label="Movie"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select movie">
            {movies.map((movie) => (
              <Option key={movie._id} value={movie._id}>
                {movie.title}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="Date"
          label="Date"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="time"
          label="Time"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g. 7:00 PM" />
        </Form.Item>

        <Form.Item
          name="showType"
          label="Show Type"
        >
          <Select>
            <Option value="morning">Morning</Option>
            <Option value="afternoon">Afternoon</Option>
            <Option value="evening">Evening</Option>
            <Option value="night">Night</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="ticketPrice"
          label="Ticket Price"
          rules={[{ required: true }]}
        >
          <InputNumber
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          name="totalSeats"
          label="Total Seats"
          rules={[{ required: true }]}
        >
          <InputNumber
            style={{ width: "100%" }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ShowForm;