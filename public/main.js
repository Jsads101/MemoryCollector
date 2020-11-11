setMap();

let video;
let button;

function setup() {
    let canvas = createCanvas(240, 160);
    background(51);
    video = createCapture(VIDEO);
    video.parent("canvas");
    canvas.parent("canvas");
    video.size(240, 160);
   
    const button = document.getElementById('takepic');
        button.addEventListener('click', async event => {
            console.log("click");
            
    video.loadPixels();
    image(video, 0, 0);
    const canvas = document.getElementById("canvas");
    const image64 = video.canvas.toDataURL();
    document.getElementById("hiddenImage").value = image64;
    
})   
}

function setMap() {
    console.log("getting map")
    const mymap = L.map('map').setView([51.505, -0.09], 13);
    const marker = L.marker([0,0]).addTo(mymap);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(mymap);

    navigator.geolocation.getCurrentPosition(position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log(lat, long);
    document.getElementById("lat").textContent = lat;
    document.getElementById("long").textContent = long;
    document.getElementById("hiddenlat").value = lat;
    document.getElementById("hiddenlong").value = long;
    marker.setLatLng([lat, long]);
    mymap.setView([lat, long], 12);

});
}
