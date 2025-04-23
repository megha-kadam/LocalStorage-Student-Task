const cl = console.log;

const stdForm = document.getElementById('stdForm');
const stdList = document.getElementById('stdList');
const fNameControl = document.getElementById('fName');
const lNameControl = document.getElementById('lName');
const contactControl = document.getElementById('contact');
const emailControl = document.getElementById('email');
const addStdBtn = document.getElementById('addStdBtn');
const updateStsBtn = document.getElementById('updateStsBtn');

let stdArr = [];

if(localStorage.getItem('stdArr')){
    stdArr = JSON.parse(localStorage.getItem('stdArr'))
}

const generateUuid = () => {
    return (
      String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
      const random = (Math.random() * 16) | 0;
      const value = character === "x" ? random : (random & 0x3) | 0x8;
      return value.toString(16);
});
};

const onEditStd = (ele) => {
    let editId = ele.closest('tr').id;
    cl(editId);
    localStorage.setItem('editId', editId);

    let editObj = stdArr.find(std => std.stdId === editId);
    cl(editObj);
    localStorage.setItem('stdArr', JSON.stringify(stdArr));

    fNameControl.value = editObj.fName;
    lNameControl.value = editObj.lName;
    contactControl.value = editObj.contact;
    emailControl.value = editObj.email;

    addStdBtn.classList.add('d-none');
    updateStsBtn.classList.remove('d-none')
}

const onRemoveSts = (ele) => {
    let getConfirm = confirm(`Are you sure for delete this student`);
    cl(getConfirm);

    if(getConfirm){
        let removeId = ele.closest('tr').id;

        let getIndex = stdArr.findIndex(std => std.stdId === removeId);
        stdArr.splice(getIndex, 1);

        localStorage.setItem('stdArr', JSON.stringify(stdArr));

        ele.closest('tr').remove();

        let getAllTr = document.querySelectorAll('#stdList tr');
        getAllTr.forEach((ele , i) => ele.firstElementChild === i + 1)
    }
}

const createTr = (arr) => {
    let result = '';
    arr.forEach((std, i) => {
        result += `
                    <tr id='${std.stdId}'>
                        <td>${i + 1}</td>
                        <td>${std.fName}</td>
                        <td>${std.lName}</td>
                        <td>${std.contact}</td>
                        <td>${std.email}</td>
                        <td class= 'text-center'>
                            <i class="fa-solid fa-pen-to-square fa-2x text-success" onclick='onEditStd(this)'></i>
                        </td>
                        <td class= 'text-center'>
                            <i class="fa-solid fa-trash fa-2x text-danger" onclick='onRemoveSts(this)'></i>
                        </td>
                    </tr>
                    `
                stdList.innerHTML = result;
    })
};
createTr(stdArr);

const onaddStd = (eve) => {
    eve.preventDefault();
    let stdObj = {
        fName : fNameControl.value,
        lName :lNameControl.value,
        contact : contactControl.value,
        email : emailControl.value,
        stdId : generateUuid(),
    }
    stdForm.reset();
    stdArr.push(stdObj);

    localStorage.setItem('stdArr', JSON.stringify(stdArr));

    let tr = document.createElement('tr');
    tr.id = stdObj.stdId;
    tr.innerHTML = `<td>${stdArr.length}</td>
                        <td>${stdObj.fName}</td>
                        <td>${stdObj.lName}</td>
                        <td>${stdObj.contact}</td>
                        <td>${stdObj.email}</td>
                        <td class= 'text-center'>
                            <i class="fa-solid fa-pen-to-square fa-2x text-success" onclick='onEditStd(this)'></i>
                        </td>
                        <td class= 'text-center'>
                            <i class="fa-solid fa-trash fa-2x text-danger" onclick='onRemoveSts(this)'></i>
                        </td>`
        stdList.append(tr);
}

 const onUpdateStd = () => {
    let updateId = localStorage.getItem('editId');
    let updateObj = {
        fName : fNameControl.value,
        lName: lNameControl.value,
        contact: contactControl.value,
        email : emailControl.value,
        stdId : updateId,
    }
    cl(updateObj);

    let getIndex = stdArr.findIndex(std => std.stdId === updateId);
    stdArr[getIndex] = updateObj;

    localStorage.setItem('stdArr', JSON.stringify(stdArr));
    stdForm.reset();

    addStdBtn.classList.remove('d-none');
    updateStsBtn.classList.add('d-none');

    let tr = [...document.getElementById(updateId).children];
    cl(tr);
    tr[1].innerHTML = updateObj.fName;
    tr[2].innerHTML = updateObj.lName;
    tr[3].innerHTML = updateObj.contact;
    tr[4].innerHTML = updateObj.email;

 }


stdForm.addEventListener('submit', onaddStd);
updateStsBtn.addEventListener('click', onUpdateStd);