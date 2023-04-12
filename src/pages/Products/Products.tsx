import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Space,
  Button,
  Table,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const URL = "http://localhost:9000/Products";

interface DataType {
  name: string;
  price: number;
  discount: number;
  stock: number;
  categoriesID: number;
  suppliesID: number;
  description: string;
  id: number;
}

function Products() {
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "CategoriesID",
      dataIndex: "categoriesID",
      key: "categoriesID",
    },
    {
      title: "SuppliesID",
      dataIndex: "suppliesID",
      key: "suppliesID",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
              onClick={() => onChange(record)}
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

  const [product, setProduct] = useState<any[]>([]);
  const [fresh, setFresh] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [updateID, setUpdateId] = useState<number>(0);
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  useEffect(() => {
    axios.get(URL).then((response: any) => {
      const { data } = response;
      setProduct(data);
    });
  }, [fresh]);

  const onDelete = (value: any) => {
    axios.delete(URL + "/" + value.id).then((response) => {
      message.success("Delete!");
      setFresh((prev) => prev + 1);
    });
  };

  const onFinish = (value: any) => {
    console.log(value);
    axios
      .post(URL, value)
      .then((response) => {
        message.success("Thêm mới thành công", 1.5);
        setFresh((prev) => prev + 1);
        createForm.resetFields();
      })
      .catch((err) => {});
  };

  const onUpdateFinish = (value: any) => {
    axios.patch(URL + "/" + updateID, value).then((response) => {
      setFresh((prev) => prev + 1);
      message.success("Edit success!");
      updateForm.resetFields();
      setOpen(false);
    });
  };

  const onChange = (value: any) => {
    setOpen(true);
    updateForm.setFieldsValue(value);
    setUpdateId(value.id);
    console.log(value);
  };

  return (
    <>
      <div>
        {/* create form */}
        <Form
          form={createForm}
          name="create-Form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 10 }}
          onFinish={onFinish}
        >
          <Form.Item name="name" required={true} label={"Name product"}>
            <Input />
          </Form.Item>
          <Form.Item name="price" required={true} label={"Price"}>
            <Input />
          </Form.Item>
          <Form.Item name="discount" required={true} label={"Discount"}>
            <Input />
          </Form.Item>
          <Form.Item name="stock" required={true} label={"Stock"}>
            <Input />
          </Form.Item>
          <Form.Item name="categoriesID" required={true} label={"CategoriesID"}>
            <Input />
          </Form.Item>
          <Form.Item name="suppliesID" required={true} label={"SuppliesID"}>
            <Input />
          </Form.Item>
          <Form.Item name="description" required={true} label={"Description"}>
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Table rowKey={"id"} columns={columns} dataSource={product} />;
      {/* updateForm */}
      <Modal
        title="Cập nhật danh mục"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => updateForm.submit()}
      >
        <Form
          form={updateForm}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onUpdateFinish}
        >
          <Form.Item
            required={true}
            name="name"
            label={"Name product"}
            hasFeedback={true}
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
            name="price"
            required={true}
            hasFeedback={true}
            label={"Price"}
            rules={[
              {
                required: true,
                message: "Giá sản phẩm là bắt buộc",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            required={true}
            label={"Discount"}
            rules={[
              {
                required: true,
                message: " bắt buộc",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="stock"
            required={true}
            label={"Stock"}
            rules={[
              {
                required: true,
                message: "bắt buộc",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="categoriesID"
            required={true}
            label={"CategoriesID"}
            rules={[
              {
                required: true,
                message: "bắt buộc",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="suppliesID"
            required={true}
            label={"SuppliesID"}
            rules={[
              {
                required: true,
                message: " bắt buộc",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            required={true}
            label={"Description"}
            rules={[
              {
                required: true,
                message: "Mô tả sản phẩm là bắt buộc",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Products;
