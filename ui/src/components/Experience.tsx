import { OrbitControls } from "@react-three/drei";
import { Avatar } from "./Avatar";

export const Experience = () => {
  return (
    <>
      <group position={-1}>
      <Avatar />
      </group>
      <ambientLight intensity={1} />
      <OrbitControls />
    </>
  );
};
