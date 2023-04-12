import axios from "axios";
import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Form, Input, Button, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const URL = "http://localhost:9000/Supplier";

interface DataType {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}



function Supplier() {

  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record, index) => {
        return (
          <Space>
            <Button
              icon={<EditOutlined />}
            ></Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => onDelete(record)}
            ></Button>
          </Space>
        );
      },
    },
  ];

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    axios.get(URL).then((response: any) => {
      const { data } = response;
      setSuppliers(data);
    });
  }, [refresh]);

  const onFinish = (value: any) => {
    console.log(value);
    axios
      .post(URL, value)
      .then((response) => {
        message.success("Submit success");
        setRefresh(prev=>prev+1)
      })
      
  };

  const onDelete = (value: any) => {
    axios.delete(URL + "/" + value.id).then((response) => {
      message.success("Delete!");
      console.log(response);
      console.log(suppliers);
      setRefresh((prev) => prev + 1);
    });
  };

  return (
    <>
      <div style={{ margin: 25 }}>
        {/* Input Form */}
        <Form
          form={createForm}
          onFinish={onFinish}
          name="create-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
        >
          <Form.Item
            label="Company Name"
            name="name"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            hasFeedback={true}
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            hasFeedback={true}
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Number Phone"
            name="phoneNumber"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            hasFeedback={true}
            rules={[
              { required: true, message: "Please input your numberphone!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 8 }}
            hasFeedback={true}
            rules={[
              { required: true, message: "Please input your numberphone!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Table */}
      <Table rowKey={"id"} columns={columns} dataSource={suppliers} />
    </>
  );
}
export default Supplier;
