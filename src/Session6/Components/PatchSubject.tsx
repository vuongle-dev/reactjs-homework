import { Alert, Button, Col, Form, Modal, Row, Space } from "antd";
import React from "react";
import usePatch, { useCurrentId, usePatchPopup } from "../hooks/usePatch";
import { useGetSubject, useRefresh } from "../hooks/useGet";

type Props = {
  subject: string;
  title?: string;
  currentform: React.ReactElement;
};

export default function PatchSubject({ subject, currentform, title }: Props) {
  const setRefresh = useRefresh((state) => state.setRefresh);
  const setPatchPopup = usePatchPopup((state) => state.setPatchPopup);
  const patchPopup = usePatchPopup((state) => state.patchPopup);
  const [patchSubject] = Form.useForm();
  const [data, setData] = React.useState(null);
  const currentId = useCurrentId((state) => state.currentId);
  const setCurrentId = useCurrentId((state) => state.setCurrentId);
  const [error] = usePatch(subject, currentId, data);
  const [initialData] = useGetSubject(subject, currentId);
  const refresh = () => {
    patchSubject.resetFields();
    setRefresh();
    setPatchPopup(false);
  };
  const submitPatchSubject = (data: any) => {
    setData(data);
    !error && refresh();
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
              Change this Category
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
      {initialData &&
        React.cloneElement(currentform, {
          form: patchSubject,
          onFinish: submitPatchSubject,
          initialValues: initialData,
        })}

      {error && <Alert message={error} type="error" showIcon closable />}
    </Modal>
  );
}
