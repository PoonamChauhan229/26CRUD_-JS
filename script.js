var idstore = 0;
let url = "https://647588cde607ba4797dbfe60.mockapi.io/user";

var itemList = document.getElementById("itemList");
function createTableRow(value1, value2, id) {
  var tr = document.createElement("tr");
  var td1 = document.createElement("td");
  td1.setAttribute('id',`name${id}`)

  var td2 = document.createElement("td");
  td2.setAttribute('id',`email${id}`)
  var td3 = document.createElement("td");

  td1.innerHTML = value1;
  td2.innerHTML = value2;
  
  td3.innerHTML = `
                    
                    <button class="btn btn-primary" data-toggle="modal" data-target=#exampleModal${id} id='edit${id}' onclick="getIEditId('${id}','${value1}','${value2}')"><i class="bi bi-pencil-square"></i></button>
                    <button class="btn btn-danger" id='delete${id}' onclick='deleteUsersData(${id})'><i class="bi bi-trash-fill"></i></button>
                    `;

 
  tr.append(td1, td2, td3);
  itemList.append(tr);
}
var modalName,modalEmail;

const getIEditId = (id,value1,value2) => {
    const modal = document.createElement("span");
    modal.innerHTML=" "
    
    console.log(id,value1,value2);

  

    modal.innerHTML = `<div class="modal fade" id=exampleModal${id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Update User</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="form-group row">
                        <label for="name" class="col-sm-1 col-form-label">Name</label>
                        <div class="col-sm-12">
                        <input type="text" class="form-control" id=alertName${id} placeholder="Name" value=${value1}>
                        </div>
                    </div>

                    <div class="form-group row">
                        <label for="email" class="col-sm-1 col-form-label">Email</label>
                        <div class="col-sm-12">
                        <input type="text" class="form-control" id=alertEmail${id} value=${value2}>
                        </div>
                    </div> 
                    
                </div>  
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onclick='updateUsersData(${id})'>Save changes</button>
                </div>
            </div>
            </div>
        </div>`;
    document.body.append(modal); 
};

// rEAD
async function getUsersData() {
  let data = await fetch(url);
  let res = await data.json();
  // console.log(res)
  res.map((element) => {
    //    console.log(element)
    createTableRow(element.name, element.email, element.id);
  });
}
getUsersData();

// Read with specific Id
async function getUsersSpecificData(id) {
  let data = await fetch(url + "/" + id);
  let res = await data.json();
  console.log(res);
  createTableRow(res.name, res.email, res.id);
}

// create

async function createUsersData() {
  let nameInput = document.getElementById("nameInput")
  let nameValue=nameInput.value

  let emailInput = document.getElementById("emailInput")
  let emailValue=emailInput.value
  if(nameValue!="" && emailValue!=""){
//   console.log(nameInput, emailInput);
  let newUser = {
    name: nameValue,
    email: emailValue,
  };
  let data = await fetch(url, {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(newUser),
  });
  let res = await data.json();
  console.log(res);
  getUsersSpecificData(res.id);
  nameInput.value="";
  emailInput.value="";
  

}else{
    alert("Enter the Name and Email Address")
}
}

// Update

async function updateUsersData(id) {

    console.log(id);
    modalName=document.getElementById('alertName'+id).value
    modalEmail=document.getElementById('alertEmail'+id).value

    console.log(modalEmail,modalName)
    console.log(id);

    let newUser = {name:modalName,email:modalEmail};

    let data = await fetch(url + "/"+id, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newUser),
    });
    let res = await data.json();
    console.log(res);
    document.getElementById('name'+id).innerText=res.name
    document.getElementById('email'+id).innerText=res.email 
   
}

// Delete
async function deleteUsersData(id) {
    alert("Do You want Delete the User")
  console.log(id);

  let data = await fetch(url + "/" + id, {
    method: "DELETE",
  });
  let res = await data.json();
  console.log(res);
  itemList.innerHTML = "";
  getUsersData();
}
