import Demo from "./components/BarcodeElement";
import Header from "./components/Header";
import { createRoot } from 'react-dom/client';

// Render all components here:
function Page(){

   
    return(
        <div>
            <div><Header/></div>
            <div style={{ backgroundColor: "#c8df43"}}>
                <div style={{ display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'}}>
                    <div><Demo style={{ paddingTop: '100px', boxSizing: 'content-box' }}/></div>
                </div>
            </div>
        </div>
    )
}

//React 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Page />);
