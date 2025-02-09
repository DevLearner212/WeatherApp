

const WeatherBox = document.body.querySelectorAll(".WeatherBox");
const windbox = document.body.querySelectorAll(".windbox");
const forcasts = document.body.querySelectorAll(".forcasts")
const forcastvalues = document.body.querySelectorAll(".forcastvalues")
const inputvalue = document.body.querySelector(".inputvalue")
async function check(value="jaipur")
{
	const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${value}`;
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': 'c078559f61msh3ef62a722f6fd8fp18b392jsn28254cf857ab',
		'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
	}
}


	try {
		let response = await fetch(url,options);
		const data = await response.json();
		console.log(data)
		windbox.forEach((e)=>{
	        e.firstElementChild.innerHTML=`<li>Wind speed is ${data?.wind?.speed}</li>
	                  <li>degeree of wind ${data?.wind?.deg} </li>
	                  <li>Sunrise Time is ${new Date(data?.sys?.sunrise * 1000).getHours()}:${new Date(data?.sys?.sunrise * 1000).getMinutes()}</li>
	                  <li>Sunset Time is ${new Date(data?.sys?.sunset * 1000).getHours()}:${new Date(data?.sys?.sunrise * 1000).getMinutes()}</li>
	                  `
		})
		WeatherBox.forEach((e,index)=>{
			e.firstElementChild.innerHTML=data?.sys?.country
			e.firstElementChild.nextElementSibling.innerHTML=`
					  <li>main : ${data?.weather[index]?.main}</li>
	                  <li>Description : ${data?.weather[index]?.description}</li>
	                  <li>icon : ${data?.weather[index]?.icon}</li>
	                  `
		})
		forcasts.forEach((e) => {
			// Loop through each key in the data.main object
			Object.keys(data?.main).forEach((key) => {
			  // Append a <th> element for each key
			  e.innerHTML += `<th style="width:23%;">${key}</th>`;
			});
		  });
		  forcastvalues.forEach((e) => {
			// Loop through each key in the data.main object
			e.firstElementChild.innerHTML=data?.name
			Object.values(data?.main).forEach((key) => {
			  // Append a <th> element for each key
			  e.innerHTML += ` <td><div class="bi" width="24" height="24">${key}</div></td>`;
			});
		  });
		  
		  document.body.querySelector("#heading").innerHTML=`Weather ${data?.name}`
	} catch (error) {
		location.href="Error.html"
	}
}//end
document.body.querySelector(".submit").addEventListener("click", (e) => {
    e.preventDefault();
    const city = inputvalue.value.trim();
    if (city) {
        check(city);
    } else {
        alert("Please enter a city name.");
    }
    inputvalue.value = ''; // Clear the input field
});
check();
 