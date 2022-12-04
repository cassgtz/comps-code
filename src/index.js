/*
    The function in this file renders all components on the page
*/
import StartPage from "./components/StartPage";
import Header from "./components/Header";
import { createRoot } from 'react-dom/client';

function WebPage(){
    return(
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div><Header/></div>
            <div>
                <div style={{ display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gridColumn: 'auto',
                            paddingTop: '100px',
                            paddingBottom: '100px',
                            flexDirection: 'column',
                            backgroundColor: "#c8df43",
                            height: 'auto',
                            minHeight: '100vh'
                            }}>
                    <div>
                        <StartPage style={{boxSizing: 'content-box'}}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

// React version 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<WebPage />);
