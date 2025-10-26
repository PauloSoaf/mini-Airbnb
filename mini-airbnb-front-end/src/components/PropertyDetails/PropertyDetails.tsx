"use client";

import {useState} from "react";
import {Alert, Button, Card, Empty, Image, Modal, Rate, Space, Tag, message} from "antd";
import {useTranslations} from "next-intl";
import {useQuery, useMutation} from "@tanstack/react-query";
import {getPropertyById, simulateBooking} from "@/lib/api/properties";

type Props = { id: string };

export default function PropertyDetails({ id }: Props) {
  const t = useTranslations("details");
  const [open, setOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const { data: item, isLoading, isError, refetch } = useQuery({
    queryKey: ["property", id],
    queryFn: () => getPropertyById(id)
  });

const booking = useMutation({
  mutationFn: () =>
    simulateBooking({
      propertyId: id!,
      checkIn: new Date().toISOString(),
      checkOut: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      guests: 2
    }),
  onSuccess: () => {
    messageApi.success({ content: t("bookingSuccessMessage"), duration: 4 });
  },
  onError: () => {
    messageApi.error(t("bookingErrorMessage"));
  }
});

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        message={t("errorTitle")}
        description={t("errorSubtitle")}
        action={<Button onClick={() => refetch()}>OK</Button>}
      />
    );
  }

  if (isLoading || !item) {
    return (
      <Card className="bg-[var(--background)] text-[var(--foreground)]">
        <Empty description={t("loading")} />
      </Card>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <Image.PreviewGroup>
            <div className="grid grid-cols-2 gap-2">
              <Image 
                src={item.images[0]} 
                alt={item.title} 
                className="col-span-2 rounded-xl" 
                placeholder={<div className="w-full h-64 bg-[var(--elevated-bg)] animate-pulse rounded-xl" />} 
                loading="lazy"
                fallback="/window.svg"
              />
              <Image 
                src={item.images[1] || item.images[0]} 
                alt="" 
                placeholder={<div className="w-full h-32 bg-[var(--elevated-bg)] animate-pulse rounded-xl" />} 
                loading="lazy"
                fallback="/window.svg"
              />
              <Image 
                src={item.images[2] || item.images[0]} 
                alt="" 
                placeholder={<div className="w-full h-32 bg-[var(--elevated-bg)] animate-pulse rounded-xl" />} 
                loading="lazy"
                fallback="/window.svg"
              />
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
              {item.title} — {item.bedrooms} {t("bedrooms")} • {item.guests} {t("guests")} • {item.type}
            </p>
          </div>

          <div>
            <Space>
              <Button type="primary" onClick={() => setOpen(true)} disabled={!item.isAvailable || booking.isPending}>
                {t("book")}
              </Button>
              {booking.isError && <Tag color="red">{t("errorTitle")}</Tag>}
            </Space>
          </div>
        </div>
      </div>

      <Modal
        title={booking.isSuccess ? t("bookingSuccessTitle") : t("simulateBooking")}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={async () => {
          if (!booking.isSuccess) {
            await booking.mutateAsync();
          } else {
            setOpen(false);
          }
        }}
        okText={booking.isSuccess ? t("ok") : t("book")}
        confirmLoading={booking.isPending}
      >
        {booking.isPending ? (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--color-primary)]"></div>
          </div>
        ) : booking.isSuccess ? (
          <div className="space-y-4">
            <p>{t("bookingSuccessMessage")}</p>
            <div className="bg-[var(--background)] border border-[var(--border)] p-4 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p>{item.city}, {item.state}</p>
              <p>R$ {item.pricePerNight} {t("perNight")}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p>{t("simulateBooking")}</p>
            <div className="bg-[var(--background)] border border-[var(--border)] p-4 rounded-lg">
              <p className="font-medium">{item.title}</p>
              <p>{item.city}, {item.state}</p>
              <p>R$ {item.pricePerNight} {t("perNight")}</p>
              <p>{item.bedrooms} {t("bedrooms")} • {item.guests} {t("guests")}</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
