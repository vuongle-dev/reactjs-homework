import { Button, Flex, Form, Space, message } from "antd";
import Title from "antd/es/typography/Title";
import React from "react";
import useAdd from "../hooks/useAdd";

type Props = {
  subject: string;
  title?: string;
  currentform: React.ReactElement;
};

export default function AddSubject({ subject, currentform, title }: Props) {
  const [addSubject] = Form.useForm();
  const [data, setData] = React.useState(null);
  const [success] = useAdd(subject, data);
  const submitAddSubject = (data: any) => {
    setData(data);
    success && addSubject.resetFields();
  };
  return (
    <Flex vertical>
      <Title level={3}>{title}</Title>
      {React.cloneElement(currentform, {
        form: addSubject,
        onFinish: submitAddSubject,
      })}

      <Form.Item wrapperCol={{ offset: 6 }}>
        <Space>
          <Button type="primary" onClick={() => addSubject.submit()}>
            Add this Category
          </Button>
          <Button onClick={() => addSubject.resetFields()}>Reset</Button>
        </Space>
      </Form.Item>
    </Flex>
  );
}
