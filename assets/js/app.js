// Page load event

document.addEventListener("DOMContentLoaded", function() {
    loadCat();
    loadBox();
});
// Fetching Categories
function loadCat(){
    const URL = "http://localhost:8000/api/category";
    const cat = document.getElementById("cat");
    cat.innerHTML = "<p>Loading...";
    fetch(URL)
    .then((response) => response.json())
    .then((category) => cat.innerHTML = getListOfNames(category));

    const getListOfNames = (category) => {
        const names = category
          .map((category) => 
          `<input onclick="filterSelection('opt${category.id}')" class='form-check-input cl' type='radio' name='exampleRadios' id='exampleRadios${category.id}' value='${category.id}'>
          <label class='form-check-label' for='exampleRadios${category.id}'>${category.title}</label>
          <br>`)
          .join("\n");
          return `${names}`;
    };
}
// Fetching Boxes
function loadBox(){
    const URL = "http://localhost:8000/api/course";
    const cou = document.getElementById("cou");
    cou.innerHTML = "<p>Loading...";
    fetch(URL)
    .then((response) => response.json())
    .then((course) => cou.innerHTML = getListOfCourses(course))
    const getListOfCourses = (course) => {
        const cer = course
            .map((course) => 
            `<div class="col-md-4 col-sm-6 filter opt${course.category_id} show" >
            <div class="card mt-3 inner" >
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">
                        <img src="./assets/images/avatar.png" style="border-radius: 50%;width: 40px;"></div>
                    <div class="col-md-10">
                        <h5 class="card-title mb-0">${course.title}</h5>
                        <h6 class="card-title">${course.instructor_name}</h6>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-1">
                        <i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <div class="col-md-10">
                        <p class="card-text">
                        ${course.description}
                        </p>
                    </div>
                    <div class="col-md-1"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-1">
                        <i class="fa fa-calendar" aria-hidden="true"></i></div>
                    <div class="col-md-10">
                       <h6 class="mb-0">Pre-Registration</h6>
                       <p class="mb-0">${course.start_date} - ${course.end_date}</p>
                       <p class="reg-text"><i>${course.estimated_workload}</i></p>
                    </div>
                    <div class="col-md-1"></div>
                </div>
            </div>
          </div>
        </div>`
            )
        .join("\n");
        return `${cer}`;
        
    }
}
// Filter Function
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("filter");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
  }
}
function AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}
function RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}
// Search filter
function search() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("cat");
    li = document.getElementsByClassName("filter");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByClassName("inner")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}