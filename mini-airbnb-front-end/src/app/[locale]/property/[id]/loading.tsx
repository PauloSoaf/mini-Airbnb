"use client";

import {Skeleton, Space} from "antd";

export default function Loading() {
  return (
    <div className="bg-[var(--background)] text-[var(--foreground)] border border-[color:var(--color-foreground)]/10 rounded-xl p-4">
      <Space direction="vertical" size="large" className="w-full">
        <Skeleton active title paragraph={{rows: 2}} />
        <div className="w-full h-80 rounded-xl border border-[var(--border)] bg-[var(--elevated-bg)]" />
        <Skeleton active paragraph={{rows: 6}} />
      </Space>
    </div>
  );
}
