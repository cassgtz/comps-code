import Demo from "./components/BarcodeElement";
import Header from "./components/Header";
import { createRoot } from 'react-dom/client';

// Render all components here:
function Page(){

   
    return(
        <div style={{height:'100vh', backgroundColor: "#c8df43"}}>
            <div><Header/></div>
            <div>
                <div style={{ display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingTop: '200px',
                            paddingBottom: '200px',
                            }}>
                    <div><Demo style={{boxSizing: 'content-box' }}/></div>
                </div>
            </div>
        </div>
    )
}

//React 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Page />);
