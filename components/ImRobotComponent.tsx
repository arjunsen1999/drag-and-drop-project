"use client";
import { Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function ImRobotComponent() {
  // ✅ router has proper type from next/navigation
  const router = useRouter();

  // ✅ token is a string | null
  const [token, setToken] = useState<string | null>(null);

  // ✅ onChange receives string | null
  const onChange = (value: string | null) => {
    setToken(value);
  };

  const handleClick = () => {
    if (token) {
      router.replace("?tab=list");
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-blue-100">
      <div className="w-[60vw] flex flex-col gap-5">
        <div className="w-full flex items-center justify-center">
          <Shield className="w-[100px] h-[100px] text-blue-600" />
        </div>
        <div className="w-full flex items-center justify-center">
          <h1 className="text-3xl font-semibold">
            <span className="text-blue-600">Google</span> reCAPTCHA
          </h1>
        </div>
        <div className="w-full flex items-center justify-center">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY ?? ""}
            onChange={onChange}
          />
        </div>
        <div className="w-full flex items-center justify-center">
          <button
            onClick={handleClick}
            className="bg-blue-600 text-white !py-3 !px-5 rounded-md cursor-pointer hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
