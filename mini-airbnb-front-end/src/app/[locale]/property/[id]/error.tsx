"use client";

import { Result } from "antd";


export default function Error() {
  return <Result status="500" title="Error" subTitle="Something went wrong." />;
}
