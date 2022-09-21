/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate =d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const zipholder = document.getElementById('zip');
const feelingsholder = document.getElementById('feelings');
const cont = document.getElementById('content');
const datee = document.getElementById('date');
const tempp = document.getElementById('temp');

const apiKey =",&appid=0aa3942d87d8565713e6c449bc01f9c8&units=metric";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?zip="
const server = "http://127.0.0.1:4000"; 

document.getElementById('generate').addEventListener('click',DO);

function DO(){
    let zipcode = zipholder.value;
    let feel = feelingsholder.value;

    GetINFO(zipcode).then(zipInfo =>{

        if(zipInfo.cod != 200)return alert(zipInfo.message);

        let temprature = zipInfo.main.temp;
        
        let data ={
            teemp:temprature,
            date:newDate,
            content:feel,
        };

        postData(server + "/addall",data);

        updateUI();

    }).catch(error =>{
        console.log("error:", error);
    });
};


async function GetINFO(zipcode){
    const res = await fetch(baseUrl + zipcode + apiKey);

    try{
        const data = await res.json();
        console.log("data recieved",data);
        return data;
    }catch(error){
        console.log("error", error);
    }
};


const postData = async (url = "", info = {}) => {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });
  
    try {
      const Data = await res.json();
      console.log("Data is Saved", Data);
      return Data;
    } catch (error) {
      console.log(error);
    }
};


const updateUI = async () => {
    const request = await fetch(`${server}/getall`);
    try{
      const allData = await request.json();
      console.log("Data updated",allData);
      cont.innerHTML= "feeling: "+allData.content;
      datee.innerHTML= "The Date is : " + allData.date;
      tempp.innerHTML = "The Temprature is: "+Math.round(allData.teemp)+"°C";
  
    }catch(error){
      console.log("error", error);
    }
};
