import { Modal, Form, Input, Button, DatePicker, Select, } from "antd";
import dayjs from 'dayjs'
import {
  VideoCameraOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PictureOutlined,
  ShopOutlined
} from "@ant-design/icons";
import {useEffect} from "react";
import { Postmovie ,updatemovie } from "../../Apis/Movies";

function Movieform({ isModalopen,setIsModalOpen,reloaddata,selectedMovie}) {
  
  const [form] = Form.useForm();


  useEffect(() => {
  if (isModalopen) {
    if (selectedMovie) {
      form.setFieldsValue({
        ...selectedMovie,
        releaseDate: selectedMovie.releaseDate
          ? dayjs(selectedMovie.releaseDate)
          : null
      });
    } else {
      form.resetFields(); // 
    }
  }
}, [selectedMovie, isModalopen]);

  const handleSubmit = async (values) => {
     let response ;

    const movieData = {
      ...values,
      releaseDate: values.releaseDate.format("YYYY-MM-DD")
    };

    if(selectedMovie){
     response = await updatemovie(selectedMovie._id,movieData);
    }else{
     response = await Postmovie(movieData);
    }
    console.log(movieData);
     
    reloaddata();
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    form.resetFields()
    setIsModalOpen(false);
  };

  return (
    <Modal
      title={
        <span>
          <ShopOutlined style={{ marginRight: 8 }} />
          {selectedMovie ? "Edit Movie" : "Add Movie"}
        </span>
      }
      open={isModalopen}
      footer={null}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input
            prefix={<VideoCameraOutlined />}
            placeholder="Enter movie title"
          />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Release Date"
          name="releaseDate"
          rules={[{ required: true }]}
        >
          <DatePicker style={{ width: "100%" }} suffixIcon={<CalendarOutlined />} />
        </Form.Item>

        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[{ required: true }]}
        >
          <Input
            type="number"
            prefix={<ClockCircleOutlined />}
            placeholder="Enter duration"
          />
        </Form.Item>

        {/* GENRE SELECT */}
        <Form.Item
          label="Genre"
          name="genre"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Genre">
            <Select.Option value="Action">Action</Select.Option>
            <Select.Option value="Comedy">Comedy</Select.Option>
            <Select.Option value="Drama">Drama</Select.Option>
            <Select.Option value="Thriller">Thriller</Select.Option>
            <Select.Option value="Romance">Romance</Select.Option>
            <Select.Option value="Sci-Fi">Sci-Fi</Select.Option>
          </Select>
        </Form.Item>

        {/* LANGUAGE SELECT */}
        <Form.Item
          label="Language"
          name="language"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select Language">
            <Select.Option value="English">English</Select.Option>
            <Select.Option value="Hindi">Hindi</Select.Option>
            <Select.Option value="Spanish">Spanish</Select.Option>
            <Select.Option value="French">French</Select.Option>
            <Select.Option value="Tamil">Tamil</Select.Option>
            <Select.Option value="Telugu">Telugu</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Poster URL" name="posterUrl">
          <Input
            prefix={<PictureOutlined />}
            placeholder="Enter poster URL"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button type="primary" htmlType="submit" size="large">
            {selectedMovie ? "Update Movie" : "Add Movie"}
          </Button>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default Movieform;