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
  defaultColumns: ColumnsType<any>;
  currentform: React.ReactElement;
};

export default function SubjectTemplate({
  defaultColumns,
  currentform,
}: Props) {
  const loggedInUser = useAuth((state) => state.loggedInUser);
  const currentId = useCurrentId((state) => state.currentId);
  const [categoryColumn] = useTableColumn("categories", defaultColumns);

  return (
    <Flex vertical gap={15}>
      <GetSubject
        subject="categories"
        subjectColumn={categoryColumn}
        title="Get Category by ID"
      />
      {loggedInUser && (
        <AddSubject
          currentform={currentform}
          subject="categories"
          title="Add Category"
        />
      )}
      <GetSubjects
        subject="categories"
        subjectColumn={categoryColumn}
        title="All Categories"
      />
      {loggedInUser && (
        <>
          {currentId && (
            <PatchSubject
              currentform={currentform}
              subject="categories"
              title="Patch Category"
            />
          )}
        </>
      )}
    </Flex>
  );
}
