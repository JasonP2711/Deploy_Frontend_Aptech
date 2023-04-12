import axios from "axios";
import { useEffect, useState } from "react";
import { Space, Table, Tag, Form, Button, message, Modal, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
const URL = "http://localhost:9000/Categories";

interface DataType {
  id: string;
  name: string;
  Description: string;
}

function Index() {
  const columns: ColumnsType<DataType> = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "2%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "10%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
      render: (text, record, index) => {
        return <strong style={{ color: "red" }}>{text}</strong>;
      },
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: "1%",
      render: (text, record, index) => {
        return (
          <Space>
            <Button icon={<EditFilled />} onClick={() => onChange(record)}>
              
            </Button>
            <Button
              icon={<DeleteOutlined />}
              danger
              onClick={() => onRemove(record)}
            >
              {" "}
            </Button>
          </Space>
        );
      },
    },
  ];

  const [categories, setCategories] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<number>(0);
  const [updateID,setUpdateID] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  useEffect(() => {
    axios.get(URL).then((response) => {
      const { data } = response;
      setCategories(data);

      console.log(data);
    });
  }, [refresh]);

  const onFinish = (values: any) => {
    console.log(values);
    axios
      .post(URL, values)
      .then((response) => {
        message.success("Thêm mới thành công", 1.5);
        setRefresh((prev) => prev + 1);
        createForm.resetFields();
      })
      .catch((err) => {});
  };

  const onUpdateFinish = (values: any) => {
    console.log(values);
    axios
      .patch(URL + '/' + updateID, values)
      .then((response) => {
        message.success("Thêm mới thành công", 1.5);
        setRefresh((prev) => prev + 1);
        updateForm.resetFields();
      })
      .catch((err) => {});
      setOpen(false);
  };

  const onRemove = (value: any) => {
    console.log(value.id);
    axios
      .delete(URL + "/" + value.id)
      .then((response) => {
        message.success("Đã xóa thành công", 1.5);
        setRefresh((prev) => prev + 1);
      })
      .catch(() => {});
  };

  const onChange = (value: any) => {
    setOpen(true);
    updateForm.setFieldsValue(value);  
    setUpdateID(value.id)
  };


  return (
    <>
      {/* Create Form */}
      <div style={{ padding: 24 }}>
        <div style={{ height: 150 }}>
          <Form
            form={createForm}
            onFinish={onFinish}
            name="create-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              name="name"
              label="Tên danh mục"
              hasFeedback={true}
              required={true}
              rules={[
                {
                  required: true,
                  message: "Tên sản phẩm là bắt buộc",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="Ghi chu"
              required={true}
              rules={[
                {
                  required: true,
                  message: " bắt buộc phải có ghi chú",
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
      {/* Table */}
      <div>
        <Table rowKey={"id"} columns={columns} dataSource={categories} />
      </div>
      {/* <ul>
        {categories &&
          categories.map((item: any, index: number) => {
            return <li key={item.id}>{item.name}</li>;
          })}
      </ul> */}
    {/* update Form */}
      <Modal open={open} title='Cập nhật danh mục' onCancel={()=>setOpen(false)} cancelText="Đóng" okText="Thay đổi" onOk={()=>updateForm.submit()} >
        <div style={{ padding: 24 }}>
          <div style={{ height: 150 }}>
            <Form
              form={updateForm}
              onFinish={onUpdateFinish}
              name="update-form"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                name="name"
                label="Tên danh mục"
                hasFeedback={true}
                required={true}
                rules={[
                  {
                    required: true,
                    message: "Tên sản phẩm là bắt buộc",
                  },
                ]}
              >
                <input />
              </Form.Item>
              <Form.Item
                name="description"
                label="Ghi chu"
                required={true}
                rules={[
                  {
                    required: true,
                    message: " bắt buộc phải có ghi chú",
                  },
                ]}
              >
                <input />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Index;
