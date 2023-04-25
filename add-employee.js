// Add Employee Popup
document.querySelector("#show-add-employee").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
});

// Remove Add Employee Popup
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});

// Remove Add Employee Popup after Pressing Add
document.querySelector("#Add").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});

// DOM Elements
const empDetailsDisplayContainer = document.getElementById('emp-details-display-container');

const errorMessage = document.createElement("p");

// Buttons
let addBtn = document.getElementById('Add');

// Form Fields
let firstName = document.getElementById('first-name');
let lastName = document.getElementById('last-name');
let email = document.getElementById('email');
let jobTitle = document.getElementById('job-title');
let office = document.getElementById('office');
let department = document.getElementById('department');
let phNumber = document.getElementById('ph-number');
let skypeId = document.getElementById('skype-id');

addBtn.addEventListener("click", addEmpToBook);

// Storage Array
function getEmpListFromLocalStorage() {

    // Returns value from localStorage using key (empData).
    let strEmpList = localStorage.getItem("empData");
    let parsedEmpList = JSON.parse(strEmpList);

    if (parsedEmpList === null) {
        return [];
    }
    else {
        return parsedEmpList;
    }
}

let addressBook = getEmpListFromLocalStorage();
let empCount = addressBook.length;

if (empCount == 0) {
    errorMessage.textContent = "Employee Details Not Found...!";
    empDetailsDisplayContainer.appendChild(errorMessage);
}

// Constructor
function jsonStructure(firstName, lastName, email, jobTitle, office, department, phNumber, skypeId) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.preferredName = firstName + ' ' + lastName;
    this.email = email;
    this.jobTitle = jobTitle;
    this.office = office;
    this.department = department;
    this.phNumber = phNumber;
    this.skypeId = skypeId;
    this.uniqueId = empCount + 1;
}

function addEmpToBook() {

    if (!validateAddEmpForm()) {

        var obj = new jsonStructure(firstName.value, lastName.value, email.value, jobTitle.value, office.value, department.value, phNumber.value, skypeId.value);

        empCount = empCount + 1;

        addressBook.push(obj);

        // Stores values in localStorage.
        localStorage.setItem("empData", JSON.stringify(addressBook));

        addEmpToCard(obj);

        clearForm();

    }
}

function clearForm() {
    var formFields = document.querySelectorAll('.formFields');
    // Will access all the text fields of the form and remove data.
    for (var i in formFields) {
        formFields[i].value = '';
    }
}

// Validations
function validateAddEmpForm() {

    if (!validateFirstName() || !validateLastName() || !validateEmail() || !validateJobTitle() || !validateOffice() || !validateDepartment() || !validatePhone() || !validateSkypeId()) {
        return false;
    }

    // return false;

}

function validateFirstName() {

    if (firstName.value.length == 0) {
        document.getElementById("error-msg-for-first-name-validation").innerHTML = "First Name is required.";
        return false;
    } else if (!firstName.value.match(/^[A-Za-z]+$/)) {
        document.getElementById("error-msg-for-first-name-validation").innerHTML = "Use characters only.";
        return false;
    } else {
        document.getElementById("error-msg-for-first-name-validation").innerHTML = "";
        return true;
    }

}

function validateLastName() {

    if (lastName.value.length == 0) {
        document.getElementById("error-msg-for-last-name-validation").innerHTML = "Last Name is required.";
        return false;
    } else if (!lastName.value.match(/^[A-Za-z]+$/)) {
        document.getElementById("error-msg-for-last-name-validation").innerHTML = "Use characters only.";
        return false;
    } else {
        document.getElementById("error-msg-for-last-name-validation").innerHTML = "";
        return true;
    }
}

function validateEmail() {

    if (email.value.length == 0) {
        document.getElementById("error-msg-for-email-validation").innerHTML = "Email is required.";
        return false;
    } else if (!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        document.getElementById("error-msg-for-email-validation").innerHTML = "Invalid Email.";
        return false;
    } else {
        document.getElementById("error-msg-for-email-validation").innerHTML = "";
        return true;
    }

}

function validateJobTitle() {

    if (jobTitle.value.length == 0) {
        document.getElementById("error-msg-for-job-title-validation").innerHTML = "Job Title is required.";
        return false;
    } else if (!jobTitle.value.match(/^[A-Za-z\s]*$/)) {
        document.getElementById("error-msg-for-job-title-validation").innerHTML = "Invalid Job Title.";
        return false;
    } else {
        document.getElementById("error-msg-for-job-title-validation").innerHTML = "";
        return true;
    }

}

function validateOffice() {

    if (office.value.length == 0) {
        document.getElementById("error-msg-for-office-validation").innerHTML = "Office location is required.";
        return false;
    } else if (!office.value.match(/^[A-Za-z\s]*$/)) {
        document.getElementById("error-msg-for-office-validation").innerHTML = "Invalid Office Location.";
        return false;
    } else {
        document.getElementById("error-msg-for-office-validation").innerHTML = "";
        return true;
    }


}

function validateDepartment() {

    if (department.value.length == 0) {
        document.getElementById("error-msg-for-department-validation").innerHTML = "Department is required.";
        return false;
    } else if (!department.value.match(/^[A-Za-z\s]*$/)) {
        document.getElementById("error-msg-for-department-validation").innerHTML = "Invalid department.";
        return false;
    } else {
        document.getElementById("error-msg-for-department-validation").innerHTML = "";
        return true;
    }

}

function validatePhone() {

    if (phNumber.value.length == 0) {
        document.getElementById("error-msg-for-ph-number-validation").innerHTML = "Phone number is required.";
        return false;
    } else if (!phNumber.value.match(/^[0-9]{10}$/)) {
        document.getElementById("error-msg-for-ph-number-validation").innerHTML = "Invalid Phone Number.";
        return false;
    } else {
        document.getElementById("error-msg-for-ph-number-validation").innerHTML = "";
        return true;
    }

}

function validateSkypeId() {

    if (skypeId.value.length == 0) {
        document.getElementById("error-msg-for-skype-id-validation").innerHTML = "Skype id is required.";
        return false;
    } else if (!skypeId.value.match(/^[A-Za-z0-9]*$/)) {
        document.getElementById("error-msg-for-skype-id-validation").innerHTML = "Invalid skype id.";
        return false;
    } else {
        document.getElementById("error-msg-for-skype-id-validation").innerHTML = "";
        return true;
    }

}

function addEmpToCard(obj) {

    // console.log(obj.empCount);

    // console.log(JSON.stringify(addressBook));

    let eachEmpId = obj.uniqueId;

    errorMessage.textContent = "";

    // user-info-card div
    const userInfoCardDiv = document.createElement("div");
    userInfoCardDiv.classList.add("user-info-card");
    userInfoCardDiv.setAttribute("id", obj.uniqueId);
    userInfoCardDiv.id = eachEmpId;

    // user-photo div
    const userPhotoDiv = document.createElement("div");
    userPhotoDiv.classList.add("user-photo");

    empImg = document.createElement("img");
    empImg.classList.add("emp-photo");
    empImg.setAttribute("src", "./pics/user-png-33842.png");
    userPhotoDiv.appendChild(empImg);
    userInfoCardDiv.appendChild(userPhotoDiv)

    // emp-details div
    const empDetailsDiv = document.createElement("div");
    empDetailsDiv.classList.add("emp-details");

    const empName = document.createElement("label");
    empName.classList.add("emp-name", "font-open-sans");
    empName.textContent = obj.preferredName;
    empName.style.fontWeight = "bold";
    empDetailsDiv.appendChild(empName);

    // emp-designation-and-dept div
    const empDesignationAndDept = document.createElement("div");
    empDesignationAndDept.classList.add("emp-designation-and-dept");

    const empDesignation = document.createElement("p");
    empDesignation.classList.add("emp-designation", "font-open-sans");
    empDesignation.textContent = obj.jobTitle;
    empDesignationAndDept.appendChild(empDesignation);

    const empDept = document.createElement("p");
    empDept.classList.add("emp-department", "font-open-sans");
    empDept.textContent = obj.department;
    empDesignationAndDept.appendChild(empDept);

    empDetailsDiv.appendChild(empDesignationAndDept);

    // emp-details-icons div
    const empDetailsIcons = document.createElement("div");
    empDetailsIcons.classList.add("emp-details-icons");

    const phoneIcon = document.createElement("i");
    phoneIcon.classList.add("fa-solid", "fa-square-phone", "fa-lg");
    phoneIcon.style.color = '#969595';
    empDetailsIcons.appendChild(phoneIcon);

    const envelopeIcon = document.createElement("i");
    envelopeIcon.classList.add("fa-solid", "fa-square-envelope", "fa-lg");
    envelopeIcon.style.color = '#969595';
    empDetailsIcons.appendChild(envelopeIcon);

    const commentIcon = document.createElement("i");
    commentIcon.classList.add("fa-solid", "fa-comment", "fa-lg");
    commentIcon.style.color = '#969595';
    empDetailsIcons.appendChild(commentIcon);

    const starIcon = document.createElement("i");
    starIcon.classList.add("fa-solid", "fa-star", "fa-lg");
    starIcon.style.color = '#969595';
    empDetailsIcons.appendChild(starIcon);

    const heartIcon = document.createElement("i");
    heartIcon.classList.add("fa-solid", "fa-heart", "fa-lg");
    heartIcon.style.color = '#969595';
    empDetailsIcons.appendChild(heartIcon);

    // Edit Icon
    const editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-pen-to-square", "fa-sm", "edit-icon");
    editIcon.setAttribute("id", "edit-emp-form-popup");
    editIcon.style.color = '#969595';
    editIcon.onclick = function () {
        // console.log(eachEmpId);
        editEmpCard(eachEmpId);
    }
    empDetailsDiv.appendChild(editIcon);

    // Delete Icon
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash-alt", "fa-sm", "delete-icon");
    deleteIcon.style.color = '#969595';
    deleteIcon.onclick = function () {
        deleteEmpCard(eachEmpId);
    }
    empDetailsDiv.appendChild(deleteIcon);

    empDetailsDiv.appendChild(empDetailsIcons);

    userInfoCardDiv.appendChild(empDetailsDiv);

    empDetailsDisplayContainer.appendChild(userInfoCardDiv);

}

// Cards don't disappear after refershing.
for (const eachEmp of addressBook) {
    addEmpToCard(eachEmp);
}

// Close the edit employee popup.
document.querySelector(".edit-emp-popup .close-btn").addEventListener("click", function () {
    document.querySelector(".edit-emp-popup").classList.remove("active");
});

function editEmpCard(eachEmpId) {

    console.log("Edit button pressed...!");

    // document.querySelector(".user-info-card").addEventListener("click", function () {
    document.querySelector(".edit-emp-popup").classList.add("active");
    // });

    // Finding emp index.
    let editEmpIndex = addressBook.findIndex(function (eachCard) {
        let employeeId = eachCard.uniqueId;
        if (employeeId === eachEmpId) {
            return true;
        } else {
            return false;
        }
    });

    employeeDetails = addressBook[editEmpIndex];
    console.log(employeeDetails);

    // Displays html on the uniqueId
    let employeeCard = document.getElementById(eachEmpId);
    console.log(employeeCard);

    let firstNameEdit = document.getElementById('first-name-edit');
    let lastNameEdit = document.getElementById('last-name-edit');
    let emailEdit = document.getElementById('email-edit');
    let jobTitleEdit = document.getElementById('job-title-edit');
    let officeEdit = document.getElementById('office-edit');
    let departmentEdit = document.getElementById('department-edit');
    let phNumberEdit = document.getElementById('ph-number-edit');
    let skypeIDEdit = document.getElementById('skype-id-edit');

    firstNameEdit.value = employeeDetails.firstName;
    lastNameEdit.value = employeeDetails.lastName;
    emailEdit.value = employeeDetails.email;
    jobTitleEdit.value = employeeDetails.jobTitle;
    officeEdit.value = employeeDetails.office;
    departmentEdit.value = employeeDetails.department;
    phNumberEdit.value = employeeDetails.phNumber;
    skypeIDEdit.value = employeeDetails.skypeId;

    let onChangeEmpBtn = document.getElementById("onChangeEmpBtn");
    onChangeEmpBtn.onclick = function () {
        const firstName = firstNameEdit.value;
        const lastName = lastNameEdit.value;
        const preferredName = firstName + " " + lastName;
        const email = emailEdit.value;
        const jobTitle = jobTitleEdit.value;
        const office = officeEdit.value;
        const department = departmentEdit.value;
        const phNumber = phNumberEdit.value;
        const skypeId = skypeIDEdit.value;

        let editedEmpDetails = {
            "firstName": firstName,
            "lastName": lastName,
            "preferredName": preferredName,
            "email": email,
            "jobTitle": jobTitle,
            "office": office,
            "department": department,
            "phNumber": phNumber,
            "skypeId": skypeId,
            "uniqueId": eachEmpId,
        }

        addressBook[editEmpIndex] = editedEmpDetails;

        empDetailsDisplayContainer.innerHTML = "";

        localStorage.setItem("empData", JSON.stringify(addressBook));

        console.log(addressBook[editEmpIndex]);

        for (const eachEmp of addressBook) {
            addEmpToCard(eachEmp);
        }

        closeEditForm();
        location.reload();

    };
}

function deleteEmpCard(eachEmpId) {
    let employeeCard = document.getElementById(eachEmpId)
    empDetailsDisplayContainer.removeChild(employeeCard)

    let deleteEmpIndex = addressBook.findIndex(function (eachCard) {
        let employeeId = eachCard.uniqueId
        if (employeeId === eachEmpId) {
            return true
        } else {
            return false
        }
    })
    addressBook.splice(deleteEmpIndex, 1)
    localStorage.setItem("empData", JSON.stringify(addressBook))
}

function closeEditForm() {
    document.getElementById("edit-emp-popup").style.display = "none";
}

// Alphabet Search Filter.
const searchFilterButtons = document.querySelectorAll("#search-buttons button");
searchFilterButtons.forEach(function (alphabet) {
    alphabet.addEventListener('click', function () {
        let searchedValue = alphabet.textContent;
        // console.log(searchedValue);
        let existingEmp = addressBook.filter(function (emp) {
            return (
                emp.firstName.toLowerCase().startsWith(searchedValue.toLowerCase())
            )
        });

        empDetailsDisplayContainer.innerHTML = "";
        existingEmp.forEach(function (eachEmp) {
            addEmpToCard(eachEmp);
        })

    });
});

// Text Search Filter.
const inputTextFilter = document.getElementById("search-input-text");
inputTextFilter.addEventListener('change', function (event) {
    let searchedValue = event.target.value;
    console.log(searchedValue);
    let selectedFilterBy = getFilterBy();
    console.log(selectedFilterBy);

    let inputTextFilteredEmps = addressBook.filter(function (emp) {
        return (
            emp[selectedFilterBy].toLowerCase().includes(searchedValue.toLowerCase())
        )
    })

    empDetailsDisplayContainer.innerHTML = '';
    inputTextFilteredEmps.forEach(function (eachEmp) {
        addEmpToCard(eachEmp);
    })
})

function getFilterBy() {
    const filterBy = document.getElementById("filter-by");
    return filterBy.value;
}

// Clear Button.
const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', function () {
    inputTextFilter.innerText = '';
    empDetailsDisplayContainer.innerHTML = '';
    addressBook.forEach(function (eachEmp) {
        addEmpToCard(eachEmp);
    })
})

// Left Side Filters
// Left Department Filters.
const leftDeptFilters = document.querySelectorAll('#departments-filters li');
leftDeptFilters.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        event.preventDefault()
        empDetailsDisplayContainer.innerHTML = '';
        addressBook.forEach(function (emp) {
            if ((filter.textContent).toLowerCase() == (emp.department).toLowerCase()) {
                addEmpToCard(emp);
            }
        })
    })
})

// Left Office Filters.
const leftOfficesFilters = document.querySelectorAll('#offices-filters li');
leftOfficesFilters.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        event.preventDefault()
        empDetailsDisplayContainer.innerHTML = '';
        addressBook.forEach(function (emp) {
            if ((filter.textContent).toLowerCase() == (emp.office).toLowerCase()) {
                addEmpToCard(emp);
            }
        })
    })
})

// Left JobTitle Filters.
const leftJobTitlesFilters = document.querySelectorAll('#job-titles-filters li');
leftJobTitlesFilters.forEach(function (filter) {
    filter.addEventListener('click', function (event) {
        event.preventDefault()
        empDetailsDisplayContainer.innerHTML = '';
        addressBook.forEach(function (emp) {
            if ((filter.textContent).toLowerCase() == (emp.jobTitle).toLowerCase()) {
                addEmpToCard(emp);
            }
        })
    })
})
