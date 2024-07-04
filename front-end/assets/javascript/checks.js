import {clearForm,isValidName,callPostRequest,addDeleteEvent,addRefreshEvent,clickWaitButton,handleError} from './script.js';

addRefreshEvent();

document.getElementById("cancel-btn").onclick=clearForm;

document.forms[0].addEventListener("submit",function(event){
  let form_data=new FormData(this);
  event.preventDefault();
  let error=[];
  if(form_data.get("check-value")===""){
    error.push("ادخل قيمة للشيك");
  }
  else if(form_data.get("sender-name")===""){
    error.push("ادخل اسم المرسل للشيك");
  }
  else if(!isValidName(form_data.get("sender-name"))){
    error.push("اسم المرسل غير صالح");
  }
  else if(form_data.get("sender-phonenumber")===""){
    error.push("ادخل رقم هاتف المحمول للموظف");
  }
  else if(form_data.get("sender-phonenumber").length!=10){
    error.push("ادخل رقم هاتف المحمول من عشرة ارقام");
  }
  else if(form_data.get("dueDate")===""){
    error.push("ادخل تاريخ صرف الشيك");
  }
  else if(form_data.get("receiver-name")===""){
    error.push("ادخل اسم المستقبل للشيك");
  }
  else if(!isValidName(form_data.get("receiver-name"))){
    error.push("اسم المستقبل غير صالح");
  }
  else if(form_data.get("receiver-phonenumber")===""){
    error.push("ادخل رقم هاتف المحمول للموظف");
  }
  else if(form_data.get("receiver-phonenumber").length!=10){
    error.push("ادخل رقم هاتف المحمول من عشرة ارقام");
  }
  
  if(error.length!=0){
    let error_msg=document.getElementById("error-msg");
    error_msg.style.display="block";
    error_msg.innerHTML=error.pop();
  }
  else{
    clickWaitButton();
    //sent post request
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/products");
  }
})

function generateChecks(checks_data){
  let cards_container=document.getElementById("cards-container");
  checks_data.forEach(function(check){
      cards_container.innerHTML+=`
      <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
      <!-- بداية الكارد -->
      <div class="card" >
        <i class="fa-solid fa-money-check mt-4 text-center text-dark" style="font-size: 4rem;"></i>
        <hr class="dropdown-divider mt-4">
        <div class="card-body">
          <h5 class="card-title text-center mb-4">شيك</h5>
          <div class="mb-2 col">
            <p class="card-text fs-6">قيمة الشيك:<span class="employee-name">  ${check.id}</span></p>
          </div>
          <div class="mb-2 col">
            <p class="card-text fs-6">اسم المرسل:<span class="employee-name">${check.price}</span></p>
          </div>
          <div class="mb-2">
            <p class="card-text"> رقم الهاتف للمرسل:<span class="employee-id">0596430030</span></p>
          </div>
          <div class="mb-2">
            <p class="card-text"> تاريخ الصرف : <span class="employee-phonenumber">${check.rating.count}</span></p>
          </div>
          <div class="mb-2">
            <p class="card-text mt"> اسم المستقبل <span class="text-success"> ${check.rating.rate}</span></p>
          </div>
          <div class="mb-2">
            <p class="card-text"> رقم الهاتف للمستقبل:<span class="employee-id">0596430030</span></p>
          </div>
          <!-- first modal -->
          <div class="row">
            <div class="col d-flex justify-content-between"> 
              <button class="delete-employee btn btn-danger p-3 d-flex align-items-center h-50 mt-4" data-bs-toggle="modal" data-bs-target="#${check.id}">حذف</button>
              <!-- حذف الموظف -->
              <div class="modal fade" id="${check.id}" tabindex="-1" aria-labelledby="${check.id}" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-body" style="direction: rtl;">
                      <p class="card-text fs-5 p-1">هل انت متاكد من حذف الشيك؟ ${check.id}</p>
                    </div>
                    <div class="modal-footer d-flex justify-content-between ">
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

function displayChecks(){
  fetch("https://fakestoreapi.com/products")
  .then((response)=>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((checks_data)=>{
    if(checks_data.length===0){
      let cards_container=document.getElementById("cards-container");
      cards_container.innerHTML=`
        <div class="col-12 fs-4 g-lg-5 g-4 mt-5 text-center">
        لا يوجد اليات  
        </div>
        `
    }
    else{
      generateChecks(checks_data);
      addDeleteEvent(checks_data,"https://fakestoreapi.com/products");
    }
    
  })
.catch((error)=>{
  handleError()
  console.log(error);
  })
}

displayChecks();
