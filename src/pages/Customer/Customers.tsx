import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Input, Form, message, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";

const URL = "http://localhost:9000/Customer";

interface DataType {
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Address: string;
  Email: string;
  Birthday: string;
}

function Categories() {
  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "FirstName",
      key: "FirstName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Name",
      dataIndex: "LastName",
      key: "LastName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Phone Number",
      dataIndex: "PhoneNumber",
      key: "PhoneNumber",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
    },
    {
      title: "Birthday",
      dataIndex: "Birthday",
      key: "Birthday",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record, Index) => {
        return (
          <>
            <Space>
              <Button
                icon={<EditFilled />}
                onClick={() => handleEdit(record)}
              ></Button>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record)}
              ></Button>
            </Space>
          </>
        );
      },
    },
  ];

  const [customer, setCustomer] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [updateID, setUpdateID] = useState<number>();
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  useEffect(() => {
    axios.get(URL).then((response) => {
      const { data } = response;
      setCustomer(data);
      console.log(customer);
    });
  }, [refresh]);

  const onFinish = (value: any) => {
    axios.post(URL, value).then((response) => {
      message.success("post success");
      setRefresh((prev) => prev + 1);
      createForm.resetFields();
    });
  };

  const onUpdate = (values: any) => {
    console.log(values);
    axios
      .patch(URL + "/" + updateID, values)
      .then((response) => {
        message.success("Thêm mới thành công", 1.5);
        setRefresh((prev) => prev + 1);
        updateForm.resetFields();
      })
      .catch((err) => {});
    setOpen(false);
  };

  const handleDelete = (value: any) => {
    axios.delete(URL + "/" + value.id).then((response) => {
      message.success("delete succes");
      setRefresh((prev) => prev + 1);
    });
  };

  const handleEdit = (value: any) => {
    setOpen(true);
    updateForm.setFieldsValue(value);
    setUpdateID(value.id);
  };

  return (
    <>
      <div>
        {/* Create Form */}
        <div style={{ padding: 20 }}>
          <div style={{ height: 450 }}>
            <Form
              form={createForm}
              onFinish={onFinish}
              name="create-form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 8 }}
            >
              <Form.Item
                name="FirstName"
                label="FirstName"
                hasFeedback={true}
                required={true}
                rules={[
                  {
                    required: true,
                    message: "FirstName là bắt buộc",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="LastName"
                label="LastName"
                required={true}
                rules={[
                  {
                    required: true,
                    message: " bắt buộc phải có LastName",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="PhoneNumber"
                label="PhoneNumber"
                hasFeedback={true}
                required={true}
                rules={[
                  {
                    required: true,
                    message: "PhoneNumber là bắt buộc",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Address"
                label="Address"
                hasFeedback={true}
                required={true}
                rules={[
                  {
                    required: true,
                    message: "Address là bắt buộc",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Email"
                label="Email"
                hasFeedback={true}
                required={true}
                rules={[
                  {
                    required: true,
                    message: "Email là bắt buộc",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="Birthday"
                label="Birthday"
                hasFeedback={true}
                required={true}
                rules={[
                  {
                    required: true,
                    message: "Birthday là bắt buộc",
                  },
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
        </div>
      </div>

      <div>
        <Table rowKey={"id"} columns={columns} dataSource={customer} />;
      </div>

      <div>
        {/* update Form */}
        <Modal
          open={open}
          title="Cập nhật danh mục"
          onCancel={() => setOpen(false)}
          cancelText="Đóng"
          okText="Thay đổi"
          onOk={() => updateForm.submit()}
        >
          <div style={{ padding: 24 }}>
            <div style={{ height: 350 }}>
              <Form
                form={updateForm}
                onFinish={onUpdate}
                name="create-form"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 8 }}
              >
                <Form.Item
                  name="FirstName"
                  label="FirstName"
                  hasFeedback={true}
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "FirstName là bắt buộc",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="LastName"
                  label="LastName"
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: " bắt buộc phải có LastName",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="PhoneNumber"
                  label="PhoneNumber"
                  hasFeedback={true}
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "PhoneNumber là bắt buộc",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="Address"
                  label="Address"
                  hasFeedback={true}
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Address là bắt buộc",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="Email"
                  label="Email"
                  hasFeedback={true}
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Email là bắt buộc",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="Birthday"
                  label="Birthday"
                  hasFeedback={true}
                  required={true}
                  rules={[
                    {
                      required: true,
                      message: "Birthday là bắt buộc",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Form>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
}
export default Categories;
