import React from "react";
import { useGetSubject } from "../hooks/useGet";
import { Button, Divider, Flex, Form, InputNumber, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import Title from "antd/es/typography/Title";

type Props = {
  subject: string;
  title?: string;
  subjectColumn: ColumnsType<any>;
};

interface getschemaInput {
  subjectid: number;
}

export default function GetSubject({ subject, title, subjectColumn }: Props) {
  const [loading, setLoading] = React.useState(false);
  const [getId, setGetId] = React.useState<number | null>(null);
  const [getsubject] = Form.useForm();
  const [data] = useGetSubject(subject, getId, setLoading);
  const submitGetSubject = (submitInput: getschemaInput) => {
    setGetId(submitInput.subjectid);
    getsubject.resetFields();
  };
  return (
    <Flex vertical>
      <Title level={3}>{title}</Title>
      <Form
        form={getsubject}
        onFinish={submitGetSubject}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item
          name="subjectid"
          rules={[
            { required: true, message: "ID must be required" },
            { type: "number", message: "ID must be a number" },
            { type: "integer", message: "ID must be interger" },
          ]}
        >
          <InputNumber
            type="number"
            name="subjectid"
            min={1}
            step={1}
          ></InputNumber>
        </Form.Item>
        <Button loading={loading} onClick={() => getsubject.submit()}>
          Get this Category ID
        </Button>
      </Form>
      <Divider plain />
      {data && (
        <>
          <Table
            columns={subjectColumn}
            dataSource={[data]}
            pagination={false}
            rowKey="id"
            scroll={{ x: 400 }}
          />
        </>
      )}
    </Flex>
  );
}
