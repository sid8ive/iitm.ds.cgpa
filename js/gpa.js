document.addEventListener("DOMContentLoaded", () => {
  const coursesContainer = document.getElementById("courses-container");
  const calculateBtn = document.getElementById("calculate-btn");
  const gpaDisplay = document.getElementById("gpa-display");

  // Populate the dropdown with courses from all categories
  const addCourseRow = () => {
    const row = document.createElement("div");
    row.className = "course-row";

    // Dropdown for course selection
    const courseSelect = document.createElement("select");
    courseSelect.className = "course-select";
    courseSelect.innerHTML = `
      <option value="" disabled selected>Select a course</option>
      ${Object.keys(credits).map(category => `
        <optgroup label="${category}">
          ${credits[category].map(course => `
            <option value="${course.Credits}">${course.Course}</option>
          `).join("")}
        </optgroup>
      `).join("")}
    `;
    row.appendChild(courseSelect);

    // Grade input
    const gradeInput = document.createElement("input");
    gradeInput.type = "text";
    gradeInput.className = "grade-input";
    gradeInput.placeholder = "Enter Grade (e.g., A, B+)";
    row.appendChild(gradeInput);

    coursesContainer.appendChild(row);
  };

  // Add initial row
  addCourseRow();

  // Calculate GPA
  calculateBtn.addEventListener("click", () => {
    const rows = document.querySelectorAll(".course-row");
    let totalCredits = 0;
    let totalWeightedPoints = 0;

    rows.forEach(row => {
      const courseSelect = row.querySelector(".course-select");
      const gradeInput = row.querySelector(".grade-input");
      const gradeValue = gradeInput.value.toUpperCase();
      const credits = parseFloat(courseSelect.value);
      const gradePoints = getGradePoints(gradeValue);

      if (!credits || !gradePoints) {
        alert("Please ensure all fields are filled correctly.");
        return;
      }

      totalCredits += credits;
      totalWeightedPoints += credits * gradePoints;
    });

    const gpa = (totalWeightedPoints / totalCredits).toFixed(2);
    gpaDisplay.textContent = `Your GPA is: ${gpa}`;
  });

  // Map grade to grade points
  const getGradePoints = (grade) => {
    const gradeMapping = {
      S: 10,
      A: 9,
      B: 8,
      C: 7,
      D: 6,
      E: 5,
      F: 0,
    };
    return gradeMapping[grade] || null;
  };

  // Add more course rows dynamically
  document.getElementById("add-course-btn").addEventListener("click", addCourseRow);
});




















</*
document.getElementById("submitButton").addEventListener("click", function() {
    document.getElementById("output").innerHTML && (document.getElementById("output").innerHTML = "");
    let e = document.getElementById("dynamicForm");
    for (; e.firstChild;) e.removeChild(e.firstChild);
    validateInput()
});
var noOfCourses = document.getElementById("inputCoursesNumber").value;

function validateInput() {
    var e = document.getElementById("inputCoursesNumber").value;
    return isNaN(e) ? (document.getElementById("inputCoursesNumber").value = null, toastr.options = {
        closeButton: !1,
        debug: !1,
        newestOnTop: !0,
        progressBar: !0,
        positionClass: "toast-top-right",
        preventDuplicates: !1,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "4000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }, toastr.error("Don't you know how to type a number properly ?", "WTF")) : 8 < e ? (document.getElementById("inputCoursesNumber").value = null, toastr.options = {
        closeButton: !0,
        debug: !1,
        newestOnTop: !0,
        progressBar: !1,
        positionClass: "toast-top-right",
        preventDuplicates: !1,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }, toastr.error("Are you studying in IITM ? HowTF you can do  " + e + " courses in one semester ?", "LOL")) : 0 == e || "" == e ? (document.getElementById("inputCoursesNumber").value = null, toastr.options = {
        closeButton: !0,
        debug: !1,
        newestOnTop: !0,
        progressBar: !1,
        positionClass: "toast-top-right",
        preventDuplicates: !1,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }, toastr.error("Focus ", "Hey Insti Gawd")) : e < 0 ? (document.getElementById("inputCoursesNumber").value = null, toastr.options = {
        closeButton: !0,
        debug: !1,
        newestOnTop: !0,
        progressBar: !1,
        positionClass: "toast-top-right",
        preventDuplicates: !1,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }, toastr.error("HowTF , number of courses can be negative ?", "Genius")) : void generateInputs(e)
}

function generateInputs(e) {
    var r = document.getElementById("dynamicForm");
    let t = document.createElement("button"),
        o = document.createElement("div");
    o.className = "findGrade", t.innerHTML = "Find Grade", t.setAttribute("type", "submit"), t.className = "btn btn-lg btn-outline-primary align-items-center", t.id = "submit-button", o.appendChild(t);
    for (let s = 1; s <= e; s++) {
        let e = document.createElement("div"),
            t = document.createElement("div");
        var i = document.createElement("select");
        i.name = "course" + s + "gpa", i.className = "grade-gpa", i.id = "course" + s;
        let o = document.createElement("option");
        o.innerHTML = "Choose Grade", i.appendChild(o), grades.forEach(e => {
            let t = document.createElement("option");
            t.value = e.value, t.innerHTML = e.grade, i.appendChild(t)
        }), t.appendChild(i);
        let n = document.createElement("input");
        n.className = "form-control form-data", n.type = "number", n.name = "Course " + s, n.placeholder = "Course " + s + " Credits", e.className = "col-sm-3 my-1 dynamicallyGeneratedDivs", t.className = "col-auto my-1 dselect", e.appendChild(n), r.appendChild(e), r.appendChild(t)
    }
    r.appendChild(o)
}

function validateFormData() {
    var t = document.getElementsByClassName("form-data"),
        o = [],
        n = 0,
        s = t.length;
    for (let e = 0; e < s; e++) {
        if (!t[e].value) return toastr.options = {
            closeButton: !0,
            debug: !1,
            newestOnTop: !0,
            progressBar: !1,
            positionClass: "toast-top-right",
            preventDuplicates: !1,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "4000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }, toastr.error("you have not entered credits for some course(s)", "Invalid Credits");
        if (isNaN(t[e].value)) return toastr.options = {
            closeButton: !0,
            debug: !1,
            newestOnTop: !0,
            progressBar: !1,
            positionClass: "toast-top-right",
            preventDuplicates: !1,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }, toastr.error("course credit should be a positive number", "Namaskar");
        if (t[e] <= 0) return toastr.options = {
            closeButton: !0,
            debug: !1,
            newestOnTop: !0,
            progressBar: !1,
            positionClass: "toast-top-right",
            preventDuplicates: !1,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "5000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }, toastr.error("course credit should not be a negative or zero", "Die");
        o.push(t[e].value)
    }
    for (let e = 0; e < o.length; e++) n += parseInt(o[e]);
    if (66 < n) return toastr.options = {
        closeButton: !0,
        debug: !1,
        newestOnTop: !0,
        progressBar: !1,
        positionClass: "toast-top-right",
        preventDuplicates: !1,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: "5000",
        extendedTimeOut: "1000",
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "fadeIn",
        hideMethod: "fadeOut"
    }, toastr.error("bruh , Credit limit for one semester is 66", "IITM's senate hurts");
    getGpa(o, s, n)
}

function getGpa(t, o, e) {
    var n = [];
    for (let e = 1; e <= o; e++) {
        var s = "course" + e,
            s = document.getElementById(s).value;
        n.push(s), variable = ""
    }
    var r = 0;
    for (let e = 0; e < n.length; e++)
        if (isNaN(parseInt(n[e]))) return toastr.options = {
            closeButton: !0,
            debug: !1,
            newestOnTop: !0,
            progressBar: !1,
            positionClass: "toast-top-right",
            preventDuplicates: !1,
            showDuration: "300",
            hideDuration: "1000",
            timeOut: "4000",
            extendedTimeOut: "1000",
            showEasing: "swing",
            hideEasing: "linear",
            showMethod: "fadeIn",
            hideMethod: "fadeOut"
        }, toastr.error("You have not chosen grade for some course(s)", "IITian Lol");
    for (let e = 0; e < t.length; e++) r += t[e] * parseInt(n[e]);
    e = roundToTwo(r / e);
    document.getElementById("output").style.color = 9 <= e ? "green" : 8 <= e && e < 9 ? "#7952B3" : 7.5 <= e && e < 8 ? "orange" : 7 <= e && e < 7.5 ? "#52006A" : "red", document.getElementById("output").innerHTML = "Your GPA : " + e
}

function roundToTwo(e) {
    return +(Math.round(e + "e+2") + "e-2")
}
*/
