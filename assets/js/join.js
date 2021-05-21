var joinButton = document.getElementById("joinButton")
joinButton.addEventListener("click", gotomeet)

function gotomeet(e) {
    var meet_id = document.getElementById("meetID").value;

    window.location = `meetRoom.html?id=${meet_id}`
}