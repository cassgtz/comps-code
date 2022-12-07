/**

    The function in this file renders all components on the page

*/
import StartPage from "./src/components/StartPage";
import Header from "./src/components/Header";
import { createRoot } from 'react-dom/client';

function WebPage(){
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{paddingBottom: '40px'}}></div><Header/>
                <div style={{ display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gridColumn: 'auto',
                            flexDirection: 'column',
                            height: 'auto',
                            minHeight: '100vh',
                            backgroundColor: '#c8df43'
                            }}>
                    <StartPage style={{boxSizing: 'content-box'}}/>
                </div>
           
        </div>
    );
};

// React version 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<WebPage/>);
