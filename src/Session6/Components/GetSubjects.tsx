import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { Alert, Flex, Spin, message } from "antd";
import Title from "antd/es/typography/Title";
import useGetSubjects, { useRefresh } from "../hooks/useGet";

type Props = {
  subject: string;
  title?: string;
  subjectColumn: ColumnsType<any>;
};

export default function GetSubjects({ subject, title, subjectColumn }: Props) {
  const refresh = useRefresh((state) => state.refresh);
  const query = useGetSubjects(subject);

  return (
    <Flex vertical>
      <Title level={3}>{title}</Title>
      {query.isLoading ? (
        <Spin />
      ) : query.isError ? (
        <Alert message={query.error.message} type="error" closable />
      ) : (
        <Table
          rowKey="id"
          columns={subjectColumn}
          dataSource={query.data}
          scroll={{ x: 400, y: 700 }}
        />
      )}
    </Flex>
  );
}
