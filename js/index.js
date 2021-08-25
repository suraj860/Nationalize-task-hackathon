
//creating all the necessary html elements using DOM 
// following code upto line 36 is all to create an HTML skeleton
// kept some code in comments in order to check errors if any occurs.

const mainparent =  document.createElement("div")
mainparent.setAttribute("class","mainparent")

const form = document.createElement("div")
form.setAttribute("class","form")
form.setAttribute("id","myForm")

form.innerHTML =`
<input  id="text" placeholder="Enter Your First Name">
<button class="submit" onclick="searching()">Search</button>
`
// document.body.append(form)

const container = document.createElement("div")
container.setAttribute("class","container")

// document.body.append(container)

const container2 = document.createElement("div")
container2.setAttribute("class","container2")
// document.body.append(container2)

const container3 = document.createElement("div")
container3.setAttribute("class","container3")
container3.innerHTML=`
<h2 class="defaultmsg">What is your Nationality ? </h2>
<h2 class="defaultmsg">Enter Name to Know !!</h2>
`

mainparent.append(form,container,container2,container3)
document.body.append(mainparent)


// Aim - Use fetch() to get the data from Nationalize Api
        //  Search for the nationality based on name.
        //  If you get the response back, display the top two countries.
        //  Also display the probability value.

// Approach - 1. To convert the fetched data into json format
            // 2.acesses each object using dot method
            // 3. using dot method got the countries from the data
            // 4. create a code in such manner that on entering name in textbox you should get two countries w.r.t name
            // 5. to get above condition created form using Dom and added a button which on click will perform a certain FUNCTION 
            // 6. create a such function to follow following logic
            // 7. various condition - 1. if country array length is 0 
            //                        2. if country array length is 3 then display first two countries only with their respective names
            //                        3. if array length is 1 then display only one country with the name 
            //                        4 .get the probability value respectively and display them as a whole number
            // 8.fetched data from one more api to get images and country whole name instead of just code
            // 9.used loop to get the image w.r.t the country name
            // 10. at last manipulate the innerHTML of resp divs using DOM and display output.
            // 11.validate the form




//onclick of button searching() get triggered

async function searching(){

    // store input value from text box
    let search = document.querySelector("#text").value
    // console.log(search);

    // callback function in order to check whether user has enterd correct text
    // function wrirtten at 232 line
    validation(search)

    //fetching data from nationalize.io
    const data = await fetch("https://api.nationalize.io/?name="+ search)
    const data1 = await data.json()

    // console.log(data1)
    // console.log(data1.country.length)

    // callback to perform required logic with fetched data
    country(data1)
}


// main function that contain whole logic as well as manipulation of HTML USING DOM

async function country(data1){
   
    // to avoid the duplication and repetation of the data

    document.querySelector(".container").innerHTML= ""
    document.querySelector(".container2").innerHTML= ""

    var arrLength = data1.country.length

    // condition if we dont find any country w.r.t to entered name of user
    if(arrLength===0){
        return(document.querySelector(".container3").innerHTML=`<h2 class="finalmsg2"> Sorry!! We Can't Find Your Nationality</h2>`)
        
    }

    // fetched allcountries api to get resp. countries images

    const datas = await fetch("https://restcountries.eu/rest/v2/all")
    const data2 = await datas.json()

    // declared variables to store the data fetched from resp api and use in manipulating HTML

    let flag01;
    let country01;
    let flag02;
    let country02;
    let flag03;
    let country03;
    
    // to get image looped from all countries  api data and checked for the country code and used flag image associated to that country code

    data2.forEach((value)=>{
       
    if(value.alpha2Code == data1.country[0].country_id && arrLength===1){
        flag01 = value.flag
        country01 = value.name
        
    }else if (arrLength>1){
        
        if(value.alpha2Code == data1.country[0].country_id){
            flag02 = value.flag
            country02 = value.name
           }
        if(value.alpha2Code == data1.country[1].country_id){
            flag03 = value.flag
            country03 = value.name
           }

        
        }
    
    })

// after getting respective image perform folloeing logic 

// created new div and appended to container class div in the body "TO DISPLAY THE NAME"
    const div1 = document.createElement("div")
    div1.setAttribute("class","div1")
    div1.innerHTML=`
    <h2 class="nameTitle">${(data1.name).toUpperCase()}</h2
    `
    container.append(div1)

// FROM HERE CHECKING THE CONDITION FOR DATA TO DISPLAY AND MANIPULATING NEEDED HTML CODES

    if(arrLength===1){

        // stored probability value because later i needed this value instead of just adding it in ${}
        let probality1 = (data1.country[0].probability)*100 

        // only one country then adds only one div to resp. container in body
        const div3 = document.createElement("div")
        div3.setAttribute("class","div3")
        div3.innerHTML=`  
        <div class="flag"><img src=" ${flag01}" alt="">
       </div>
        <h2 class="countryname">${country01} </h2>
        <h2 class="prob1"><span> Probability: </span> ${(probality1.toFixed(1))} %</h2>
        `
        document.querySelector(".container2").append(div3)

        // changing color of probability value
        document.querySelector(".prob1").style.color= "rgb(22, 201, 22)"
        
        // display msg where u belong
        const nationality1 =document.querySelector(".container3")
        nationality1.innerHTML =`
        <h2 class="finalmsg">  Your Nationality is  ${country01}</h2>
        `
    }else{

        // if arraaylength >1
        let probality2 = (data1.country[0].probability)*100
        let probality3 = (data1.country[1].probability)*100

        // first div displays first country
        const div4 = document.createElement("div")
        div4.setAttribute("class","div4")
       
         div4.innerHTML=`
         <div class="flag1"><img src=" ${flag02}" alt=""></div>
        <h2 class="countryname">${country02} </h2>
        <h2 class="prob2"><span> Probability:</span> ${probality2.toFixed(1)} %</h2>
        `      
        document.querySelector(".container2").append(div4)

    //    adds second div and displays second country

        const div5 = document.createElement("div")
        div5.setAttribute("class","div5")
        div5.innerHTML=`
        <div class="flag2"><img src=" ${flag03}" alt=""></div>
        <h2 class="countryname">${country03}</h2>
        <h2 class="prob3"><span>Probability:</span> ${probality3.toFixed(1)} %</h2>
            `  
        document.querySelector(".container2").append(div5)

        // callback function at line 212
        probalityColor(probality2,probality3,country02,country03)
    }
    // empty textbox value after performing whole function
    document.querySelector("#text").value =""
}


// function to display final message and change color of probability value i.e red or green

function probalityColor(x,y,country02,country03){
    if(x>y){
        document.querySelector(".prob2").style.color = "rgb(22, 201, 22)"
        document.querySelector(".prob3").style.color = "red"
        const nationality =document.querySelector(".container3")
        nationality.innerHTML =`
        <h2 class="finalmsg">  Your Nationality is  ${country02}</h2>
        `
    }else{
        document.querySelector(".prob2").style.color = "red"
        document.querySelector(".prob3").style.color = "rgb(22, 201, 22)"
        const nationality =document.querySelector(".container3")
        nationality.innerHTML =`
        <h2 class="finalmsg">${country03}</h2>
        `
    }
}


//function to check validation of form

const validation =(value)=>{
    if(value==""){
        return(document.querySelector(".container3").innerHTML=`<h2 class="finalmsg2"> Please Enter Your Name</h2>`)
    }
}

// in case user press enter button instead of clicking search button

document.onkeydown = function entryKey(event){
    if(event.keyCode== 13){
        searching()
    }
}

// THE END //