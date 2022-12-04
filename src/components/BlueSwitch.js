/**
 
    This file styles the "Check all" toggle switch to make it blue when switched. 

 */
import { Switch, styled, alpha } from "@material-ui/core";

function BlueSwitch(){
    const BlueSwitch = styled(Switch)(({ theme }) => ({
        '& .MuiSwitch-switchBase.Mui-checked': {
          color: "#38b6ff",
          '&:hover': {
            backgroundColor: alpha("#38b6ff", theme.palette.action.hoverOpacity),
          },
        },
        '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
          backgroundColor: "#38b6ff",
        },
      })); 

    return (BlueSwitch);
}
export {BlueSwitch};