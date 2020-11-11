getDataByTime();

async function getDataByTime() {
    
    const response = await fetch("/api");
    const data = await response.json();
    
    for (item of data) {
        const dataByTime = document.getElementById("dataByTime");
        const dataByPerson = document.getElementById("dataByPerson");
        dataByPerson.innerHTML="";
        const geo = document.createElement('div');
        geo.textContent = "I was here: " + `${item.latData}, ${item.longData}`;
        const date = document.createElement('div');
        const image = document.createElement('img');
        const personName = document.createElement('div');
        const dateString = new Date(item.timeStamp).toLocaleString();
        image.src = item.image;
        date.textContent = " This was the time: " + dateString;
        personName.textContent = "I was with: " + item.personName;
        const section = document.createElement('div');
        section.append(geo, date, image, personName)
        dataByTime.append(section);
        section.classList.add("memoryContainer");
    
        
    }
};

async function getDataByPerson(){
    
    const dataByTime = document.getElementById("dataByTime");
    dataByTime.innerHTML ="";
    const dataByPerson = document.getElementById("dataByPerson");
    dataByPerson.innerHTML="";
    const personNameSelected = document.getElementById("personNameSelected").value;
  
    const response = await fetch("/api");
    const data = await response.json();
   
    for (item of data) {
        if(item.personName === personNameSelected){
            const geo = document.createElement('div');
            geo.textContent = "I was here: " + `${item.latData}, ${item.longData}`;
            const date = document.createElement('div');
            const image = document.createElement('img');
            const personName = document.createElement('div');
            const dateString = new Date(item.timeStamp).toLocaleString();
            image.src = item.image;
            date.textContent = "This was the time " + dateString;
            personName.textContent = " I was with: " + item.personName;
            const section = document.createElement('div');
            section.append(geo, date, image, personName)
            dataByPerson.append(section);
            section.classList.add("memoryContainer");
            
            
        } else if (personNameSelected === "Everyone"){
            console.log("Everyone")
            const geo = document.createElement('div');
            geo.textContent = "I was here: " + `${item.latData}, ${item.longData}`;
            const date = document.createElement('div');
            const image = document.createElement('img');
            const personName = document.createElement('div');
            const dateString = new Date(item.timeStamp).toLocaleString();
            image.src = item.image;
            date.textContent = "This was the time: " + dateString;
            personName.textContent = "I was with: " + item.personName;
            const section = document.createElement('div');
            section.append(geo, date, image, personName);
            dataByPerson.append(section);
            section.classList.add("memoryContainer");
            
        }
    }

}