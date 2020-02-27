const canvas = document.querySelector('canvas');
let imagePreview = [];
imagePreview = document.getElementsByClassName("image-preview")
// for (i = 0; i<)
// console.log(imagePreview)
export let savedimgurl;

let profileimagePreview = document.querySelector('#profileimagePreview');

// profileimagePreviewFunk(dispic) {
// let sheet;
function profileimagePreviewFunk(dispic) {
  profileimagePreview.style.background = "url("+dispic+")"
  // sheet = dispic;
  savedimgurl = dispic;
  console.log(dispic)
}


// CAMERA
let htmlTemplate3 = '';
window.tagbillede = () => {
  htmlTemplate3 += `
  <section id="camerawrap">
  <video autoplay></video>
  <div id="butwrapcamera">
    <div id="stopcaneraknap">Luk</div>
    <div id="tagbilledeknap">Tag billede</div>
    <div id="accepterbilledeknap">Accepter billede</div>
  </div>
  <div id="darkbg"></div>
</section>
  `;
  document.getElementById("camereholderDiv").innerHTML = htmlTemplate3;


  let video = document.querySelector('video');
  var stopcaneraknap = document.getElementById("stopcaneraknap")
  var tagbiledknap = document.getElementById("tagbilledeknap")
  var accepterbilledeknap = document.getElementById("accepterbilledeknap")
  stopcaneraknap.addEventListener("click", lukcamera);
  tagbiledknap.addEventListener("click", tagbillede);
  accepterbilledeknap.addEventListener("click", acceptbillede);

let constraints = {
  video: true
};

// let stream
// let tracks
let awasawa;
navigator.mediaDevices.getUserMedia(constraints).
then((stream) => {
  awasawa = stream
  video.srcObject = awasawa

})

function lukcamera() {
  htmlTemplate3 = '';
  document.getElementById("camereholderDiv").innerHTML = htmlTemplate3;
  awasawa.getTracks().forEach(function(track) {
    track.stop();
  });
}

var takepicmode 
function tagbillede() {
  console.log()
  if (takepicmode != 1) {
  video.pause();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  for (let i = 0; i < imagePreview.length; i++) {
  imagePreview[i].style.background = "url(" + canvas.toDataURL('image/webp') + ")";
  }
  // 
  tagbiledknap.innerHTML = "Nyt billede?"
    // 
    takepicmode = 1;
  } else {
    video.play();
    tagbiledknap.innerHTML = "Tag billede"
    takepicmode = 2;
  }

};

function acceptbillede() {
  htmlTemplate3 = '';
  document.getElementById("camereholderDiv").innerHTML = htmlTemplate3;
  profileimagePreviewFunk(canvas.toDataURL('image/webp'));
  awasawa.getTracks().forEach(function(track) {
    track.stop();
  });
}
};


window.previewImage = (file) => {
  const reader = new FileReader();
  reader.addEventListener("load", function () {
    profileimagePreviewFunk(reader.result)

  }, false);
    if (file) {
      reader.readAsDataURL(file);
    }
  }