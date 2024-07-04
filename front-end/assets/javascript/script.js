 function clearForm(){
  document.querySelectorAll(".form-body input").forEach(function(input){
    input.value="";
  })
  let error_msg=document.getElementById("error-msg");
  error_msg.style.display="none";
  error_msg.innerHTML="";
}

const isValidName = (name) => {
    const arabicNamePattern = /^[\u0600-\u06FF\s]+$/;
    const nameRegex = /^[A-Za-z\s'-]+$/;
    return arabicNamePattern.test(name)||nameRegex.test(name);
};

function clickWaitButton(){
  document.getElementById("submit-btn").setAttribute("data-bs-target","#wait-add-msg");
  document.getElementById("submit-btn").setAttribute("data-bs-dismiss","modal");
  document.getElementById("submit-btn").setAttribute("data-bs-toggle","modal");
  document.getElementById("submit-btn").click();
}

function addRefreshEvent(){
  document.querySelectorAll(".refresh-btn").forEach(function(btn){
    btn.onclick=function(){
      location.reload();
    }
  })
}

function callDeleteRequest(url){
    fetch(url,{
      method: "DELETE"
    })
    .then(response=>{
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      else{
        return response.json();
      }
    })
    .then(data=>{
      console.log(data);
      // display success delete alert
      setTimeout(() => {
        document.getElementById("alert-delete-btn").click();
      }, "500");
    
    })
    .catch(error=>{
      document.getElementById("error-box").innerHTML="يوجد خطأ حاول مرة اخرى."
      //display error alert
      setTimeout(() => {
        document.getElementById("alert-error-btn").click();
      }, "500");
      console.log(error);
    });
  
}

function callPostRequest(data,url){
  fetch(url,{
    method: "POST",
    headers:{
      'Content-type': 'appliction/json'
    },
    body: JSON.stringify(data)
  })
  .then(response=>{
    if(!response.ok){
      throw new Error('Network response was not ok');
    }
    else{
      return response.json();
    }
  })
  .then(response_data=>{
    console.log(response_data);
    //display success add alert
    setTimeout(() => {
      document.getElementById("alert-add-btn").click();
    }, "500");

  })
  .catch(error=>{
    document.getElementById("error-box").innerHTML=`يوجد خطأ حاول مرة اخرى`;
    // display error alert
    setTimeout(() => {
      document.getElementById("alert-error-btn").click();
    }, "500");
    console.log(error);
  })
}

function handleError(){
  document.getElementById("error-box").innerHTML=`حدث خطأ حاول مرة اخرى`;
  setTimeout(() =>{
    document.getElementById("alert-error-btn").click();
  },"500")
}

function addDeleteEvent(data,url){
  document.querySelectorAll(".delete-form").forEach(function(form,index){
    form.addEventListener("submit",function(event){
      event.preventDefault();
      callDeleteRequest(`${url}/${data[index].id}`);
    })
  })
}

export{clearForm,isValidName,callDeleteRequest,callPostRequest,addDeleteEvent,clickWaitButton,addRefreshEvent,handleError};
