import {clearForm,isValidName,addDeleteEvent,callPostRequest,addRefreshEvent,clickWaitButton,handleError} from './script.js';

document.getElementById("cancel-btn").onclick=clearForm;

addRefreshEvent();

document.forms[0].onsubmit=function(event){
  event.preventDefault();
  let form_data=new FormData(this);
  let error=[];
  if(form_data.get("employee-name")===""){
    error.push("ادخل اسم للموظف");
  }
  else if(!isValidName(form_data.get("employee-name"))){
    error.push("ادخل اسم صحيح للموظف")
  }
  else if(form_data.get("national-id")===""){
    error.push("ادخل رقم الهوية للموظف");
  }
  else if(form_data.get("national-id").length!=9){
    error.push("رقم الهوية يتكون من تسعة ارقام")
  }
  else if(form_data.get("employee-phonenumber")===""){
    error.push("ادخل رقم هاتف المحمول للموظف");
  }
  else if(form_data.get("employee-phonenumber").length!=10){
    error.push("ادخل رقم هاتف المحمول من عشرة ارقام")
  }
  else if(form_data.get("salary")===""){
    error.push("ادخل راتب للموظف");
  }

  if(error.length!=0){
    let error_msg=document.getElementById("error-msg");
    error_msg.style.display="block";
    error_msg.innerHTML=error.pop(); 
  } 
  
  else{
    clickWaitButton();
    //sent post request.
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/users")
  }
}

function generateEmployees(employees_data){
let cards_container=document.getElementById("cards-container");
employees_data.forEach(function(employee){
  cards_container.innerHTML+=`
  <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
  <!-- بداية الكارد -->
  <div class="card" >
    <i class="fa-regular fa-user mt-4 text-center text-dark" style="font-size: 4rem;"></i>
    <hr class="dropdown-divider text-dark bg-dark mt-4">
    <div class="card-body">
      <h5 class="card-title text-center mb-4">موظف</h5>
      <div class="mb-1 col">
        <p class="card-text fs-6">اسم الموظف:<span class="employee-name"> ${employee.name.firstname}</span></p>
      </div>
      <div class="mb-1">
        <p class="card-text"> رقم الموظف:<span class="employee-id">${employee.id}</span></p>
      </div>
      <div class="mb-1">
        <p class="card-text"> الهاتف المحمول: <span class="employee-phonenumber">${employee.name.lastname}</span></p>
      </div>
      <div class="mb-1">
        <p class="card-text mt"> الحالة: <span class="text-success">يعمل</span></p>
      </div>
      <!-- first modal -->
      <div class="row">
        <div class="col d-flex justify-content-between ">
          <a href="#" class="btn btn-primary mt-4 ">التفاصيل</a>
          <button class="delete-employee btn btn-danger pt-0 h-50 mt-4" data-bs-toggle="modal" data-bs-target="#employee-${employee.id}">حذف</button>
          <!-- حذف الموظف -->
          <div class="modal fade" id="employee-${employee.id}" tabindex="-1" aria-labelledby="employee-${employee.id}" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body" style="direction: rtl;">
                  <p class="card-text fs-5 p-1">هل انت متاكد من حذف الموظف ${employee.name.firstname}؟</p>
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

function displayEmployees(){
  fetch(`https://fakestoreapi.com/users`)
  .then((response) =>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then((employees_data)=>{
    let cards_container=document.getElementById("cards-container");
    if(employees_data.length===0){
      cards_container.innerHTML=`
      <div class="col-12 fs-4 g-lg-5 g-4 mt-5 text-center">
      لا يوجد موظفين  
      </div>
      `
    }
    else{
      generateEmployees(employees_data);
      addDeleteEvent(employees_data,"https://fakestoreapi.com/users");
    }
    
  })
  .catch(error=>{
    handleError();
    console.log(error);
  });
}

displayEmployees();