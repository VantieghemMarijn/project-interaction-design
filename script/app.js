let data ;
let moonlist=[];
let nummer=0;
const selectimage=function(imagename){
	//console.log(imagename);
	return `<img src="./img/selfmade/${imagename}.svg" height="50px" width="50px" alt="${imagename}">`;	
}
const showdetailPage=function(moons){
	let fullmoonList=[]
	let fisrtFullMoon;
	let datetime,set,rise,meridian;
	
	moons.forEach(moon => {
		if(moon.phase=="fullmoon"){
			fullmoonList.push(moon);
		}
	});
	fisrtFullMoon=fullmoonList[0];
	let date=new Date(fisrtFullMoon.date);
	
	//console.log(fisrtFullMoon.date)
	datetime=`${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;
	set=new Date(fisrtFullMoon.set);
	rise=new Date(fisrtFullMoon.rise);
	meridian=new Date(fisrtFullMoon.meridian);
	
	document.querySelector(".js-detailgrid").innerHTML=`<p class="c-column1">date:</p>
	<p class="c-column1 js-date u-align-right">${datetime}</p>
	<p class="c-column1">moonrise:</p>
	<p class="c-column1 js-moonrise u-align-right">${rise.getHours()}:${rise.getMinutes()}</p>
	<p class="c-column1">meridian:</p>
	<p class="c-column1 js-meridian u-align-right">${meridian.getHours()}:${meridian.getMinutes()}</p>
	<p class="c-column1">moonset:</p>
	<p class="c-column1 js-moonset u-align-right">${set.getHours()}:${set.getMinutes()}</p>
	<p class="c-column1">distance:</p>
	<p class="c-column1 js-distance u-align-right">${fisrtFullMoon.distance/1000 }Km</p>
	<p class="c-column1">Illuminated:</p>
	<p class="c-column1 js-illuminated u-align-right">${fisrtFullMoon.illuminated}%</p>
	<p class="c-column1">angle:</p>
	<p class="c-column1 js-angle u-align-right">${fisrtFullMoon.angle}°</p>`
}
const showData = function(datalist){
	cardlist=document.querySelectorAll(".js-card");
	let i =0;
	cardlist.forEach(card => {
		let svg=selectimage();
		let date,time;
		let totalTime=0;
		let avgmin=[],avghours=[];
		let timeformat;
		
		
		let rise= new Date();
		currentlist=datalist[i]
		//console.log(currentlist);
		i++;
		if(currentlist.length==1){
			let timestamp=new Date(currentlist[0].rise);
			rise=timestamp;
			let currentDate=new Date(currentlist[0].date);
			date=`${currentDate.getDate()} ${currentDate.toLocaleString('default', { month: 'short' })}`;
			date = date.substring(0, date.length - 1);
			svg=selectimage(currentlist[0].phase);
			//console.log(svg);
		}else{
			let startdate,enddate;
			let datum;
			currentlist.forEach(item => {
				//console.log(item.rise);
				time=new Date(item.rise);
				// console.log(time);
				avgmin.push(time.getMinutes());
				avghours.push(time.getHours());
			});
			// console.log(avgmin);
			// console.log(avghours);
			svg=selectimage(currentlist[0].phase);
			//console.log(svg);
			datum=new Date(currentlist[0].date);
			startdate=`${datum.getDate()} ${datum.toLocaleString('default', { month: 'short' })}`;
			datum=new Date(currentlist[currentlist.length-1].date);
			enddate=`${datum.getDate()} ${datum.toLocaleString('default', { month: 'short' })}`;
			startdate = startdate.substring(0, startdate.length - 1);
			enddate = enddate.substring(0, enddate.length - 1);
			
			date=`${startdate} - ${enddate}`;
			let totalmin=0,totalhours=0;
			avgmin.forEach(minute => {
				
				totalmin+=minute;
			});
			avghours.forEach(hours => {
				totalhours+=parseInt(hours);
			});
			// console.log("hours",totalhours);
			// console.log("min",totalmin);
			let length=avgmin.length;
			totalmin=totalmin/length;
			totalhours=totalhours/length;
			//console.log(totalTime);
			rise.setHours(parseInt(totalhours));
			rise.setMinutes(parseInt(totalmin));
			// console.log(rise);
			
		}
		card.innerHTML=`<div class="c-page-imageview">
		${svg}
	</div>
	<div class="c-page-moonset">
		<svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 511.999 511.999" style="enable-background:new 0 0 511.999 511.999;" xml:space="preserve">
<g>
<g>
<path d="M508.745,246.041c-4.574-6.257-113.557-153.206-252.748-153.206S7.818,239.784,3.249,246.035
c-4.332,5.936-4.332,13.987,0,19.923c4.569,6.257,113.557,153.206,252.748,153.206s248.174-146.95,252.748-153.201
C513.083,260.028,513.083,251.971,508.745,246.041z M255.997,385.406c-102.529,0-191.33-97.533-217.617-129.418
c26.253-31.913,114.868-129.395,217.617-129.395c102.524,0,191.319,97.516,217.617,129.418
C447.361,287.923,358.746,385.406,255.997,385.406z"/>
</g>
</g>
<g>
<g>
<path d="M255.997,154.725c-55.842,0-101.275,45.433-101.275,101.275s45.433,101.275,101.275,101.275
s101.275-45.433,101.275-101.275S311.839,154.725,255.997,154.725z M255.997,323.516c-37.23,0-67.516-30.287-67.516-67.516
s30.287-67.516,67.516-67.516s67.516,30.287,67.516,67.516S293.227,323.516,255.997,323.516z"/>
</g>
</g>

		</svg>
		<div class="c-page-time">${rise.getHours()}:${String(rise.getMinutes()).padStart(2,'0')}</div>

	</div>
	<div class="c-page-date">${date}</div>`
	});
}
const convertData=function(){
	let temp=data.locations[0].astronomy.objects[0].days;
	// console.log(temp);
	
	
	temp.forEach(moon => {
		
		let rise,set,distance,altitude,illuminated,angle,meridian,id,min,hour,phase;
		rise=new Date();
		set=new Date();
		meridian=new Date();
		id=nummer;
		nummer++;
		// console.log(id);
		moon.events.forEach(event => {
			// console.log(event);
			switch (event.type) {
				case "set":
						set.setHours(event.hour,event.min);
						// console.log("set",set);
					break;
				case "rise":
						rise.setHours(event.hour,event.min);
						// console.log("rise",rise);
					break;
				case "meridian":
						meridian.setHours(event.hour,event.min);
						altitude=event.altitude;
						distance=event.distance;
						illuminated=event.illuminated;
						angle=event.posangle;
						// console.log("meridian",meridian);
					break;
			
				default:
					break;
			}
		});
		moondetail={"id":id,"date":moon.date,"rise":rise,"set":set,"distance":distance,"altitude":altitude,"illuminated":illuminated,"angle":angle,"meridian":meridian,"phase":moon.moonphase};
		moonlist.push(moondetail);
	});
	console.log(moonlist);
	if(document.querySelector(".js-back")){
		showdetailPage(moonlist);
	}else{
		groupData(moonlist);
	}
	
	
}
const groupData=function(convertedlist){
	let previousphase=convertedlist[0].phase;
	let phaselist=[],totallist=[];
	let i=0; 
	
	// convertedlist.forEach(element => {
	// 	console.log(element.phase);
		
	// });
	convertedlist.forEach(moonelement => {
		let currentphase;
		currentphase=moonelement.phase;
		if(previousphase!=currentphase){
			//cardlist[i].innerHTML=`${phaselist}`;
			totallist[i]=phaselist;
			phaselist=[];
			phaselist.push(moonelement);
			i++;
		}
		else{	
			phaselist.push(moonelement);
		}
		previousphase=currentphase;
		
	});
	i=0;

	console.log(totallist);
	
	showData(totallist);
}
const getsingleAPI = async () => {
	const timestamp="2020-11-29T18%3A58%3A19";
	const url = `https://api.xmltime.com/astrodata?accesskey=mnE03G8M47&timestamp=2020-11-29T16%3A18%3A06Z&signature=in2docczisQmwZfomm3VmWB245k%3D&version=3&object=moon&placeid=16&interval=${timestamp}`;
	const data =await fetch(url).then(res=>res.json())
		.catch(error=>console.error('Error:', error));    
		console.log(data);
		//showResult(data);
	};	
const getListAPI = async () => {
	dates=checkdate();
	console.log(dates)
	for(const time of dates){
		console.log(time)
		const url = `https://api.xmltime.com/astronomy?accesskey=cobSQSVDcg&secretkey=oKfh0gPxRagW3bkDYkzu&version=3&out=js&object=moon&placeid=16&startdt=${time.start}&enddt=${time.end}&types=all`;
		data =await fetch(url).then(res=>res.json())
			.catch(error=>console.error('Error:', error));    
			console.log(data);
			//showResult(data);
			convertData();
	}
	let stringjson=JSON.stringify(moonlist);
	console.log(stringjson);
	
	};

const readTextFile = async (file) => {
	data=await fetch(file)
		.then(response => response.json())
		.then(jsonResponse => data=jsonResponse)  
		console.log(data)
		if(document.querySelector(".js-back")){
			console.log("testen");
			showdetailPage(data);
		}else{
			groupData(data);
		}
		
		// for(item of data){
		// 	console.log(item)
		// }
		
		
	};
	
const checkdate=function(){
	const date=new Date();
	timelist=[];
	for (let i = 0; i < 3; i++) {
		
	let day=date.getDate();
	let month=date.getMonth()+1;
	if(i>0&&month>=12){
		month=0;
	}
	let year=date.getFullYear();
	let startdt=``;
	let enddt=``;
	if(day<10){
		startdt=`${year}-${month+i}-0${day}`
		enddt=`${year}-${month+1+i}-0${day}`
		if(month<10){
			startdt=`${year}-0${month+i}-0${day}`
			enddt=`${year}-0${month+1+i}-0${day}`
		}
		else{
			startdt=`${year}-${month+i}-0${day}`
			enddt=`${year}-${month+1+i}-0${day}`
		}
	}
	else{
		startdt=`${year}-${month+i}-${day}`
		enddt=`${year}-${month+1+i}-${day}`
		if(month<10){
			startdt=`${year}-0${month+i}-${day}`
			enddt=`${year}-0${month+1+i}-${day}`
		}
	}
	if(month==12){
		if(day<10){	
			enddt=`${year+1}-01-0${day}`

		}
		else{
			enddt=`${year+1}-01-${day}`
		}
	}
	timelist.push({"start":startdt,"end":enddt})
	}	
	return timelist
}
const addEventListeners = function(){
	if(document.querySelector(".js-back")){
		document.querySelector(".js-back").addEventListener("click",function(){
			window.history.back();
		});
		
	};


	if(document.querySelector(".js-card")){
		
		document.querySelector(".js-detail").addEventListener("click",function(){
			console.log(window.location);
			window.location.replace("/project-interaction-design/detail.html");
			
		});
		
		// let cards=document.querySelectorAll(".js-card");
		
		// for (const card of cards) {
		// 	// console.log(card);
		// 	this.addEventListener("click",function(){

		// 	});
		// }

	};
}
document.addEventListener('DOMContentLoaded', function() {
	// 1 We will query the API with longitude and latitude.
	getListAPI(); //will use for end
	//readTextFile("http://127.0.0.1:5500/tempData.json");
	addEventListeners();
	console.info("dom loaded");
});
