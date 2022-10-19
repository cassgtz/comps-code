import React, { Component } from "react";
import ScanditBarcodeScanner from "scandit-sdk-react";
import {
  Barcode,
  BarcodePicker,
  Camera,
  CameraAccess,
  CameraSettings,
  ScanSettings,
  SingleImageModeSettings,
} from "scandit-sdk";

class Demo extends Component {

  licenseKey = "AYUivAWjJzC6JurcKQWiRq08XVOgArB9gkGHRLFtek/cEkA/zFyySRx1F+1WbzdmrRmoJpB/pCvUJUSOPUQ36pkH8LSQUv+nwh9x9D9liFMYU3WeAg/Cs34rHmRfML+ufxsvlouc3h2KXyOTxqtMbfokTV26rUSAIxu/QFBYnDsyvoTgIPC0Muj4TXkAfioaN3YxTQBT+6Ng80pJnqGYlkqYHRZk1qf2fC505M4RgHVN4FbT2xB/rMjRdfxhTbtF49yYcB8m6gDkv2tXmRoa4VxYijCKGTq3c4d/80fw0Ck1WwpBh62/oG7HyBqOG0yUayQqOpihzOFevU7SBhFM8ZulJCZcdbtqkq8uxCktzxarf490jkiRzzoGOe++fsFWBqPlcf2g+Geull2lyUE93WxbhOuxFs89lmaemn5K9SSdOTl0b33zzM4Nib0OxCVbRjKXeO2Bfb1Yexx/AERos6Li2+FQcRLbYNhCkl6AEPlq6srs8KnbeXwENv1HoQloCfZ5rKAID+CgwczpLsmPPYmGwxD5ToyVmQtZRLu7e4eKDX819drAA4JM96byPXfcTgM/6pkigbtDhUynMWD+FuG+yJ/bJB5mGPEbVBknO511+kw8I53aJ3B7YIVQyX6EwL02crj9Mkx2VSRiN42G96ofNTrGsCQGhotth/97JR/28aXYqHIjRrKWi01wT3WqUhQuINuRtcI+xcr0uRhKKm3LtahL6nxQJNNPZ1SjwUoq3kyHXAGdalKDqzvVgGLVCTY8EAoyF0XMOODOAW4OS03qqnnkiF62wSs15/WQ/zwfLxY=";

  constructor(props) {
    super(props);
    this.state = {
      shouldShowScannerComponent: false,
      paused: true,
      isCode128Enabled: true,
      accessCamera: false,
      cameras: [],
      cameraSettings: {
        resolutionPreference: CameraSettings.ResolutionPreference.HD,
      },
      enableCameraSwitcher: true,
      enablePinchToZoom: true,
      enableTapToFocus: true,
      enableTorchToggle: true,
      guiStyle: BarcodePicker.GuiStyle.VIEWFINDER,
      laserArea: { x: 0, y: 0, width: 1, height: 1 },
      playSoundOnScan: true,
      targetScanningFPS: 30,
      vibrateOnScan: false,
      videoFit: BarcodePicker.ObjectFit.COVER,
      visible: true,
      viewfinderArea: { x: 0, y: 0, width: 1, height: 1 },
      zoom: 0,
      cameraType: Camera.Type.BACK,
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
      enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"],
      codeDuplicateFilter: 1000
    });
    if (this.state.isCode128Enabled) {
      scanSettings.enableSymbologies(Barcode.Symbology.CODE128);
    } else {
      scanSettings.disableSymbologies(Barcode.Symbology.CODE128);
    }
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
          onScan={console.log}
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
          singleImageModeSettings={this.state.singleImageModeSettings} // only set on component creation, can not be changed afterwards
        />
      )
    );
  };

  render() {
    const scanner = this.getScanner();

    const showButton = (
      <button
        onClick={() => this.setState({ shouldShowScannerComponent: true })}
        disabled={this.state.shouldShowScannerComponent}
      >
        Show
      </button>
    );
    const hideButton = (
      <button
        onClick={() =>
          this.setState({
            shouldShowScannerComponent: false,
            scannerReady: false,
          })
        }
        disabled={!this.state.shouldShowScannerComponent}
      >
        Hide
      </button>
    );

    const startButton = (
      <button
        onClick={() => this.setState({ paused: false, accessCamera: true })}
        disabled={!this.state.shouldShowScannerComponent || !this.state.paused}
      >
        Start
      </button>
    );
    const stopButton = (
      <button
        onClick={() => this.setState({ paused: true })}
        disabled={!this.state.shouldShowScannerComponent || this.state.paused}
      >
        Pause
      </button>
    );

    return (
      <div>
        <p>Expected Scanner State: {this.scannerState()}</p>
        <div>
          {showButton}
          {hideButton}
          <span>Showing/hiding the component adds/removes it, which initializes/deinitalizes the scanner</span>
        </div>
        {startButton}
        {stopButton}
        <div>
          Possible cameras (if none chosen, none specified):
          {this.state.cameras.map((camera) => (
            <button key={camera.deviceId} onClick={() => this.setState({ activeCamera: camera })}>
              {camera.label}
            </button>
          ))}
        </div>
        {scanner}
      </div>
    );
  }
}
export default Demo;