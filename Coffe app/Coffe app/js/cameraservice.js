const canvas = document.querySelector("canvas");
let imagePreview = [];
imagePreview = document.getElementsByClassName("image-preview");

class CameraServiceClass {
  constructor() {
    this.takepicmode;
  }

  // CAMERA
  Opencamera() {
    this.htmlTemplate3 = `
  <section id="camerawrap">
  <video autoplay></video>
  <div id="butwrapcamera">
    <div id="stopcaneraknap" onclick="lukcamera()">Luk</div>
    <div id="tagbilledeknap" onclick="tagbillede()">Tag billede</div>
    <div id="accepterbilledeknap" onclick="acceptbillede()">Accepter billede</div>
  </div>
  <div id="darkbg"></div>
</section>
  `;
    document.getElementById("camereholderDiv").innerHTML = this.htmlTemplate3;
    this.video = document.querySelector("video");
    this.tagbiledknap = document.querySelector("#tagbilledeknap");

    let constraints = {
      video: true
    };

    // let stream
    // let tracks
    this.videoStream;
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      this.videoStream = stream;
      this.video.srcObject = this.videoStream;
    });
  }

  lukcamera() {
    this.htmlTemplate3 = "";
    document.getElementById("camereholderDiv").innerHTML = this.htmlTemplate3;
    this.videoStream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  // var takepicmode
  tagbillede() {
    if (this.takepicmode != 1) {
      this.video.pause();
      canvas.width = this.video.videoWidth;
      canvas.height = this.video.videoHeight;
      canvas.getContext("2d").drawImage(this.video, 0, 0);
      for (let i = 0; i < imagePreview.length; i++) {
        imagePreview[0].style.background =
          "url(" + canvas.toDataURL("image/webp") + ")";
      }
      //
      this.tagbiledknap.innerHTML = "Nyt billede?";
      this.tagbiledknap.style.background = "#5e4747";
      //
      this.takepicmode = 1;
    } else {
      this.video.play();
      this.tagbiledknap.innerHTML = "Tag billede";
      this.tagbiledknap.style.background = "#5e4747";
      this.takepicmode = 2;
    }
  }

  acceptbillede() {
    this.htmlTemplate3 = "";
    document.getElementById("camereholderDiv").innerHTML = this.htmlTemplate3;
    this.profileimagePreviewFunk(canvas.toDataURL("image/webp"));
    this.videoStream.getTracks().forEach(function(track) {
      track.stop();
    });
  }

  uploadFileImg(file) {
    let reader = new FileReader();
    reader.onload = function() {
      savedimgurl = reader.result;
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    this.profileimagePreviewFunk(savedimgurl);
  }

  profileimagePreviewFunk(dispic) {
    savedimgurl = dispic;
    for (let i = 0; i < imagePreview.length; i++) {
      imagePreview[i].style.background = "url(" + dispic + ")";
    }
  }
}

export let savedimgurl;
const CameraServiceClass2 = new CameraServiceClass();
export default CameraServiceClass2;
