"use client";

import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import {Card, Image, Rate, Space, Tag, Typography} from "antd";
import {PropertyItem} from "@/lib/api/properties";

export default function PropertyCard({
  id,
  imageUrl,
  title,
  city,
  state,
  country,
  pricePerNight,
  rating,
  reviewsCount,
  type,
  isAvailable
}: PropertyItem) {
  const locale = useLocale();
  const t = useTranslations("property");

  return (
    <Link href={`/${locale}/property/${id}`} className="block">
      <Card hoverable cover={<Image src={imageUrl} alt={title} preview={false} />}>
        <Space direction="vertical" className="w-full">
          <div className="flex items-start justify-between">
            <Typography.Text strong>{title}</Typography.Text>
            <Tag color={isAvailable ? "green" : "red"}>
              {isAvailable ? t("available") : t("unavailable")}
            </Tag>
          </div>

          <Typography.Text className="text-[var(--muted)]">
            {city}, {state}, {country}
          </Typography.Text>

          <div className="flex items-center justify-between">
            <Typography.Text>
              R$ {pricePerNight} {t("perNight")}
            </Typography.Text>
            <div className="flex items-center gap-2">
              <Rate allowHalf disabled value={rating} />
              <span className="text-sm text-[var(--muted)]">
                {t("ratingCount", {count: reviewsCount})}
              </span>
            </div>
          </div>

          <Typography.Text className="text-[var(--muted)]">{type}</Typography.Text>
        </Space>
      </Card>
    </Link>
  );
}
