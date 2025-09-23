"use client";
import { fetchPosts } from "@/apis/mock.api";
import ImRobotComponent from "@/components/ImRobotComponent";
import ListOfPostComponent from "@/components/ListOfPostComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Home() {
  const params = useSearchParams();
  const router = useRouter();

  const tabs = params.get("tab") || "imrobot";



  if (tabs == "imrobot") {
    return <ImRobotComponent />;
  } else if (tabs == "list") {
    return <ListOfPostComponent />;
  } else {
    return <div></div>;
  }
}
