import {clearForm,isValidName,callPostRequest,addDeleteEvent,addRefreshEvent,clickWaitButton,handleError} from './script.js';

document.getElementById("cancel-btn").onclick=clearForm;

addRefreshEvent();

document.forms[0].onsubmit=function(event){
  let form_data=new FormData(this);
  let error=[];
  if(form_data.get("workshop-name")===""){
    error.push("ادخل اسم الورشة");
  }
  else if(form_data.get("workshop-owner-name")===""){
    error.push("ادخل اسم مالك الورشة");
  }
  else if(!isValidName(form_data.get("workshop-owner-name"))){
    error.push("اسم مالك الورشة غير صالح");
  }
  else if(form_data.get("workshop-phonenumber")===""){
    error.push("ادخل رقم الهاتف المحمول لصاحب الورشة");
  }
  else if(form_data.get("workshop-phonenumber").length!=10){
    error.push("رقم الهاتف المحمول يتكون من عشرة ارقام");
  }

  if(error.length!=0){
    let error_msg=document.getElementById("error-msg");
    error_msg.innerHTML=error.pop();
    error_msg.style.display="block";
      event.preventDefault();
  }
  else{
    clickWaitButton();
    //sent post requset
    event.preventDefault();
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/carts")
  }
}

function generateWorkshops(workshops_data){
  let cards_container=document.getElementById("cards-container");
  workshops_data.forEach(function(workshop){
      cards_container.innerHTML+=`
      <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
              <!-- بداية الكارد -->
              <div class="card" >
                <i class="fa-solid fa-gears mt-4 text-center text-dark" style="font-size: 4rem;"></i>
                <hr class="dropdown-divider mt-4">
                <div class="card-body">
                  <h5 class="card-title text-center mb-4">ورشة</h5>
                  <div class="mb-1 col">
                    <p class="card-text fs-6">اسم ورشة:<span class="workshop-name">${workshop.id}</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text">  اسم مالك الورشة:<span class="employee-id">${workshop.userId}</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> الهاتف المحمول: <span class="employee-phonenumber">${workshop.date}</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text mt"> نوع الورشة: <span class="workshop-type">ورشة</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text mt"> الحالة : <span class=" fw-bold">تعمل</span></p>
                  </div>
                  <!-- first modal -->
                  <div class="row">
                    <div class="col d-flex justify-content-between">
                      <button href="#" class="btn btn-primary mt-4 ">التفاصيل</a>
                      <button class="delete-employee btn btn-danger pt-0 h-50 mt-4" data-bs-toggle="modal" data-bs-target="#workshop-${workshop.id}">حذف</button>
                      <!-- حذف الورشة -->
                      <div class="modal fade" id="workshop-${workshop.id}" tabindex="-1" aria-labelledby="workshop-${workshop.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-body" style="direction: rtl;">
                              <p class="card-text fs-5 p-1"> ${workshop.id}هل انت متاكد من حذف الورشة</p>
                            </div>
                            <div class="modal-footer d-flex justify-content-between ">
                              <form action="" class="delete-form" style="width: 100%;">
                              <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-success " data-bs-dismiss="modal">لا</button>
                                <input type="submit"  class="btn btn-danger" data-bs-target="#wait-delete-msg" data-bs-dismiss="modal"  data-bs-toggle="modal"   value="نعم">
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

function displayWorkshops(){
  fetch("https://fakestoreapi.com/carts")
  .then(response=>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(workshops_data=>{
    if(workshops_data.length===0){
        let cards_container=document.getElementById("cards-container");
      cards_container.innerHTML=`
        <div class="col-12 fs-4 g-lg-5 g-4 mt-5 text-center">
        لا يوجد ورشات  
        </div>
        `
    }
    else{
      generateWorkshops(workshops_data)
      addDeleteEvent(workshops_data,"https://fakestoreapi.com/carts")
    }
  })
.catch(error=>{
  handleError();
  console.log(error);
  })
}
displayWorkshops();

