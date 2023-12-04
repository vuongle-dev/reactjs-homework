import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Popconfirm, message } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import usePatchSubject from "../hooks/usePatch";
import { useQueryClient } from "react-query";
import useGetSubjects from "../hooks/useGet";

type Props = { id: any; subject: string; title?: string };

export default function DeleteSubject({ id, subject, title }: Props) {
  const confirmDelete = useDelete(subject);
  const deleteOrder = useDelete("orders");
  const orders = useGetSubjects("orders");
  const patch = usePatchSubject("orders", id);
  const EmptyOrderDetail = async (data: any, id: any) => {
    try {
      const todo = await patch.mutateAsync(data);
    } catch (error) {
      console.log(error);
    } finally {
      confirmDelete.mutate(id);
    }
  };
  const emptyOrder = async (id: any) => {
    const matchOrders: any[] = [];
    orders.isSuccess &&
      orders.data?.map((value) => {
        value.orderDetails.some((value: any) => {
          return value.product.id == id;
        }) && matchOrders.push(value.id);
      });
    console.log(matchOrders);
    try {
      const todo = await matchOrders?.forEach((value: any) => {
        EmptyOrderDetail({ orderDetails: [] }, value.id);
        deleteOrder.mutate(value);
      });
    } catch (error) {
      console.log(error);
    } finally {
      confirmDelete.mutate(id);
    }
  };

  return (
    <Popconfirm
      placement="topRight"
      title="Delete"
      description={
        subject == "orders"
          ? "Are you sure to delete this? This will empty order detail first"
          : subject == "categories"
          ? "Are you sure to delete this? This will DELETE ALL RELATIVE PRODUCTS!!"
          : "Are you sure to delete this? This will DELETE ALL RELATIVE ORDERS!!"
      }
      onConfirm={() => {
        subject == "orders"
          ? EmptyOrderDetail({ orderDetails: [] }, id)
          : subject == "products"
          ? emptyOrder(id)
          : confirmDelete.mutate(id);
        confirmDelete.isLoading &&
          message.loading({
            key: "deletesubject",
            content: "Loading",
          });
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
