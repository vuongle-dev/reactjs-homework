import React from "react";
import useAuth from "../hooks/useAuth";
import { useCurrentId } from "../hooks/usePatch";
import { ColumnsType } from "antd/es/table";
import useTableColumn from "../hooks/useTableColumns";
import { Flex } from "antd";
import GetSubject from "./GetSubject";
import AddSubject from "./AddSubject";
import GetSubjects from "./GetSubjects";
import PatchSubject from "./PatchSubject";

type Props = {
  subjects: string;
  subject: string;
  defaultColumns: ColumnsType<any>;
  currentform: React.ReactElement;
};

export default function SubjectTemplate({
  subjects,
  subject,
  defaultColumns,
  currentform,
}: Props) {
  const loggedInUser = useAuth((state) => state.loggedInUser);
  const currentId = useCurrentId((state) => state.currentId);
  const [categoryColumn] = useTableColumn("categories", defaultColumns);

  return (
    <Flex vertical gap={15}>
      <GetSubject
        subject={subjects}
        subjectColumn={categoryColumn}
        title={"Get " + subject + " by ID"}
      />
      {loggedInUser && (
        <AddSubject
          currentform={currentform}
          subject={subject}
          title={"Add " + subject}
        />
      )}
      <GetSubjects
        subject={subjects}
        subjectColumn={categoryColumn}
        title={"All " + subjects}
      />
      {loggedInUser && (
        <>
          {currentId && (
            <PatchSubject
              currentform={currentform}
              subject={subjects}
              title={"Patch " + subject}
            />
          )}
        </>
      )}
    </Flex>
  );
}
