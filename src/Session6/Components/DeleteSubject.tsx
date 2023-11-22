import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Popconfirm, message } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

type Props = { id: any; subject: string; title?: string };

export default function DeleteSubject({ id, subject, title }: Props) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const confirmDelete = useDelete(subject);
  return (
    <Popconfirm
      placement="topRight"
      title="Delete"
      description={title}
      onPopupClick={() => {
        setDeleteId(id);
      }}
      onConfirm={() => {
        confirmDelete.mutate(id);
        confirmDelete.isLoading &&
          message.loading({
            key: "deletesubject",
            content: "Loading",
          });
        confirmDelete.isSuccess && setDeleteId(null);
      }}
      onCancel={() => {
        setDeleteId(null);
      }}
      okText="Yes"
      cancelText="No"
    >
      <Button icon={<AiOutlineDelete />} danger>
        Delete
      </Button>
    </Popconfirm>
  );
}
