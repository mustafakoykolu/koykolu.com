import { motion } from "framer-motion";
import useSWR from "swr";
import type { EducationBackgroundModel } from "../../models/CommonModels";
import { formatMonthYear, formatYear } from "../../helpers/CommonHelpers";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EducationBackgroundCardList() {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/education/educatinalBackgroundList`,
    fetcher
  );

  if (error) return <div>Bir hata oluştu.</div>;
  if (isLoading) return <div>Yükleniyor...</div>;
  return (
    <div className="ticker-wrapper">
  <motion.div
  className="ticker-track"
  animate={{
    x: "-50%",
  }}
  transition={{
    ease: "linear",
    duration: 50,
    repeat: Infinity,
  }}
>
  {data.map((educationalBackgroundModel: EducationBackgroundModel, index: number) => (
    <div
      className="education-item p-4 bg-gray-800 rounded-lg shadow-md shrink-0 text-center"
      key={`item1-${index}`} 
    >
      <img src={educationalBackgroundModel.logoPath} className="w-32 h-48 mx-auto" alt="" />
      <p className="text-sm font-semibold text-indigo-300 mb-1">
        {educationalBackgroundModel.departmentName + " "+ educationalBackgroundModel.educationDegree}
      </p>
      <h3 className="text-xl font-bold text-white">{educationalBackgroundModel.schoolName}</h3>
      <h4 className="text-lg font-medium text-gray-300 mb-3 text-center">
        {formatYear(educationalBackgroundModel.beginDate)} -{" "}
        {educationalBackgroundModel.endDate ? formatYear(educationalBackgroundModel.endDate) : "Güncel"}
      </h4>
    </div>
  ))}

  {data.map((educationalBackgroundModel: EducationBackgroundModel, index: number) => (
    <div
      className="education-item p-4 bg-gray-800 rounded-lg shadow-md shrink-0 text-center"
      key={`item2-${index}`}
    >
      <img src={educationalBackgroundModel.logoPath} className="w-32 h-48 mx-auto" alt="" />
      <p className="text-sm font-semibold text-indigo-300 mb-1">
        {educationalBackgroundModel.departmentName + " "+ educationalBackgroundModel.educationDegree}
      </p>
      <h3 className="text-xl font-bold text-white">{educationalBackgroundModel.schoolName}</h3>
      <h4 className="text-lg font-medium text-gray-300 mb-3 text-center">
        {formatYear(educationalBackgroundModel.beginDate)} -{" "}
        {educationalBackgroundModel.endDate ? formatYear(educationalBackgroundModel.endDate) : "Güncel"}
      </h4>
    </div>
  ))}
</motion.div>
</div>
  );
}
