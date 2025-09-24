"use client";

import { Suspense } from "react";
import ImRobotComponent from "@/components/ImRobotComponent";
import ListOfPostComponent from "@/components/ListOfPostComponent";
import { useSearchParams } from "next/navigation";

function PageContent() {
  const params = useSearchParams();
  const tab = params.get("tab") || "imrobot";


  

  if (tab === "imrobot") {
    return <ImRobotComponent />;
  } else if (tab === "list") {
    return <ListOfPostComponent />;
  } else {
    return <div />;
  }
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PageContent />
    </Suspense>
  );
}
