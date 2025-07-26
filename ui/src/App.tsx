import "./App.css";

import { useRef } from "react";
import EntryPage from "./pages/EntryPage";
import WorkPage from "./pages/WorkPage";
import EducationPage from "./pages/EducationPage";
import ContactPage from "./pages/ContactPage";


function App() {
  const contactSectionRef = useRef<HTMLDivElement | null>(null);
  const timelineSectionRef = useRef<HTMLDivElement | null>(null);
  const handleScrollToContact = () => {
    contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
    const handleScrollToTimeLine = () => {
    timelineSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="App">
      <EntryPage handleScrollToContact={handleScrollToContact} handleScrollToTimeLine={handleScrollToTimeLine} />
      <WorkPage timelineSectionRef={timelineSectionRef} />
      <EducationPage />
      <ContactPage contactSectionRef={contactSectionRef}/>
    </div>
  );
}

export default App;
