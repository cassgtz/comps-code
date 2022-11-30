import HomePage from "./components/HomePage";
import Header from "./components/Header";
import { createRoot } from 'react-dom/client';

// This function renders the page
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
                        <HomePage style={{boxSizing: 'content-box'}}/>
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
