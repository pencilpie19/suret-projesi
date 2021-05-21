var lastPeerId = null;
var peer = null;

var video1 = document.getElementById("video1");

var first_user = document.getElementById("first_user");
var start_button = document.getElementById("start");
var second_user;
var is_connect=false;

peer = new Peer(null, {
  debug: 2,
});

peer.on("open", function (id) {
  if (peer.id === null) {
    console.log("Received null id from peer open");
    peer.id = lastPeerId;
  } else {
    lastPeerId = peer.id;
  }

  console.log("ID: " + peer.id);
  first_user.innerHTML = peer.id;
});

var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

function start_peer() {
  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      video1.srcObject = stream;
      video1.play();
      video1.muted = true;

      var call = peer.call(second_user, stream);
      
      call.on("stream", function (remoteStream) {
        video2.srcObject = remoteStream;
        video2.play();
        

        


      });

    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
}

peer.on("call", function (call) {
  getUserMedia(
    { video: true, audio: true },
    function (stream) {
      video1.srcObject = stream;
      video1.muted = true;
      video1.play();
      call.answer(stream);

      call.on("stream", function (remoteStream) {
        video2.srcObject = remoteStream;
        video2.play();
    


      });
    },
    function (err) {
      console.log("Failed to get local stream", err);
    }
  );
});

if (findGetParameter("id")) {
  second_user = findGetParameter("id");
  start_peer();
}

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

function addScript(src) {
  var s = document.createElement("script");
  s.setAttribute("src", src);
  document.body.appendChild(s);
}


function connect(){
  if(!is_connect){
    addScript("../assets/js/script.js");
  }
}