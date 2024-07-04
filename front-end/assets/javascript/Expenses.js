import {clearForm,isValidName,clickWaitButton,callPostRequest,addDeleteEvent,addRefreshEvent,handleError} from './script.js';

addRefreshEvent();

//clear form data
document.querySelectorAll(".cancel-btn").forEach(function(btn,index){
  btn.addEventListener("click",clearForm);
})

//clear error alert
document.querySelectorAll(".cancel-btn").forEach(function(btn){
  btn.addEventListener("click",function(){
    document.querySelectorAll(".error-msg").forEach(function(error_msg){
        error_msg.style.display="none";
        error_msg.innerHTML="";
      })
  })
})

// wait add expense alert
function clickWaitButtonV2(index){
document.querySelectorAll(".submit-btn")[index].setAttribute("data-bs-target","#wait-add-msg");
document.querySelectorAll(".submit-btn")[index].setAttribute("data-bs-dismiss","modal");
document.querySelectorAll(".submit-btn")[index].setAttribute("data-bs-toggle","modal");
document.querySelectorAll(".submit-btn")[index].click();
}

// select form op1 or op2 or op3
document.getElementById("next-btn").onclick=function(){
  if(document.getElementById("select-menu").value==="سحب محروقات"|| document.getElementById("select-menu").value==="محروقات كاش"){
    document.getElementById("next-btn").setAttribute("data-bs-target","#option1");
    document.getElementById("header1").innerHTML=document.getElementById("select-menu").value;
  }
  else if(document.getElementById("select-menu").value==="مصاريف تشغيلية"){
    document.getElementById("next-btn").setAttribute("data-bs-target","#option3");
  }
  else{
    document.getElementById("next-btn").setAttribute("data-bs-target","#option2");
    document.getElementById("header2").innerHTML=document.getElementById("select-menu").value;
  }
  document.getElementById("next-btn").click();
  document.getElementById("next-btn").setAttribute("data-bs-target","");
}

//validation first form
document.forms[0].addEventListener("submit",function(event){
  event.preventDefault();
  let form_data=new FormData(this);
  let error=[];
  console.log(form_data.get("vehicle-name"));
  if(form_data.get("vehicle-name")===""){
    error.push("ادخل اسم الالية");
  }
  else if(form_data.get("station-name")===""){
    error.push("ادخل اسم المحطة");
  }
  else if(form_data.get("expense-date")===""){
    error.push("ادخل تاريخ اضافة النفقة");
  }
  else if(form_data.get("employee-name")===""){
    error.push("ادخل اسم الموظف");
  }
  else if(!isValidName(form_data.get("employee-name"))){
    error.push("اسم الموظف غير صالح");
  }
  else if(form_data.get("payment")===""){
    error.push("ادخل مبلغ النفقة");
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
console.log(error);
})

//validation second form
document.forms[1].addEventListener("submit",function(event){
  event.preventDefault();
  let form_data=new FormData(this);
  let error=[];
  console.log(form_data.get("vehicle-name"));
  if(form_data.get("vehicle-name")===""){
    error.push("ادخل اسم الالية");
  }
  else if(form_data.get("expense-date")===""){
    error.push("ادخل تاريخ اضافة النفقة");
  }
  else if(form_data.get("employee-name")===""){
    error.push("ادخل اسم الموظف");
  }
  else if(!isValidName(form_data.get("employee-name"))){
    error.push("اسم الموظف غير صالح");
  }
  else if(form_data.get("payment")===""){
    error.push("ادخل مبلغ النفقة");
  }

  if(error.length!=0){
    let error_msg=document.querySelectorAll(".error-msg")[0];
    error_msg.style.display="block"
    error_msg.innerHTML=error.pop();
  }
  else{
    clickWaitButtonV2(0);
    //sent post request
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/products");
  }
})

// validation third form
document.forms[2].addEventListener("submit",function(event){
  event.preventDefault();
  let form_data=new FormData(this);
  let error=[];
  if(form_data.get("employee-name")===""){
    error.push("ادخل اسم الموظف");
  }
  else if(!isValidName(form_data.get("employee-name"))){
    error.push("اسم الموظف غير صالح");
  }
  else if(form_data.get("payment")===""){
    error.push("ادخل المبلغ المدفوع");
  }
  if(error.length!=0){
    let error_msg=document.querySelectorAll(".error-msg")[1];
    error_msg.innerHTML=error.pop();
    error_msg.style.display="block";
  }
  else{
    clickWaitButtonV2(1);
    //sent post request
    let post_data=Object.fromEntries(form_data);
    callPostRequest(post_data,"https://fakestoreapi.com/products");
  }
})


function generateExpenseV1(expense){
  document.getElementById("cards-container").innerHTML+=`
  <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
              <!-- بداية الكارد -->
              <div class="card" >
                <i class="fa-solid fa-money-check-dollar mt-4 text-center text-dark" style="font-size: 4rem;"></i>
                <hr class="dropdown-divider mt-4">
                <div class="card-body">
                  <h5 class="card-title text-center mb-5">نفقة</h5>
                  <div class="mb-1 col">
                    <p class="card-text fs-6">نوع النفقة:<span class="fw-bold">  سحب محروقات</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> اسم الالية:<span class="">جرافة</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> اسم المحطة: <span class="">محطة قلقيلية</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text mt"> المبلغ المدفوع: <span class="text-success">2500</span></p>
                  </div>
                  <!-- first modal -->
                  <div class="row">
                    <div class="col d-flex justify-content-between">
                      <button class="btn btn-primary h-50 mt-5 p-2 d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#expense-details-${expense.id}">التفاصيل</button>
                      <button class="delete-employee btn btn-danger  h-50 mt-5 p-2 " data-bs-toggle="modal" data-bs-target="#expense-delete-${expense.id}">حذف</button>
                      <!-- تفاصيل النفقة  -->
                      <div class="modal fade" id="expense-details-${expense.id}" tabindex="-1" aria-labelledby="expense-details-${expense.id}" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center align-items-center">
                              <h5 class="modal-title text-center" id="header2"> التفاصيل</h5>
                            </div>  
                            <div class="modal-body" style="direction: rtl;">
                              <div class="mb-2">
                                <label for="formGroupExampleInput0" class="form-label">نوع النفقة:</label>
                                <input type="text" value="سحب محروقات ${expense.id}" disabled name="employee-name" class="form-control" id="formGroupExampleInput0">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput" class="form-label">اسم الالية:</label>
                                <input type="text" disabled value="جرافة" name="employee-name" class="form-control" id="formGroupExampleInput">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput3" class="form-label">المبلغ الكلي للالية :</label>
                                <input type="number" disabled value="256000" name="national-id" class="form-control" id="formGroupExampleInput3" >
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput4" class="form-label"> اسم المحطة :</label>
                                <input type="text" disabled  value="محطة قلقيلية"  name="employee-phonenumber" class="form-control" id="formGroupExampleInput4" >
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput5" class="form-label">رصيد المحطة:</label>
                                <input type="number" disabled value="2500" min="0" class="form-control" name="salary" id="formGroupExampleInput5">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput6" class="form-label">تاريخ اضافة النفقة :</label>
                                <input type="text" disabled value="1/4/2024" min="0" class="form-control" name="salary" id="formGroupExampleInput6">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput6" class="form-label"> تم الدفع من قبل:</label>
                                <input type="text" disabled value="محمد محمد" min="0" placeholder="ادخل اسم الموظف" class="form-control" name="salary" id="formGroupExampleInput6">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput7" class="form-label"> المبلغ المدفوع  :</label>
                                <input type="text" min="0" disabled value="750"  class="form-control" name="salary" id="formGroupExampleInput7">
                              </div>
                            </div> 
                            <div class="modal-footer d-flex justify-content-between">
                              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">الرجوع</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal fade" id="expense-delete-${expense.id}" tabindex="-1" aria-labelledby="expense-delete-${expense.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-body" style="direction: rtl;">
                              <p class="card-text fs-5 p-1"> ${expense.id}هل انت متاكد من حذف النفقة</p>
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
}

function generateExpenseV2(expense){
  document.getElementById("cards-container").innerHTML+=`
  <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
              <!-- بداية الكارد -->
              <div class="card" >
                <i class="fa-solid fa-money-check-dollar mt-4 text-center text-dark" style="font-size: 4rem;"></i>
                <hr class="dropdown-divider mt-4">
                <div class="card-body">
                  <h5 class="card-title text-center mb-5">نفقة</h5>
                  <div class="mb-1 col">
                    <p class="card-text fs-6">نوع النفقة:<span class="fw-bold">  تشحيم وتزييت  </span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> اسم الالية:<span class="">جرافة</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> اسم المحطة: <span class="">محطة قلقيلية</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text mt"> المبلغ المدفوع: <span class="text-success">2500</span></p>
                  </div>
                  <!-- first modal -->
                  <div class="row">
                    <div class="col d-flex justify-content-between">
                      <button class="btn btn-primary h-50 mt-5 p-2 d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#expense-details-${expense.id}">التفاصيل</button>
                      <button class="btn btn-danger h-50 mt-5 p-2 d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#expense-delete-${expense.id}">حذف</button>
                      <!-- تفاصيل النفقة  -->
                      <div class="modal fade" id="expense-details-${expense.id}" tabindex="-1" aria-labelledby="expense-details-${expense.id}" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            <div class="modal-header d-flex justify-content-center align-items-center">
                              <h5 class="modal-title text-center" id="header2"> التفاصيل</h5>
                            </div>  
                            <div class="modal-body" style="direction: rtl;">
                              <div class="mb-2">
                                <label for="formGroupExampleInput0" class="form-label">نوع النفقة:</label>
                                <input type="text" disabled value="تشحيم وتزييت ${expense.id}"  class="form-control" id="formGroupExampleInput0">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput" class="form-label">اسم الالية:</label>
                                <input type="text" disabled value="جرافة"  class="form-control" id="formGroupExampleInput">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput3" class="form-label">المبلغ الكلي للالية :</label>
                                <input type="number" disabled value="256000"  class="form-control" id="formGroupExampleInput3" >
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput6" class="form-label">تاريخ اضافة النفقة :</label>
                                <input type="text" disabled value="1/4/2024" min="0" class="form-control"  id="formGroupExampleInput6">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput6" class="form-label"> تم الدفع من قبل:</label>
                                <input type="text" disabled value="محمد محمد" min="0" placeholder="ادخل اسم الموظف" class="form-control"  id="formGroupExampleInput6">
                              </div>
                              <div class="mb-2">
                                <label for="formGroupExampleInput7" class="form-label"> المبلغ المدفوع  :</label>
                                <input type="text" min="0" disabled value="750"  class="form-control"  id="formGroupExampleInput7">
                              </div>
                            </div> 
                            <div class="modal-footer d-flex justify-content-between">
                              <button type="button" class="btn btn-danger" data-bs-dismiss="modal">الرجوع</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="modal fade" id="expense-delete-${expense.id}" tabindex="-1" aria-labelledby="expense-delete-${expense.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-body" style="direction: rtl;">
                              <p class="card-text fs-5 p-1"> ${expense.id}هل انت متاكد من حذف النفقة</p>
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
}

function generateExpenseV3(expense){
  document.getElementById("cards-container").innerHTML+=`
  <div class="col-12 col-md-6 col-lg-4 g-lg-5 g-4" >
              <!-- بداية الكارد -->
              <div class="card" >
                <i class="fa-solid fa-money-check-dollar mt-4 text-center text-dark" style="font-size: 4rem;"></i>
                <hr class="dropdown-divider mt-4">
                <div class="card-body">
                  <h5 class="card-title text-center mb-5">نفقة</h5>
                  <div class="mb-1 col">
                    <p class="card-text fs-6">نوع النفقة:<span class="fw-bold">مصاريف تشغيلية </span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> مدفوعة من قبل :<span class="">محمد محمد</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text"> التاريخ: <span class=""> 4/1/2024</span></p>
                  </div>
                  <div class="mb-1">
                    <p class="card-text mt"> المبلغ المدفوع: <span class="text-success">2500</span></p>
                  </div>
                  <div class="row">
                    <div class="col d-flex justify-content-between">
                      <button class="btn btn-danger h-50 mt-5 p-2 d-flex justify-content-center align-items-center" data-bs-toggle="modal" data-bs-target="#expense-delete-${expense.id}">حذف</button>
                      <div class="modal fade" id="expense-delete-${expense.id}" tabindex="-1" aria-labelledby="expense-delete-${expense.id}" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-body" style="direction: rtl;">
                              <p class="card-text fs-5 p-1"> ${expense.id}هل انت متاكد من حذف النفقة</p>
                            </div>
                            <div class="modal-footer d-flex justify-content-between ">
                              <form action="" class="" style="width: 100%;">
                              <div class="d-flex justify-content-between">
                                <button type="button" class="btn btn-success" data-bs-dismiss="modal">لا</button>
                                <input type="submit"  class="btn btn-danger"  data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#ed-1" value="نعم">
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
}

function displayExpenses(){
  fetch("https://fakestoreapi.com/carts")
  .then(response=>{
    if(!response.ok){ 
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(expenses_data=>{
    console.log(expenses_data);
    console.log(expenses_data[4].products[0].productId);
    if(expenses_data.length===0){
      let cards_container=document.getElementById("cards-container");
      cards_container.innerHTML=`
        <div class="col-12 fs-4 g-lg-5 g-4 mt-5 text-center">
        لا يوجد نفقات  
        </div>
        `
    }
    else{
        expenses_data.forEach(function(expense){
          if(expense.products[0].productId===1){
            generateExpenseV1(expense);
          }
          else if(expense.products[0].productId===2){
            generateExpenseV2(expense);
          }
          else{
            generateExpenseV3(expense);
          }
        })
        addDeleteEvent(expenses_data,"https://fakestoreapi.com/carts")
      }
  })
.catch(error=>{
  handleError();
  console.log(error);
  })
}

displayExpenses();
