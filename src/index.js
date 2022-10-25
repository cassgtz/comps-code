import Demo from "./components/BarcodeElement";
import { createRoot } from 'react-dom/client';


// Render all components here:
function Page(){

   
    return(
        <div>
            <h1>COMPS Webpage</h1>

            <Demo />


        </div>
    )
}

//React 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Page />);
