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
  licenseKey = "AYvCVQujKQb5DckwPQtmcGYN1lZiEUK4vkAbga99BLniAn6uKhv0FdAqexRSYqdIZ0g8dDlmQxGkTz6ej34526YhxBGBIlhqo2PUBrEoitFOSj/YlhyDylZEPX/OA9FhNHGAkUpcTmVMS01IxVwZU6Q5+0v9D21w3hTuBOAeQb1aAYFdE66sOugcLvgEsxHmlDr52/8a6L5kO/qaz3OZ+PFkRnNzd8MTUwSndXv3C/phtuXqwKwWK9Gtqw+7IcjA4WAiTghK2I8PdOwFNR6r+ED9GhkaB6MyXQOl42duzELV+0GS57EpfFkX9hAUsjCwjl8k/AYfea0JRxKWgl8BwYB42UPsRSyOejSbfbTS4NEv9MJsEsi0cXa6Mh9nzZpRpwZsrqWbT83v0S2cV5e05Dg0etAIjpws3JuRoy7BI44fxUO5wrqELntK03w9m2+Ji/V3L4p7vy0YRQOm/j06rdL+X/is2S/30rFKxUX10Snm+vV904To/vEtI8omWRY8moChozDPI3bvJsoz76IM0zKrcdIHR5WadJCD+7TTlshjBTg7YcCppBt50YOq2wQq2I17vawQKYqbJKYTuiEao2j1gtMR2IsRc0UH7ktRKFsn2AN76Yo8zUqY6BkdZhleUQpybENud7ouaZdW6W2ZVaW6d7mts9cFp/2nrFbSgDu7T1rx28SD3gbaVeefeeaawbsv/Wu61bKrFaO5VUOhRXpqRYqq1zrV+0Ijlehkwaj5cD4jh1BGomm8gE6r4KFqVGAlny+HKPGOIA3HF5aqV+cmiynaibtsJvS/kOAaUFWVCXQn2jFnqpueqDhm2Zlfb5V8mWpg4HLp8e1YGzAtOM0M";
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