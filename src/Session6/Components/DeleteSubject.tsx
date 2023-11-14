import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Popconfirm } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

type Props = { id: number; subject: string; title?: string };

export default function DeleteSubject({ id, subject, title }: Props) {
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [confirmDelete] = useDelete(subject, deleteId);
  return (
    <Popconfirm
      placement="topRight"
      title="Delete"
      description={title}
      onConfirm={() => setDeleteId(id)}
      okText="Yes"
      cancelText="No"
    >
      <Button icon={<AiOutlineDelete />} danger>
        Delete
      </Button>
    </Popconfirm>
  );
}
