import WorkExperienceCardList from "../components/work-page-components/WorkExperienceCardList";

interface WorkPageProps {
  timelineSectionRef: React.RefObject<HTMLDivElement | null>;
}

export default function WorkPage({ timelineSectionRef }: WorkPageProps) {
  return (
    <div ref={timelineSectionRef} className="flex container-2">
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Çalışma Hayatım
        </h2>
        <div className="relative mt-6">
            <WorkExperienceCardList />
        </div>
      </div>
    </div>
  );
}
