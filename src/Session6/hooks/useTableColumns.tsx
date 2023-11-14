import React from "react";
import { Button, Space } from "antd";
import { ColumnType, ColumnsType } from "antd/es/table";
import { AiOutlineEdit } from "react-icons/ai";
import { useCurrentId, usePatchPopup } from "./usePatch";
import DeleteSubject from "../Components/DeleteSubject";
import useAuth from "./useAuth";

const useTableColumn = (subject: string, column: ColumnsType<any>) => {
  const loggedInUser = useAuth((state) => state.loggedInUser);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const setPatchPopup = usePatchPopup((state) => state.setPatchPopup);
  const actionColumn: ColumnType<any> = {
    title: "",
    dataIndex: "actions",
    key: "actions",
    fixed: "right",
    width: 200,
    render: (value: any, record: any, index: number) => {
      return (
        <Space>
          <Button
            icon={<AiOutlineEdit />}
            onClick={() => {
              setCurrentId(record.id);
              setPatchPopup(true);
            }}
          >
            Edit
          </Button>
          <DeleteSubject
            id={record.id}
            subject={subject}
            title={"Are you sure to delete this " + { subject } + "?"}
          />
        </Space>
      );
    },
  };
  const [categoryColumn, setCategoryColumn] =
    React.useState<ColumnsType<any>>(column);
  React.useEffect(() => {
    loggedInUser
      ? setCategoryColumn([...column, actionColumn])
      : setCategoryColumn(column);
  }, [loggedInUser]);
  return [categoryColumn];
};
export default useTableColumn;
