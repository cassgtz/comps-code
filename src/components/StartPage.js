/**
 
    This file renders all components in the starting page, as well as the barcode scanner. 
    It retrieves & feeds all data/props to MissingNutrients. 
    The barcode scanner set up is taken from scandit-sdk-react Demo, altered for this project's needs.

 */
import React, { Component } from "react";
import ScanditBarcodeScanner from "scandit-sdk-react";
import {
  BarcodePicker,
  Camera,
  CameraAccess,
  CameraSettings,
  ScanSettings,
  SingleImageModeSettings,
} from "scandit-sdk";
import MissingNutrients from "./MissingNutrients";
import {ToggleExplanation, AppDescription, CheckAllSwitch, UserDisclaimer} from "./Texts";
import { Switch, Button, styled, alpha, FormControlLabel } from "@material-ui/core";

export default class StartPage extends Component {
  
  // Declare input variables 
  doneScanning = false; // to show output results
  sex = "Female"; // Sex default
  checkAll = 0; // Check for all vitamins? -- default is off 

  // Decalre Barcode Scanner variables
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
      cameraSettings: {resolutionPreference: CameraSettings.ResolutionPreference.HD},
      enableCameraSwitcher: true,
      enablePinchToZoom: true,
      enableTapToFocus: true,
      enableTorchToggle: true,
      guiStyle: BarcodePicker.GuiStyle.LASER,
      laserArea: {x: 0, y: 0, width: 1, height: 1},
      playSoundOnScan: true,
      targetScanningFPS: 40, // frames per second to be processed
      vibrateOnScan: true,
      videoFit: BarcodePicker.ObjectFit.CONTAIN,
      visible: true,
      viewfinderArea: {x: 0, y: 0, width: 1, height: 1},
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
    CameraAccess.getCameras().then((cameras) => this.setState({cameras}));
  }

  getScanSettings = () => {
    const scanSettings = new ScanSettings({
      enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
      codeDuplicateFilter: -1 // each unique code is only scanned once
    });
    return scanSettings;
  };

  getScanner = () => {
    return (
      this.state.shouldShowScannerComponent && (
        <ScanditBarcodeScanner
          licenseKey={this.licenseKey}
          engineLocation="https://cdn.jsdelivr.net/npm/scandit-sdk@5.x/build"
          onReady={() => this.setState({ scannerReady: true })}
          // Save scanned barcodes into an array
          onScan={(scanResult)=>{
            this.scannedBarcodes.push(scanResult.barcodes[0].data);
            console.log(this.scannedBarcodes);
          }}
          onScanError={console.error}
          scanSettings={this.getScanSettings()}
          paused={this.state.paused}
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
        '&:hover': {backgroundColor: alpha("#38b6ff", theme.palette.action.hoverOpacity)},
      },
      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: "#38b6ff",
      },
    }));

    const checkAllSwitch = (
      <FormControlLabel
        control={<BlueSwitch 
                    onChange={()=>{this.checkAll === 0 ? this.checkAll = 1 : this.checkAll = 0}}
                    sx ={{color: "#38b6ff"}}
                  />}
        label={<CheckAllSwitch/>}
        labelPlacement="start"
      />
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
              onChange={(changeEvent)=>{this.sex = changeEvent.target.value}}
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
              onChange={(changeEvent)=>{this.sex = changeEvent.target.value}}
            />
            Male
          </label>
        </div>
      </form>
    );
      
    const scanButton = (
      <Button
        onClick={() => this.setState({ shouldShowScannerComponent: true, paused: false, accessCamera: true })}
        disabled={this.state.shouldShowScannerComponent}
        variant="contained"
        style={{
          color: "white",
          border: 'none',
          borderRadius: '70px',
          backgroundColor: "#38b6ff",
          padding: '17px',
          paddingLeft: '50px',
          paddingRight: '50px',
          fontSize: '15px'
        }}
      >
        Scan Items
      </Button>
    );

    const doneButton = (
      <Button
        onClick={() => {
            if (this.scannedBarcodes.length !== 0) {
              this.doneScanning = true;
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
          fontSize: '17px'
        }}
      >
        Done
      </Button>
    );
    

    return (
      <React.Fragment>
        {this.doneScanning === false ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            {this.state.shouldShowScannerComponent !== true ?
                <div>
                  <UserDisclaimer/>
                  <div style={{borderWidth: '3px', borderStyle: 'solid', borderColor: '#38b6ff', backgroundColor: "white", paddingLeft: "10px", paddingRight: "10px", paddingTop: "40px", paddingBottom: "10px"}}>
                    <AppDescription/>
                    <div style={{fontSize: '14px', fontFamily: 'helvetica', borderWidth: '1px', borderStyle: 'solid', borderColor: '#38b6ff', paddingBottom: '10px'}}>
                      {checkAllSwitch}
                      <ToggleExplanation/>
                      <div style={{paddingLeft: '14px', alignItems:'start'}}>{sexSelection}</div>
                    </div>
                  </div>
                </div>
            : null}
              <div style={{ paddingLeft: '55px', paddingRight: '55px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxSizing: 'content-box'}}>
                {scanner}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '25px', paddingBottom: '30px'}}>
                {this.state.shouldShowScannerComponent !== true ? scanButton : doneButton}
              </div>
            </div> 
        ) : (
            <div>
              <MissingNutrients
                barcodeArray={this.scannedBarcodes}
                sex={this.sex}
                checkedAll={this.checkAll}
              />
            </div> 
          )
        }
      </React.Fragment>
    );
  }
}