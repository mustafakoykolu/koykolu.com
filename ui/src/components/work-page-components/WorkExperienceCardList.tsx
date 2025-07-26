import useSWR from "swr";
import { motion } from "framer-motion";
import type { WorkExperienceModel } from "../../models/CommonModels";
import WorkExperienceTechnologyList from "./WorkExperienceTechnologyList";
import { formatMonthYear } from "../../helpers/CommonHelpers";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WorkExperienceCardList() {
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_API_URL}/work/workExperienceList`,
    fetcher
  );

  if (error) return <div>Bir hata oluştu.</div>;
  if (isLoading) return <div>Yükleniyor...</div>;

  
  return data.map((experience: WorkExperienceModel) => (
    <motion.div
      className="relative mt-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <div className="p-4 bg-gray-800 rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
        <p className="text-sm font-semibold text-indigo-300 mb-1">
          {formatMonthYear(experience.beginDate)} -{" "}
          {experience.endDate ? formatMonthYear(experience.endDate) : "Güncel"}
        </p>
        <h3 className="text-xl font-bold text-white">{experience.title}</h3>
        <h4 className="text-lg font-medium text-gray-300 mb-3">
          {experience.company}
        </h4>
        <p>{experience.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          <WorkExperienceTechnologyList workExperienceId={experience.id} />
        </div>
      </div>
    </motion.div>
  ));
}
