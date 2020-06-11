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
          `<input onclick='sortCat()' name="gender" class='form-check-input' type='radio' name='exampleRadios' id='exampleRadios${category.id}' value='${category.id}'>
          <label class='form-check-label' for='exampleRadios${category.id}'>${category.title}</label>
          <br>`)
          .join("\n");
          return `${names}`;
    };
}
// Fetching Boxes
function loadBox(){
    console.log(globalVariable)
    const URL = "http://localhost:8000/api/course";
    const cou = document.getElementById("cou");
    cou.innerHTML = "<p>Loading...";
    fetch(URL)
    .then((response) => response.json())
    .then((course) => cou.innerHTML = getListOfCourses(course))
    
    const getListOfCourses = (course) => {
        const cer = course
            .map((course) => {
                if(globalVariable === 0){
            `<div class="col-md-4 col-sm-6">
            <div class="card mt-3" >
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
                       <h6 class="mb-0">Pre-registration</h6>
                       <p class="mb-0">${course.start_date} - ${course.end_date}</p>
                       <p class="reg-text"><i>${course.estimated_workload}</i></p>
                    </div>
                    <div class="col-md-1"></div>
                </div>
            </div>
          </div>
        </div>`
    }
    else{
        
    }
    }).join("\n");
        return `${cer}`;
        
    }
}

