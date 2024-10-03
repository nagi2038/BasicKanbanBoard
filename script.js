let addbtn = document.querySelector(".add-btn");
let uuid = new ShortUniqueId();
let priorityColor = document.querySelectorAll(".priority-color");
let deletebtn = document.querySelector(".remove-btn");

addbtn.addEventListener("click", (e) => {
  // hide and display the task creation page.
  let taskcrt = document.querySelector(".model-cont");
  taskcrt.style.display = taskcrt.style.display ? "" : "flex";
  textarea.focus();
});


localStorage.setItem("Sample", [JSON.stringify({id:1, name:"hello"}) , JSON.stringify({id:2,name:"nagi"})])
localStorage.setItem("Sample2", JSON.stringify([{id:1, name:"hello"} , {id:2,name:"nagi"}]) )

deletebtn.addEventListener("click", (e) => {
  deletebtn.style.color = deletebtn.style.color == "red" ? "black" : "red";
});

let textarea = document.querySelector("textarea");
textarea.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    let txt = textarea.value;
    let color = document.querySelector(".priority-color.active").classList[1];
    // console.log(txt);
    createTicket(txt,color);
    textarea.value = "";
    let taskcrt = document.querySelector(".model-cont");
    taskcrt.style.display = "";
  }
});

let TicketStore = []

if(localStorage.getItem("TicketStore")){
  tickets = JSON.parse(localStorage.getItem("TicketStore"))

  for(let i = 0; i < tickets.length; i++){
    let tkt = JSON.parse(tickets[i])
    createTicket(tkt.value , tkt.color , tkt.id)
  }
}

for (i = 0; i < priorityColor.length; i++) {
  priorityColor[i].addEventListener("click", function (e) {
    for (j = 0; j < priorityColor.length; j++) {
      if (priorityColor[j].classList.contains("active"))
        priorityColor[j].classList.remove("active");
    }
    e.target.classList.add("active");
  });
}

function createTicket(text,color,ticketId) {
  // <div class="ticket-cont">
  //     <div class="ticket-color pink"></div>
  //     <div class="ticket-id">12345</div>
  //     <div class="ticket-area">this text</div>
  //     <img src="" alt="" />

  // need to create above strucutre
  let ticketCont = document.createElement("div");
  ticketCont.className = "ticket-cont";

  

  // let ticketColor = document.createElement('div');
  // ticketColor.className = 'ticket-color'

  // let ticketId = document.createElement('div');
  // ticketId.className = 'ticket-id';

  // let ticketArea = document.createElement('div');
  // ticketArea.className = 'ticket-area';
  let id ;
  if(ticketId){
    id = ticketId
  }
  else{
    id = uuid.rnd();
    let tkt = JSON.stringify({id:id, color : color, value:text})
    TicketStore.push(tkt)
    localStorage.setItem("TicketStore",JSON.stringify(TicketStore));
  }
  ticketCont.innerHTML = `<div class="ticket-color ${color}"></div>
    <div class="ticket-id">#${id}</div>
    <div class="ticket-area">${text}</div>
    <div class="ticket-lock">
    <i class="fa-sharp-duotone fa-solid fa-lock"></i>
    </div>`;
    
  let parentCont = document.querySelector(".main-cont");
  parentCont.appendChild(ticketCont);

  let lock = ticketCont.querySelector(".ticket-lock>i");
  ticketCont.addEventListener("click", (e) => {
    let isdeleteEnabled = document.querySelector(".remove-btn");
    if (isdeleteEnabled.style.color == "red") {

      deleteTicket(getTicketIndex(id))
      ticketCont.remove();
    }
  });

  lock.addEventListener("click", (e) => {
    let content = ticketCont.querySelector(".ticket-area");
    if (lock.classList.contains("fa-lock")) {
      // lock.classList.remove("fa-lock");
      // lock.classList.add("fa-lock-open");
      lock.classList.replace("fa-lock","fa-lock-open" )
      content.setAttribute("contenteditable", "true");
    } else {
      // lock.classList.remove("fa-lock-open");
      // lock.classList.add("fa-lock");
      changeTicketText(getTicketIndex(id),content.innerText)
      console.log(content , content.value)
      lock.classList.replace("fa-lock-open","fa-lock" )
      content.setAttribute("contenteditable", "false");
      
    }
  });

  let ticketcolor = ticketCont.querySelector('.ticket-color');
  let colours = []
  priorityColor.forEach((pcolor)=>{
    colours.push(pcolor.classList[1])
  })
  
  ticketcolor.addEventListener('click',(e)=>{
    let isdeleteEnabled = document.querySelector(".remove-btn");
    if (isdeleteEnabled.style.color == "red") {

      return;
    }
    let colorIndex = colours.indexOf(ticketcolor.classList[1])
    ticketcolor.classList.replace(colours[colorIndex], colours[(colorIndex+1)%colours.length])
    // ticketcolor.classList.add(colours[(colorIndex+1)%colours.length])
    let  index = getTicketIndex(id)
    changeTicketColor( index , colours[(colorIndex+1)%colours.length])
  })


//   MY SOLUTION ONLY WORKS FOR ONE ITERATION ?
//   ticketcolor.addEventListener('click', (e)=>{
//     let colors = document.querySelectorAll('.priority-color')
//     let currentColor = ticketCont.classList[1]
//     for(i=0;i<colors.length;i++){
//         if(colors[i].classList.contains(currentColor)){
//             break;
//         }
//     }
//     ticketcolor.classList.remove(currentColor)
//     ticketcolor.classList.add(colors[(i+1)%colors.length].classList[1])

//   })
}

function getTicketIndex(id){
  tickets = JSON.parse(localStorage.getItem("TicketStore"))

  for(let i = 0; tickets.length; i++){
    let tkt = JSON.parse(tickets[i])
    if(id == tkt.id){
      return  i;
    }
  }
}

function changeTicketColor(index, updateColor ){
  let tickets = JSON.parse(localStorage.getItem("TicketStore"))
  let tktStr = tickets[index]
  let tkt = JSON.parse(tktStr)
  tkt.color = updateColor
  tickets[index] = JSON.stringify(tkt)
  localStorage.setItem("TicketStore", JSON.stringify(tickets))
}

function changeTicketText(index, updataedText){
  let tickets = JSON.parse(localStorage.getItem("TicketStore"))
  let tktStr = tickets[index]
  let tkt = JSON.parse(tktStr)
  tkt.value = updataedText
  tickets[index] = JSON.stringify(tkt)
  localStorage.setItem("TicketStore", JSON.stringify(tickets))
}

function deleteTicket(index){
  let tickets = JSON.parse(localStorage.getItem("TicketStore"))
  tickets.splice(index,1)
  localStorage.setItem("TicketStore", JSON.stringify(tickets))
}

let filterColor = document.querySelectorAll(".color")
// console.log(filterColor)
for(let i =0 ; i<filterColor.length; i++){
  filterColor[i].addEventListener("click",(e)=>{
    // console.log(e)
    let tickets = document.querySelectorAll('.ticket-cont')
    let reqcolor = e.target.classList[1]
    for(let j=0; j<tickets.length ; j++){
      // console.log(reqcolor  , tickets[j].querySelector('.ticket-color').classList , tickets[j].querySelector('.ticket-color').classList.contains(reqcolor))
      if(tickets[j].querySelector('.ticket-color').classList.contains(reqcolor)){
        tickets[j].style.display = "block";
      }
      else{
        tickets[j].style.display = "none";
      }
    }
  })

  filterColor[i].addEventListener("dblclick",(e)=>{
    // console.log(e)
    let tickets = document.querySelectorAll('.ticket-cont')
    let reqcolor = e.target.classList[1]
    for(let j=0; j<tickets.length ; j++){
      // console.log(reqcolor  , tickets[j].querySelector('.ticket-color').classList , tickets[j].querySelector('.ticket-color').classList.contains(reqcolor))
        tickets[j].style.display = "block";

    }
  })
}