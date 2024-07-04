import {clearForm,addDeleteEvent,callPostRequest,addRefreshEvent,clickWaitButton,handleError} from './script.js';

document.getElementById("cancel-btn").onclick=clearForm;

addRefreshEvent();

document.forms[0].onsubmit=function(event){
  event.preventDefault();
  let form_data=new FormData(this);
  let error=[];
  if(form_data.get("vehicle-name")===""){
    error.push("ادخل اسم الالية");
  }
  else if(form_data.get("vehicle-id")===""){
    error.push("ادخل رقم النمرة للالية");
  }
  else if(form_data.get("vehicle-price")===""){
    error.push("ادخل السعر الكلي للالية");
  }
if(error.length!=0){
    let error_msg=document.getElementById("error-msg");
    error_msg.style.display="block"
    error_msg.innerHTML=error.pop();
      
  }
  else{
    clickWaitButton();
    //sent post request
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/products");
  }
  
}

function generateVehicles(vehicles_data){
let cards_container=document.getElementById("cards-container");
vehicles_data.forEach(function(vehicle){
    cards_container.innerHTML+=`
    <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
    <!-- بداية الكارد -->
    <div class="card" >
      <i class="fa-solid fa-tractor text-center mt-5 mb-4 text-dark" style="font-size: 4rem;"></i>
      <hr class="dropdown-divider mt-4">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">الية</h5>
        <div class="mb-1 col">
          <p class="card-text fs-6">اسم الآلة:<span class="vehicle-name">${vehicle.category}</span></p>
        </div>
        <div class="mb-1">
          <p class="card-text"> رقم النمرة:<span class="vehicle-id">${vehicle.id}</span></p>
        </div>
        <div class="mb-1">
          <p class="card-text mt"> الحالة: <span class="text-success">قيد العمل</span></p>
        </div>
        <!-- first modal -->
        <div class="row">
          <div class="col d-flex justify-content-between">
            <a href="#" class="btn btn-primary mt-4 ">التفاصيل</a>
            <button class="delete-vehicle btn btn-danger pt-0 h-50 mt-4" data-bs-toggle="modal" data-bs-target="#vehicle-${vehicle.id}">حذف</button>
            <!-- حذف الموظف -->
            <div class="modal fade" id="vehicle-${vehicle.id}" tabindex="-1" aria-labelledby="vehicle-${vehicle.id}" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-body" style="direction: rtl;">
                    <p class="card-text fs-5 p-1 ">هل انت متاكد من حذف الالة ${vehicle.id}؟</p>
                  </div>
                  <div class="modal-footer d-flex justify-content-between ">
                    <form action="" class="delete-form" style="width: 100%;">
                    <div class="d-flex justify-content-between">
                      <button type="button" class="btn btn-success " data-bs-dismiss="modal">لا</button>
                      <input type="submit"  class="btn btn-danger" data-bs-target="#wait-delete-msg" data-bs-dismiss="modal"  data-bs-toggle="modal"  value="نعم">
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


function displayVehicles(){
  fetch("https://fakestoreapi.com/products")
  .then((response)=>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((vehicles_data)=>{
    if(vehicles_data.length===0){
      let cards_container=document.getElementById("cards-container");
      cards_container.innerHTML=`
        <div class="col-12 fs-4 g-lg-5 g-4 mt-5 text-center">
        لا يوجد اليات  
        </div>
        `
    }
    else{
      generateVehicles(vehicles_data);
      addDeleteEvent(vehicles_data,"https://fakestoreapi.com/products");
    }
  })
.catch((error)=>{
  handleError();
  console.log(error);
  })

}
displayVehicles();

