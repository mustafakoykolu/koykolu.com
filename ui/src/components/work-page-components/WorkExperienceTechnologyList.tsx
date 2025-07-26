import useSWR from "swr";
import type { WorkExperienceTechnologyModel } from "../../models/CommonModels";

interface WorkExperienceTechnologyListProps {
    workExperienceId: number; 
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WorkExperienceTechnologyList({workExperienceId}: WorkExperienceTechnologyListProps) {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/work/workExperienceTechonlogiesList?workExperienceId=${workExperienceId}`,
    fetcher
  );

  if (error) return <div>Bir hata oluştu.</div>;
  if (isLoading) return <div>Yükleniyor...</div>;
  return data.map((technology: WorkExperienceTechnologyModel, index: any) => (
    <span
      key={index}
      className="bg-indigo-900 text-indigo-300 text-xs font-semibold px-2.5 py-0.5 rounded-full"
    >
      {technology.name}
    </span>
  ));
}
