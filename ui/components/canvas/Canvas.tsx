import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useAppContext } from "../../../data/context/app-context";
import Agent from "../agent/agent";


const Canvas: React.FC = () => {


  const { agents } = useAppContext();
   
  return (
    <>      
      <div className="canvas">
        {Object.keys(agents).map(ak => <Agent key={ak} agent={agents[ak]} />)}
      </div>
    </>

  );
};


export default Canvas;






