import { Alert, Button, Col, Form, Modal, Row, Space } from "antd";
import React from "react";
import usePatchSubject, {
  useCurrentId,
  usePatchPopup,
} from "../hooks/usePatch";
import { useQueryClient } from "react-query";

type Props = {
  subject: string;
  title?: string;
  currentform: React.ReactElement;
};

export default function PatchSubject({ subject, currentform, title }: Props) {
  const setPatchPopup = usePatchPopup((state) => state.setPatchPopup);
  const patchPopup = usePatchPopup((state) => state.patchPopup);
  const [patchSubject] = Form.useForm();
  const currentId = useCurrentId((state) => state.currentId);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const query = usePatchSubject(subject, currentId);
  const queryClient = useQueryClient();
  const submitPatchSubject = (data: any) => {
    query.mutate(data);
  };
  return (
    <Modal
      title={title}
      open={patchPopup}
      onCancel={() => {
        setPatchPopup(false);
        patchSubject.resetFields();
        setCurrentId(null);
      }}
      width="70vw"
      footer=<Row>
        <Col span={6} />
        <Col>
          <Space>
            <Button type="primary" onClick={() => patchSubject.submit()}>
              Change this {subject}
            </Button>
            <Button
              onClick={() => {
                setPatchPopup(false);
                patchSubject.resetFields();
                setCurrentId(null);
              }}
            >
              Cancel
            </Button>
          </Space>
        </Col>
      </Row>
    >
      {React.cloneElement(currentform, {
        form: patchSubject,
        onFinish: submitPatchSubject,
        initialValues: queryClient
          .getQueryData<any[]>([subject])
          ?.find((subject: any) => {
            return subject.id === currentId;
          }),
      })}

      {query.isLoading && <Alert message="Submitting" type="info" />}
      {query.isError &&
        (query.error.response ? (
          <Alert
            message={query.error.response.data.message}
            type="error"
            showIcon
            closable
          />
        ) : (
          <Alert message="Lost Connection" type="error" showIcon />
        ))}
    </Modal>
  );
}
