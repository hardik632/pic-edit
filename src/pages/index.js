
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { MDBFileInput } from "mdbreact";
import React, { Component } from "react";

import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';

import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";


import * as html2canvas from "html2canvas"
import { SketchPicker } from "react-color"

class FetchGithubInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageSrc: "",
      loading: false,
      radius: "0%",
      border: "0px",
      positionLeft: 0,
      positionTop: 0,
      zoomFactor: 10,
      imageHeight: 400,
      imageWidth: 400,
      borderColor: "blue",
      borderRadius: 30,
      borderStyle: "solid",
      divHeight: 0,
      divWidth: 0,
      margin:50,
      left:0,
      horizontal:0,
      }
    this.putBorder = this.putBorder.bind(this)
    this.clickImage = this.clickImage.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    console.log("How are you?")
  }

  handleChangeFile = event => {
    console.log(this.state.loading)
    let tmpAddress = URL.createObjectURL(event.target.files[0])
    this.setState({
      imageSrc: tmpAddress,
    })
    this.putBorder()
  }
  putBorder() {
    this.setState({
      radius: "50%",
      border: `${this.state.borderColor} ${this.state.borderStyle} ${this.state.borderRadius}px`,
      divWidth: 400,
      divHeight: 400,
    })
  }

  clickImage() {
    if (typeof window == `undefined` || typeof document == `undefined`) {
      return
    }
    this.setState({
      
    })
    window.scrollTo(0, 0) 
    setTimeout(function() {
      let options = { allowTaint: true }
      html2canvas(document.querySelector("#capture"), options).then(canvas => {
        document.body.appendChild(canvas)
      })
    }, 300)
  }
  handleChange(event) {
    console.log(event.hex)
    let colorTmp = event.hex
    this.setState({
      borderColor: colorTmp,
    })
    this.putBorder()
  }
  adjustImage = event => {
    console.log(event.target.value)
    switch (event.target.value) {
      case "left":
        this.setState({
          positionLeft: this.state.positionLeft - this.state.zoomFactor,
        })
        break
      case "right":
        this.setState({
          positionLeft: this.state.positionLeft + this.state.zoomFactor,
        })
        break
      case "top":
        this.setState({
          positionTop: this.state.positionTop + this.state.zoomFactor,
        })
        break
      case "bottom":
        this.setState({
          positionTop: this.state.positionTop - this.state.zoomFactor,
        })
        break
      case "zoom-in":
        this.setState({
          imageHeight: this.state.imageHeight + 100,
          imageWidth: this.state.imageWidth + 100,
        })
        break
      case "zoom-out":
        this.setState({
          imageHeight: this.state.imageHeight - 100,
          imageWidth: this.state.imageWidth - 100,
        })
        break
      case "reset":
        // code block
        this.setState({
          imageHeight: 400,
          imageWidth: 400,
          positionTop: 0,
          positionLeft: 0,
        })
        break
      case "image-click":
        let that = this
        setTimeout(function() {

          that.clickImage()
        }, 300)


        break
    }

  }
  render() {
    return (
      <div>
        <center><h1 style={{ padding:"7px",color:"rgb(19, 19, 228)", fontSize:"60px",fontFamily:" Satisfy,cursive"}}><b>Ready Linkedin Fam?</b></h1></center>
        <div style={{ display: "inline" },{margin:"4%"}}>
          <h3 style={{ display: "inline" },{margin:"3%"}}>
          <Badge variant="secondary">Step 1: &nbsp; </Badge></h3><span>
          <div class="btn btn-primary btn-sm float-left">
      <input type="file"
      style={{ display: "inline" },{padding: "7px"},{margin: "4px"}}
      onChange={event => this.handleChangeFile(event)} />
      </div>
      </span>
     
        </div>
        <div>
          <div
            id="capture"
            style={{
              margin: " 0 auto",
              height: `${this.state.divHeight}px`,
              width: `${this.state.divWidth}px`,
              overflow: "hidden",
              borderRadius: this.state.radius,
              border: this.state.border,
            }}
          >
            <div
              style={{
                height: `${this.state.imageHeight}px`,
                width: `${this.state.imageWidth}px`,
                backgroundImage: `url(${this.state.imageSrc})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: `top ${this.state.positionTop}px left ${this.state.positionLeft}px `,
              }}
            ></div>
          </div>
        </div>
        <br />
        <div onClick={this.adjustImage} style={{ margin: "4%" }}>
          <h3 style={{ display: "inline"  },{margin:"4%"}}><Badge variant="secondary">
            Step 2: &nbsp; </Badge> Adjust Image/Border color and hit "CLICK" &nbsp;{" "}
          </h3><center>
         
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="left">Move Left</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="right">Move Right</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="top">Move Down</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="bottom">Move Up</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="zoom-in">Zoom In</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="zoom-out">Zoom Out</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="reset">Reset</MDBBtn>
          <MDBBtn gradient="aqua" style={{ margin:"4px"}} value="image-click">
            CLICK
          </MDBBtn></center>
        </div>
        <center><SketchPicker
          color={this.state.borderColor}
          onChange={this.handleChange}
          style={{ position: "absolute", left: "50%" ,border:"  " }}
        /></center>
        <div>
          <br />
          <h3 style={{ display: "inline"  },{margin:"4%"}}>
          <Badge variant="secondary">
            Step 3: &nbsp;  </Badge> Right Click in the image that will come below this and click
            on "Save Image"
          </h3>
        </div>
      </div>
    )
  }
}

export default FetchGithubInfo
