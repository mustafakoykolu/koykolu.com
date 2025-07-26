import React from "react";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Summary() {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/about/summary`,
    fetcher
  );

  if (error) return <div>Bir hata oluştu.</div>;
  if (isLoading) return <div>Yükleniyor...</div>;
  return data.map((item: string, index: number) => (
    <React.Fragment key={item}>
      <p>{item}</p>
      {index < data.length - 1 && <br />}
    </React.Fragment>
  ));
}
