import ChangingText from "../components/entry-page-components/ChangingText";
import { Experience } from "../components/Experience";
import { Canvas } from "@react-three/fiber";
import NameSurname from "../components/entry-page-components/NameSurname";
import Summary from "../components/entry-page-components/Summary";


interface EntryPageProps {  handleScrollToContact: () => void;
  handleScrollToTimeLine: () => void;
}

export default function EntryPage({handleScrollToTimeLine,handleScrollToContact}: EntryPageProps) {
  return (
    <div className="flex container-1 flex-wrap-reverse md:flex-nowrap">
        <div className="basis-1/1 md:basis-3/7 ml-10">
          <NameSurname />
          <ChangingText />
          <Summary/>
          <div className="flex mt-10">
            <button onClick={handleScrollToTimeLine} className="bg-indigo-300 hover:bg-yellow-300 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              Hakkımda
            </button>
            <button   onClick={handleScrollToContact} className="bg-indigo-300 hover:bg-yellow-300 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-15">
              İletişim
            </button>
          </div>
        </div>
        <div className="basis-2/4 md:basis-4/7 canvas-container hidden md:flex">
          <Canvas
            shadows
            camera={{ position: [4, -1, 5], fov: 12 }}
            style={{ width: "100%", height: "100vh" }} 
          >
            <Experience /> 
          </Canvas>
        </div>
      </div>
  );
}