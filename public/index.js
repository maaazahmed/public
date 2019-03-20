
// (() => {
//     var video = document.getElementById('video');
//     var canvas = document.getElementById('canvas');
//     var context = canvas.getContext('2d');
//     var img = document.getElementById("img")
//     var download = document.getElementById("download")


//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//             video.srcObject = stream;
//             video.play();
//         });
//     }
//     document.getElementById("snap").addEventListener("click", () => {
//         context.drawImage(video, 0, 0, 300, 300);
//         img.setAttribute("src", canvas.toDataURL("image/png"))
//         download.setAttribute("href", canvas.toDataURL("image/png"))
//     });
// })()



var video = document.getElementById('video');
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const socket = io("https://livestreamingdemo.herokuapp.com/")
    socket.on("STREAM", data => {
        document.getElementById("liveImage").src = data
    })
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        video.srcObject = stream;
        video.play();
        setInterval(() => {
            context.drawImage(video, 0, 0, 300, 300);
            socket.emit("STREAM", canvas.toDataURL("image/webp"))
        }, 1)
    });
}
