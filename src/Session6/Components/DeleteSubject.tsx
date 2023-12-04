import React from "react";
import useDelete from "../hooks/useDelete";
import { Button, Popconfirm, message } from "antd";
import { AiOutlineDelete } from "react-icons/ai";
import usePatchSubject from "../hooks/usePatch";
<<<<<<< HEAD
// import useGetSubjects from "../hooks/useGet";
=======
import { useQueryClient } from "react-query";
import useGetSubjects from "../hooks/useGet";
>>>>>>> 77c325b05716067b2306681f50f308309570858b

type Props = { id: any; subject: string; title?: string };

export default function DeleteSubject({ id, subject, title }: Props) {
  const confirmDelete = useDelete(subject);
<<<<<<< HEAD
  // const deleteOrder = useDelete("orders");
  // const orders = useGetSubjects("orders");
  const patch = usePatchSubject("orders", id, true);
  const EmptyOrderDetail = async (data: any, id: any) => {
    try {
      await patch.mutateAsync(data);
=======
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
>>>>>>> 77c325b05716067b2306681f50f308309570858b
    } catch (error) {
      console.log(error);
    } finally {
      confirmDelete.mutate(id);
    }
  };
<<<<<<< HEAD
  // hàm delete product mà đang bug
  // const emptyOrder = async (id: any) => {
  //   const matchOrders: any[] = [];
  //   orders.isSuccess &&
  //     orders.data?.map((value) => {
  //       value.orderDetails.some((value: any) => {
  //         return value.product.id == id;
  //       }) && matchOrders.push(value.id);
  //     });
  //   console.log(matchOrders);
  //   try {
  //     const todo = await matchOrders?.forEach((value: any) => {
  //       EmptyOrderDetail({ orderDetails: [] }, value.id);
  //       deleteOrder.mutate(value);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     confirmDelete.mutate(id);
  //   }
  // };
=======
>>>>>>> 77c325b05716067b2306681f50f308309570858b

  return (
    <Popconfirm
      placement="topRight"
      title="Delete"
      description={
<<<<<<< HEAD
        subject === "orders"
          ? "Are you sure to delete this? This will empty order detail first"
          : "Are you sure to delete this?"
      }
      onConfirm={() => {
        subject === "orders"
          ? EmptyOrderDetail({ orderDetails: [] }, id)
=======
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
>>>>>>> 77c325b05716067b2306681f50f308309570858b
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
