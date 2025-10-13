"use client";

import {useMemo, useState} from "react";
import {Button, Card, Empty, Image, Modal, Rate, Tag} from "antd";
import {useTranslations} from "next-intl";
import { mockProperties } from "@/lib/mockProperties";

type Props = {id: string};

export default function PropertyDetails({id}: Props) {
  const t = useTranslations("details");
  const [open, setOpen] = useState(false);

  const item = useMemo(() => mockProperties.find((p) => String(p.id) === String(id)), [id]);

  if (!item) {
    return (
      <Card className="bg-[var(--background)] text-[var(--foreground)]">
        <Empty description="Not found" />
      </Card>
    );
  }

  const images = [item.imageUrl, item.imageUrl + "&1", item.imageUrl + "&2"];

  return (
    <>
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Image.PreviewGroup>
            <div className="grid grid-cols-2 gap-2">
              <Image src={images[0]} alt={item.title} className="col-span-2 rounded-xl" />
              <Image src={images[1]} alt="" />
              <Image src={images[2]} alt="" />
            </div>
          </Image.PreviewGroup>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h1 className="text-2xl font-semibold">{item.title}</h1>
          <div className="flex flex-wrap items-center gap-2">
            <Tag color={item.isAvailable ? "green" : "volcano"}>
              {item.isAvailable ? t("available") : t("unavailable")}
            </Tag>
            <span>{item.city}, {item.state} • {item.country}</span>
          </div>

          <div className="flex items-center gap-2">
            <Rate allowHalf disabled value={item.rating} />
            <span>{item.rating} ({item.reviewsCount})</span>
          </div>

          <div className="text-xl">
            {t("pricePerNight")}: R$ {item.pricePerNight}
          </div>

          <div>
            <h2 className="font-medium mb-1">{t("amenities")}</h2>
            <div className="flex flex-wrap gap-2">
              {(item.amenities || []).map((a) => (
                <Tag key={a}>{a}</Tag>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-medium mb-1">{t("description")}</h2>
            <p className="text-[var(--muted)]">
              {item.title} — {item.bedrooms} quartos • {item.guests} hóspedes • {item.type}
            </p>
          </div>

          <div>
            <Button type="primary" onClick={() => setOpen(true)} disabled={!item.isAvailable}>
              {t("book")}
            </Button>
          </div>
        </div>
      </div>

      <Modal open={open} onCancel={() => setOpen(false)} onOk={() => setOpen(false)} okText="OK">
        {t("booked")}
      </Modal>
    </>
  );
}
