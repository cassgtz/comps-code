import Demo from "./components/BarcodeElement";
import Header from "./components/Header";
import { createRoot } from 'react-dom/client';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    page: {
      paddingTop: '100px',
        color: "green"
      }
  }));

// Render all components here:
function Page(){

   
    return(
        <div>
            <div><Header/></div>
            <div style={{ backgroundColor: "lightGreen"}}>
                <div><Demo style={{ paddingTop: '100px', boxSizing: 'content-box' }}/></div>
            </div>
        </div>
    )
}

//React 18
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<Page />);
