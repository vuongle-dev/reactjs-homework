import Table, { ColumnsType } from "antd/es/table";
import React from "react";
import { Flex, Spin } from "antd";
import Title from "antd/es/typography/Title";
import useGetSubjects, { useRefresh } from "../hooks/useGet";

type Props = {
  subject: string;
  title?: string;
  subjectColumn: ColumnsType<any>;
};

export default function GetSubjects({ subject, title, subjectColumn }: Props) {
  const refresh = useRefresh((state) => state.refresh);
  const [data] = useGetSubjects(subject);

  return (
    <Flex vertical>
      <Title level={3}>{title}</Title>
      {data.length == 0 ? (
        <Spin />
      ) : (
        <Table
          rowKey="id"
          columns={subjectColumn}
          dataSource={data}
          scroll={{ x: 400, y: 700 }}
        />
      )}
    </Flex>
  );
}
