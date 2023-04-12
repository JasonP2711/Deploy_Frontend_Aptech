import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Form, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { text } from "stream/consumers";

const URL = "http://localhost:9000/Employee";

interface DataType {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Address: string;
  Email: string;
  Birthday: string;
  ID: number;
}

function Categories() {
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "PhoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Birthday",
      dataIndex: "birthDay",
      key: "birthDay",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (text, record, Index) => {
        return (
          <>
            <Space>
              <Button
                
                
                 icon={<EditFilled />} onClick={() => onChange(record)}>
              </Button>
              <Button 
              style={{ color: "red" }}
                icon={<DeleteOutlined />}
                onClick={()=>onDelete(record)}
              ></Button>
            </Space>
          </>
        );
      },
    },
  ];

  const [customer, setCustomer] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [openUpdate,setOpenUpdate] = useState<boolean>(false)
  const [updateID, setUpdateID] = useState<number>(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    axios.get(URL).then((response) => {
      const { data } = response;
      setCustomer(data);
      console.log(customer);
    });
  }, [refresh]);

  const handleSubmit = (value:any) =>{
    axios.post(URL,value).then((response) => {
        message.success("Thêm mới thành công", 1.5);
        console.log(customer);
        setRefresh((prev)=>prev+1)
      });
  }

  const handleChangeInfor = (value:any) =>{
    axios.patch(URL + '/' + updateID,value).then((response)=>{
      message.success("Thay đổi thành công", 1.5);
      setRefresh((prev)=>prev+1)
    })
  }


  const onChange = (value:any) =>{
    setOpenUpdate(true);
    updateForm.setFieldsValue(value);  
    setUpdateID(value.id) 
  }

  const onDelete = (value:any) =>{
    axios.delete(URL + '/' + value.id).then((response)=>{
      console.log(value.id);
      message.success("Thay đổi thành công", 1.5);
      setRefresh((prev)=>prev+1);
    })
  }

  return (
    <>
      {/* create form */}
      <div style={{ margin: 25 }}>
        <Form
          form={createForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "Please input employee first name!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Please input employee last name!" },
            ]}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input employee phone number!",
              },
            ]}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input employee address!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input employee email!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthDay"
            rules={[
              { required: true, message: "Please input employee birthday!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* Table content */}
      <Table rowKey={"id"} columns={columns} dataSource={customer} />;
      {/* Update Form */}
      <Modal open={openUpdate} onCancel={()=>setOpenUpdate(false)} onOk={()=>setOpenUpdate(false)}>
        <Form
          form={updateForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={handleChangeInfor}
        >
          <Form.Item
            label="First name"
            name="firstName"
            rules={[
              { required: true, message: "Please input employee first name!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Last name"
            name="lastName"
            rules={[
              { required: true, message: "Please input employee last name!" },
            ]}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            label="Phone number"
            name="phoneNumber"
            rules={[
              {
                required: true,
                message: "Please input employee phone number!",
              },
            ]}
          >
            <input type="text" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              { required: true, message: "Please input employee address!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input employee email!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item
            label="Birthday"
            name="birthDay"
            rules={[
              { required: true, message: "Please input employee birthday!" },
            ]}
          >
            <input type="text" />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default Categories;
