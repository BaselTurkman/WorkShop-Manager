import {clearForm,addDeleteEvent,callPostRequest,clickWaitButton,addRefreshEvent,handleError} from './script.js';

addRefreshEvent();

document.getElementById("cancel-btn").onclick=clearForm;

document.forms[0].onsubmit=function(event){
  event.preventDefault();
  let form_data=new FormData(this);
  let error=[];
  if(form_data.get("station-name")===""){
    error.push("ادخل اسم المحطة");
  }
  else if(form_data.get("station-owner-name")===""){
    error.push("ادخل اسم مالك المحطة");
  }
  else if(form_data.get("station-phonenumber")===""){
    error.push("ادخل رقم صاحب المحطة")
  }
  else if(form_data.get("station-phonenumber").length!=10){
    error.push("رقم الهاتف المحمول يتكون من عشرة ارقام");
  }
  else if (form_data.get("station-balance")===""){
    error.push("ادخل رصيد للمحطة")
  }

  if(error.length!=0){
    let error_msg=document.getElementById("error-msg");
    error_msg.innerHTML=error.pop();
    error_msg.style.display="block";
  }
  else{
    clickWaitButton();
    //sent post request
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/products");
  }
}

function generateStations(stations_data){
  console.log(stations_data);
  let cards_container=document.getElementById("cards-container");
  stations_data.forEach(function(station){
      cards_container.innerHTML+=`
      <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
              <!-- بداية الكارد -->
              <div class="card" >
                <i class="fa-solid fa-gas-pump mt-4 text-center text-dark" style="font-size: 4rem;"></i>
                <hr class="dropdown-divider mt-4">
                <div class="card-body">
                  <h5 class="card-title text-center mb-4">محطة</h5>
                  <div class="mb-1 col">
                    <p class="card-text fs-6">اسم المحطة:<span class="station-name">${station.category}</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text">اسم المالك:<span class="station-owner-name">${station.rating.rate}</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> الهاتف المحمول: <span class="station-phonenumber">${station.rating.count}</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text mt"> الرصيد: <span class="text-success">${station.price} </span></p>
                  </div>
                  <!-- first modal -->
                  <div class="row">
                    <div class="col d-flex justify-content-between">
                      <a href="#" class="btn btn-primary mt-4 ">التفاصيل</a>
                      <button class="delete-station btn btn-danger pt-0 h-50 mt-4" data-bs-toggle="modal" data-bs-target="#station-${station.id}">حذف</button>
                      <!-- حذف المحطة -->
                      <div class="modal fade" id="station-${station.id}" tabindex="-1" aria-labelledby="station-${station.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-body" style="direction: rtl;">
                              <p class="card-text fs-5 p-1">هل انت متاكد من حذف المحطة ${station.id}؟</p>
                            </div>
                            <div class="modal-footer d-flex justify-content-between">
                              <form action="" class="delete-form" style="width: 100%;">
                              <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-success " data-bs-dismiss="modal">لا</button>
                                <input type="submit"  class="btn btn-danger"  data-bs-target="#wait-delete-msg" data-bs-dismiss="modal"  data-bs-toggle="modal" value="نعم">
                              </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
      `
  })
}

function displayStations(){
  fetch("https://fakestoreapi.com/products")
  .then((response)=>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((stations_data)=>{
    if(stations_data.length===0){
      let cards_container=document.getElementById("cards-container");
      cards_container.innerHTML=`
        <div class="col-12 fs-4 g-lg-5 g-4 mt-5 text-center">
        لا يوجد اليات  
        </div>
        `
    }
    else{
      generateStations(stations_data);
      addDeleteEvent(stations_data,"https://fakestoreapi.com/products");
    }
    
  })
.catch((error)=>{
  handleError();
  console.log(error);
  })
}

displayStations();