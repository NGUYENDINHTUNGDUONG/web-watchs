/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {  Collapse, message } from "antd";
import moment from "moment";
import * as CommentService from "../../services/CommentService";
import { addComments } from "../../redux/slides/commentSlide";

export default function Comment({ productId }) {
  const [reply, setReply] = useState("");
  const [Id, setId] = useState();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const access_token = localStorage.getItem("access_token");
  const auth = useSelector((state) => state.user);
  const avatar = auth?.fullName.charAt(0).toUpperCase();
  const commentRequest = async () => {
    const data = {
      productId: productId,
      limitPerPage: 1000,
    };
    const res = await CommentService.getComment(data);
    const response = res.data;

    if (response) {
      dispatch(addComments({ comments: response }));
    }
  };
  const comments = useSelector((state) => state.comment.comments);
  useEffect(() => {
    commentRequest();
  }, [productId]);

  const handleCancel = () => {
    setValue("");
  };

  const handleComment = async () => {
    const data2 = {
      productId: productId,
      content: value,
    };

    const response = await CommentService.createComment(data2, access_token);

    if (response) {
      setValue("");
      message.success("Comment successfully!");
      commentRequest();
      setReply("");
    }
  };
  const handleCommentReply = async (parentId, receiver) => {
    const data = {
      productId: productId,
      content: value,
      parentId: parentId,
      receiver: receiver,
    };

    const response = await CommentService.createComment(data, access_token);
    if (response) {
      setValue("");
      message.success("Comment successfully!");
      commentRequest();
      setReply("");
    }
  };
  const { Panel } = Collapse;
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className=" ">
          <div className="">
            <div className="border-none ml-auto">
              <div className="mt-2 flex flex-col  p-3 bg-white">
                <div className="flex items-center ">
                  <div
                    className={`border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                  >
                    <p className=" text-black w-8 h-8 text-xl m-0">{avatar}</p>
                  </div>
                  <input
                    type="text"
                    className="px-5 h-12 w-full rounded-3xl border-solid border-gray-200 focus:!bg-gray-50  focus:!outline-none focus:!border-solid focus:!border-gray-500 focus:border-1"
                    placeholder="Enter your comment..."
                    value={value}
                    onChange={handleChange}
                  />
                </div>
                <div className=" mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      handleCancel();
                    }}
                    className="bg-slate-100 font-bold text-sm h-9 w-24 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleComment}
                    disabled={value.length === 0 ? true : false}
                    className="bg-slate-100 font-bold text-sm h-9 w-28 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                  >
                    Comment
                  </button>
                </div>
              </div>
              <div className="mt-2">
                {comments?.map((item, index) => {
                  return (
                    <div key={index}>
                      <div className="flex flex-row p-3">
                        <div
                          className={`h-fit border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                        >
                          <p className=" text-black w-8 h-8 text-xl m-0">
                            {item.sender.fullName.charAt(0).toUpperCase()}
                          </p>
                        </div>
                        <div className="w-full">
                          <div className="flex justify-between items-center">
                            <div className="flex flex-row items-center">
                              <span className="mr-2 text-lg font-bold">
                                {item.sender.fullName}
                              </span>
                            
                            </div>
                            <small>
                              {moment(item.createdAt).format("DD/MM/YYYY")}
                            </small>
                          </div>
                          <p className="text-justify text-sm mb-0 mt-1 break-words">
                            {item.content}
                          </p>
                          <div className="">
                            <div className="flex justify-between">
                              <p
                                onClick={() => setReply(item._id)}
                                className=" hover:cursor-pointer bg-slate-100 h-7 w-16 rounded-full hover:bg-gray-200 flex justify-center items-center"
                              >
                                Reply
                              </p>
                            </div>
                            {reply === item._id ? (
                              <div className=" flex flex-col  p-3 bg-white">
                                <div className="flex items-center ">
                                  <div
                                    className={`border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                                  >
                                    <p className=" text-black w-7 h-7 text-xl m-0">
                                      {avatar}
                                    </p>
                                  </div>
                                  <input
                                    type="text"
                                    className="px-5 h-10 w-full rounded-3xl border-solid border-gray-200 !outline-none focus:!bg-gray-50  focus:!outline-none focus:!border-solid focus:!border-gray-500 focus:border-1"
                                    placeholder="Enter your comment..."
                                    value={value}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className=" mt-3 flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleCancel();
                                      setReply("");
                                    }}
                                    className="bg-slate-100 font-bold text-sm h-9 w-24 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      handleCommentReply(
                                        item._id,
                                        item.sender._id
                                      );
                                      setReply("");
                                    }}
                                    disabled={value.length === 0 ? true : false}
                                    className="bg-slate-100 font-bold text-sm h-9 w-28 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                                  >
                                    Comment
                                  </button>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            <Collapse
                              bordered={false}
                              className="!bg-transparent"
                            >
                              {item.answers && item.answers.length > 0 ? (
                                <>
                                  <Panel
                                    header={
                                      item.answers.filter(
                                        (val) => val.sender._id !== auth.id
                                      ).length + " replies"
                                    }
                                    key={0}
                                    className="headerReply !border-none"
                                  >
                                    {item.answers &&
                                      item.answers
                                        .filter(
                                          (val) => val.sender._id !== auth.id
                                        )
                                        .map((val, id) => {
                                          return (
                                            <div key={id}>
                                              <div className="flex flex-row p-3">
                                                <div
                                                  className={`h-fit border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                                                
                                                >
                                                  <p className=" text-black w-7 h-7 text-lg m-0">
                                                    {val.sender.fullName
                                                      .charAt(0)
                                                      .toUpperCase()}
                                                  </p>
                                                </div>
                                                <div className="w-full">
                                                  <div className="flex justify-between items-center">
                                                    <div className="flex flex-row items-center">
                                                      <span className="mr-2 text-lg font-bold">
                                                        {val.sender.fullName}
                                                      </span>
                                                    </div>
                                                    <small>
                                                      {moment(
                                                        val.createdAt
                                                      ).format("DD/MM/YYYY")}
                                                    </small>
                                                  </div>
                                                  <p className="text-justify text-sm mb-0 mt-1 break-words">
                                                    {val.sender._id ===
                                                    val.receiver?._id ? (
                                                      ""
                                                    ) : (
                                                      <span className="font-bold">
                                                        @
                                                        {val.receiver?.fullName}
                                                      </span>
                                                    )}
                                                    {" " + val.content}
                                                  </p>
                                                  <div className="">
                                                    <div className="flex justify-between">
                                                      <p
                                                        onClick={() => {
                                                          setReply(val._id);
                                                          setId(item._id);
                                                        }}
                                                        className=" text-sm hover:cursor-pointer bg-slate-100 h-6 w-14 rounded-full hover:bg-gray-200 flex justify-center items-center"
                                                      >
                                                        Reply
                                                      </p>
                                                    </div>
                                                    {val.parentId === Id &&
                                                    reply === val._id ? (
                                                      <div className=" flex flex-col  p-3 bg-white">
                                                        <div className="flex items-center ">
                                                          <div
                                                            className={`border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                                                           
                                                          >
                                                            <p className=" text-black w-6 h-6 m-0">
                                                              {avatar}
                                                            </p>
                                                          </div>
                                                          <input
                                                            type="text"
                                                            className="px-5 h-8 w-full rounded-3xl border-solid border-gray-200 focus:!bg-gray-50  focus:!outline-none focus:!border-solid focus:!border-gray-500 focus:border-1"
                                                            placeholder="Enter your comment..."
                                                            value={value}
                                                            onChange={
                                                              handleChange
                                                            }
                                                          />
                                                        </div>
                                                        <div className=" mt-3 flex justify-end">
                                                          <button
                                                            type="button"
                                                            onClick={() => {
                                                              handleCancel();
                                                              setReply("");
                                                            }}
                                                            className="bg-slate-100 font-bold  h-7 w-16 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                                                          >
                                                            Cancel
                                                          </button>
                                                          <button
                                                            type="button"
                                                            onClick={() =>
                                                              handleCommentReply(
                                                                item._id,
                                                                item.sender._id
                                                              )
                                                            }
                                                            disabled={
                                                              value.length === 0
                                                                ? true
                                                                : false
                                                            }
                                                            className="bg-slate-100 font-bold  h-7 w-17 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                                                          >
                                                            Comment
                                                          </button>
                                                        </div>
                                                      </div>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          );
                                        })}
                                  </Panel>
                                  {item.answers
                                    .filter((val) => val.sender._id === auth.id)
                                    .map((val, id) => {
                                      return (
                                        <>
                                          <div key={id}>
                                            <div className="flex flex-row mt-3 px-7">
                                              <div
                                                className={`h-fit border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                                               
                                              >
                                                <p className=" text-black w-7 h-7 text-lg m-0">
                                                  {val.sender.fullName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                                </p>
                                              </div>
                                              <div className="w-full">
                                                <div className="flex justify-between items-center">
                                                  <div className="flex flex-row items-center">
                                                    <span className="mr-2 text-lg font-bold">
                                                      {val.sender.fullName}
                                                    </span>
                                                  </div>
                                                  <small>
                                                    {moment(
                                                      val.createdAt
                                                    ).format("DD/MM/YYYY")}
                                                  </small>
                                                </div>
                                                <p className="text-justify text-sm mb-0 mt-1 break-words">
                                                  {val.sender._id ===
                                                  val.receiver?._id ? (
                                                    ""
                                                  ) : (
                                                    <span className="font-bold">
                                                      @{val.receiver}
                                                    </span>
                                                  )}
                                                  {" " + val.content}
                                                </p>
                                                <div className="">
                                                  <div className="flex justify-between">
                                                    <p
                                                      onClick={() => {
                                                        setReply(val._id);
                                                        setId(item._id);
                                                      }}
                                                      className=" text-sm hover:cursor-pointer bg-slate-100 h-6 w-14 rounded-full hover:bg-gray-200 flex justify-center items-center"
                                                    >
                                                      Reply
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          {val.parentId === Id &&
                                          reply === val._id ? (
                                            <div className=" flex flex-col  p-3 bg-white">
                                              <div className="flex items-center ">
                                                <div
                                                  className={`border-solid rounded-full  border-[1px]   text-center bg-transparent text-white mr-2`}
                                                 
                                                >
                                                  <p className=" text-black w-6 h-6 m-0">
                                                    {avatar}
                                                  </p>
                                                </div>
                                                <input
                                                  type="text"
                                                  className="px-5 h-8 w-full rounded-3xl border-solid border-gray-200 focus:!bg-gray-50  focus:!outline-none focus:!border-solid focus:!border-gray-500 focus:border-1"
                                                  placeholder="Enter your comment..."
                                                  value={value}
                                                  onChange={handleChange}
                                                />
                                              </div>
                                              <div className=" mt-3 flex justify-end">
                                                <button
                                                  type="button"
                                                  onClick={() => {
                                                    handleCancel();
                                                    setReply("");
                                                  }}
                                                  className="bg-slate-100 font-bold  h-7 w-16 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                                                >
                                                  Cancel
                                                </button>
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    handleCommentReply(
                                                      item._id,
                                                      item.sender._id
                                                    )
                                                  }
                                                  disabled={
                                                    value.length === 0
                                                      ? true
                                                      : false
                                                  }
                                                  className="bg-slate-100 font-bold  h-7 w-17 rounded-full mr-8 border-none hover:bg-gray-200 cursor-pointer"
                                                >
                                                  Comment
                                                </button>
                                              </div>
                                            </div>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}
                                </>
                              ) : null}
                            </Collapse>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
