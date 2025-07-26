import EducationBackgroundCardList from "../components/education-page-components/EducationBackgroundCardList";

export default function EducationPage() {
  return (
    <div className="flex container-3">
      <div className="container mx-auto px-4 mt-20">
        <h2 className="text-4xl font-bold text-center text-white mb-12">
          Eğitim Hayatım
        </h2>
        <EducationBackgroundCardList />
      </div>
    </div>
  );
}
