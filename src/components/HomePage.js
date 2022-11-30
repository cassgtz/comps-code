import React, { Component} from "react";
import ScanditBarcodeScanner from "scandit-sdk-react";
import { Switch, Button, styled, alpha } from "@material-ui/core";
import {
  BarcodePicker,
  Camera,
  CameraAccess,
  CameraSettings,
  ScanSettings,
  SingleImageModeSettings,
} from "scandit-sdk";
import GetNutritionalData from "./DisplayNutrients";

// Barcode scanner set up taken from scandit-sdk-react Demo
class HomePage extends Component {
  // Input variables 
  
  shouldShowNutrients = false; // to show output results
  sex = "Female"; // Sex default
  checkAll = 0; // Check for all vitamins? -- default is off 

  // Barcode Scanner variables
  licenseKey = "AYUivAWjJzC6JurcKQWiRq08XVOgArB9gkGHRLFtek/cEkA/zFyySRx1F+1WbzdmrRmoJpB/pCvUJUSOPUQ36pkH8LSQUv+nwh9x9D9liFMYU3WeAg/Cs34rHmRfML+ufxsvlouc3h2KXyOTxqtMbfokTV26rUSAIxu/QFBYnDsyvoTgIPC0Muj4TXkAfioaN3YxTQBT+6Ng80pJnqGYlkqYHRZk1qf2fC505M4RgHVN4FbT2xB/rMjRdfxhTbtF49yYcB8m6gDkv2tXmRoa4VxYijCKGTq3c4d/80fw0Ck1WwpBh62/oG7HyBqOG0yUayQqOpihzOFevU7SBhFM8ZulJCZcdbtqkq8uxCktzxarf490jkiRzzoGOe++fsFWBqPlcf2g+Geull2lyUE93WxbhOuxFs89lmaemn5K9SSdOTl0b33zzM4Nib0OxCVbRjKXeO2Bfb1Yexx/AERos6Li2+FQcRLbYNhCkl6AEPlq6srs8KnbeXwENv1HoQloCfZ5rKAID+CgwczpLsmPPYmGwxD5ToyVmQtZRLu7e4eKDX819drAA4JM96byPXfcTgM/6pkigbtDhUynMWD+FuG+yJ/bJB5mGPEbVBknO511+kw8I53aJ3B7YIVQyX6EwL02crj9Mkx2VSRiN42G96ofNTrGsCQGhotth/97JR/28aXYqHIjRrKWi01wT3WqUhQuINuRtcI+xcr0uRhKKm3LtahL6nxQJNNPZ1SjwUoq3kyHXAGdalKDqzvVgGLVCTY8EAoyF0XMOODOAW4OS03qqnnkiF62wSs15/WQ/zwfLxY=";
  scannedBarcodes = [];

  constructor(props) {
    super(props);
    this.state = {
      shouldShowScannerComponent: false,
      style: {width: '0.5px', height: '0.5px'},
      paused: true,
      accessCamera: false,
      cameras: [],
      cameraSettings: {
        resolutionPreference: CameraSettings.ResolutionPreference.HD,
      },
      enableCameraSwitcher: true,
      enablePinchToZoom: true,
      enableTapToFocus: true,
      enableTorchToggle: true,
      guiStyle: BarcodePicker.GuiStyle.LASER,
      laserArea: { x: 0, y: 0, width: 1, height: 1 },
      playSoundOnScan: true,
      targetScanningFPS: 40, // frames per second to be processed
      vibrateOnScan: false,
      videoFit: BarcodePicker.ObjectFit.CONTAIN,
      visible: true,
      viewfinderArea: { x: 0, y: 0, width: 1, height: 1 },
      zoom: 0,
      cameraType: Camera.Type.FRONT,
      singleImageModeSettings: {
        desktop: {
          usageStrategy: SingleImageModeSettings.UsageStrategy.FALLBACK,
        },
        mobile: {
          usageStrategy: SingleImageModeSettings.UsageStrategy.FALLBACK,
        },
      },
    };
    CameraAccess.getCameras().then((cameras) => this.setState({ cameras }));
  }

  getScanSettings = () => {
    const scanSettings = new ScanSettings({
      enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
      codeDuplicateFilter: -1 // each unique code is only scanned once
    });
    return scanSettings;
  };

  scannerState = () => {
    if (!this.state.shouldShowScannerComponent) {
      return "Not shown, will initialize";
    } else if (this.state.shouldShowScannerComponent && !this.state.scannerReady) {
      return "Initializing";
    } else if (this.state.shouldShowScannerComponent && this.state.scannerReady) {
      if (!this.state.paused) {
        return "Ready & Scanning";
      } else {
        return "Ready & Paused";
      }
    }
  };

  getScanner = () => {
    return (
      this.state.shouldShowScannerComponent && (
        <ScanditBarcodeScanner
          // Library licensing & configuration options (see https://docs.scandit.com/stable/web/globals.html#configure)
          licenseKey={this.licenseKey}
          engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build" // could also be a local folder, e.g. "build"
          // Picker events
          onReady={() => this.setState({ scannerReady: true })}
          // eslint-disable-next-line no-console
          onScan={(scanResult)=>{ // SAVE RESULTS INTO AN ARRAY
            console.log(this.scannedBarcodes === undefined);
            this.scannedBarcodes.push(scanResult.barcodes[0].data);
            console.log(this.scannedBarcodes);
          }}
          // eslint-disable-next-line no-console
          onScanError={console.error}

          // Picker options
          scanSettings={this.getScanSettings()}
          paused={this.state.paused}
          /*️
            ⚠️ Make sure to keep accessCamera and paused synchronized in a sensible way, as resuming scanning accesses
            the camera, so your state might become outdated.
            For example, set accessCamera to true whenever scanning is resumed.
          */
          accessCamera={this.state.accessCamera}
          camera={this.state.activeCamera}
          cameraSettings={this.state.cameraSettings}
          enableCameraSwitcher={this.state.enableCameraSwitcher}
          enablePinchToZoom={this.state.enablePinchToZoom}
          enableTapToFocus={this.state.enableTapToFocus}
          enableTorchToggle={this.state.enableTorchToggle}
          guiStyle={this.state.guiStyle}
          laserArea={this.state.laserArea}
          playSoundOnScan={this.state.playSoundOnScan}
          targetScanningFPS={this.state.targetScanningFPS}
          vibrateOnScan={this.state.vibrateOnScan}
          videoFit={this.state.videoFit}
          visible={this.state.visible}
          viewfinderArea={this.state.viewfinderArea}
          zoom={this.state.zoom}
          // only set on component creation, can not be changed afterwards
          cameraType={this.state.cameraType}
          singleImageModeSettings={this.state.singleImageModeSettings}
        />
      )
    );
  };

  render() {
    const scanner = this.getScanner();


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

    const checkAllSwitch = (
      <span style={{ margin: "15px" }}>
          <BlueSwitch
              onChange={ ()=>{this.checkAll === 0 ? this.checkAll = 1 : this.checkAll = 0; console.log(this.checkAll);}}
              sx ={{color: "#38b6ff"}}
          />
          Check for ALL vitamins
      </span>
    );

    const sexSelection = (
      <form>
        <p>Sex:</p>
        <div>
          <label>
            <input
              type="radio"
              name="Sex"
              value="Female"
              onChange={(changeEvent)=>{this.sex = changeEvent.target.value; console.log(this.sex);}}
              defaultChecked
            />
            Female
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="Sex"
              value="Male"
              onChange={(changeEvent)=>{this.sex = changeEvent.target.value; console.log(this.sex);}}
            />
            Male
          </label>
        </div>

      </form>
    );

    const startButton = (
      <Button
        onClick={() => this.setState({ shouldShowScannerComponent: true, paused: false, accessCamera: true })}
        disabled={this.state.shouldShowScannerComponent || !this.state.paused}
        variant="contained"
        style={{
          color: "white",
          border: 'none',
          borderRadius: '70px',
          backgroundColor: "#38b6ff",
          padding: '17px',
          paddingLeft: '50px',
          paddingRight: '50px',
          fontSize: '12px'
        }}
      >
        Scan Items
      </Button>
    );
    const stopButton = (
      <Button
        onClick={() => {
          if (this.scannedBarcodes.length !== 0) {
            this.shouldShowNutrients = true;
          }
          this.setState({ paused: true, shouldShowScannerComponent: false, scannerReady: false});
        }}
        disabled={!this.state.shouldShowScannerComponent || this.state.paused}
        variant="contained"
        style={{
          color: "white",
          border: 'none',
          borderRadius: '70px',
          backgroundColor: "#38b6ff",
          padding: '17px',
          paddingLeft: '50px',
          paddingRight: '50px',
          fontSize: '12px'
        }}
      >
        Done
      </Button>
    );
    
    

    return (
      <React.Fragment>
        {this.shouldShowNutrients === false ? 
        
            <div style={{ display: 'flex', flexDirection: 'column'}}>
            {this.state.shouldShowScannerComponent !== true ?
            <div>
              <div style={{justifyContent: 'center', display:'flex', alignItems: 'center', paddingTop: '50px', paddingBottom:'50px'}}>
                <small style={{width: '350px', display:'flex', textAlign:'center', color: "white", fontSize: '20px', fontFamily: 'helvetica'}}>Scan your grocery items to analyze what micronutrients are lacking in your grocery haul</small>
              </div>
            
              <div >
                <div style={{backgroundColor: "white", paddingLeft: "10px", paddingRight: "10px", paddingTop: "70px", paddingBottom: "70px"}}>
                  {checkAllSwitch}
                  <i style={{width: '270px', display:'flex', textAlign:'center', color: "grey", fontSize: '11px', fontFamily: 'helvetica'}}>"Check for ALL" based on nutrition labels that are only required to show specfic micronutrients indicating a potwntial limitation of accuracy</i>
                  <div>{sexSelection}</div>
                </div>
                
              </div>
            </div>
              : null }
              
            <div style={{ display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',boxSizing: 'content-box'}}>
                {scanner}
            </div>

            <div style={{ display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingTop: '25px'}}>
            {this.state.shouldShowScannerComponent !== true ? startButton : stopButton}</div>
            </div>



            
            
            : 



            <div>
              <GetNutritionalData
                barcodeArray={this.scannedBarcodes}
                sex={this.sex}
                checkedAll={this.checkAll}
              />
            </div>

            }
      </React.Fragment>
    );
  }
}
export default HomePage;