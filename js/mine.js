//global variable
var nameInput = document.getElementById('ProductName');

var categoryInput = document.getElementById('ProductCategory');

var priceInput = document.getElementById('ProductPrice');

var descripInput = document.getElementById('ProductDescription');

var tbody = document.getElementById('tbody');

var updateBtn = document.getElementById('updatebtn');
var addBtn = document.getElementById('addbtn');

//global variable  بتعمل list للداتا اللي بدخلها في array
var productContainer = [] ;  //empty array >> دا كدا هيبقي الداتابيز بتاعتنا

if(localStorage.getItem('myProduct') != null){
    productContainer = JSON.parse( localStorage.getItem('myProduct') );
    displayProduct(productContainer);
}
else{
    productContainer = [];
}

function creatProduct() {
    if( validatProduct() == true) {
            //local variable
    var oneProduct = {  // كل كليك بيعمل override
        pname: nameInput.value,
        category: categoryInput.value,
        price: priceInput.value,
        descrip: descripInput.value,
    };

    productContainer.push(oneProduct);  // بيزود علي الداتا القديمة
    localStorage.setItem('myProduct' , JSON.stringify(productContainer) ) //عشان أحفظ في ال Localstorge
    clearForm();
    displayProduct(productContainer); // بعد ما ملليت ال array بيضيف بعدد ال objectat بتاعتي

    }
    else
    {
        alert('try again')
    }
    

}


function clearForm() {  //بتعمل reusing للكود
    nameInput.value = "";
    categoryInput.value = "";
    priceInput.value = "";
    descripInput.value = "";
}

function displayProduct() {
    var trs = "";

    // var lastIndexInArray = productContainer.length -1; //بتساعدني ان انا معملش لوب من اول  وجديد علي اللوب كلها 
    // // انا لما هستخدم اللوب هبقي بقوله عيد ف ال object القديم كل مرة يتضاف فيها منتج جديد مع كل دوسه هيتعملي Tr واحدة بس مش هيكرر القديم

    // trs += `   
    //     <tr>
    //     <td>${lastIndexInArray}</td>
    //     <td>${productContainer[lastIndexInArray].pname}</td>
    //     <td>${productContainer[lastIndexInArray].category}</td>
    //     <td>${productContainer[lastIndexInArray].price}</td>
    //     <td>${productContainer[lastIndexInArray].descrip}</td>
    //     <td>

    //       <button class="btn bg-danger text-white"><i class="fa fa-solid fa-trash-can pe-1"></i> delete</button>
    //     </td>
    //     <td>


    //       <button class="btn border-dark"><i class="fa fa-solid fa-edit pe-1"></i> update</button>

          
    //     </td>
    //   </tr>`; // الحل دا أفض لل performance بس محتاج لحاجات تانية تضاف ليه وهي advanced شوية بس لسه هتيجي مع الوقت

    for (var i = 0; i < productContainer.length; i++) {
        trs += `   
        <tr>
        <td>${i}</td>
        <td>${productContainer[i].pname}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].descrip}</td>
        <td>

          <button onclick="deleteProduct(${i});" class="btn bg-danger text-white"><i class="fa fa-solid fa-trash-can pe-1"></i> delete</button>
        </td>
        <td>


          <button onclick="updatProduct(${i}); deleteProduct(${i});" class="btn border-dark"><i class="fa fa-solid fa-edit pe-1"></i> update</button>

          
        </td>
      </tr>`;
    }

    tbody.innerHTML = trs;
}

function searchProduct() {

    var searchInput = document.getElementById('searchinput');

    var trs = '';

    
    for (var i = 0; i < productContainer.length; i++) {
        // if (searchInput == productContainer[i].pname) ) الشرط صعب ف السيرش ومش بيساعد اليوزر لو مش متذكر كل حروف الكلمة

        if (productContainer[i].pname.toLowerCase().includes(searchInput.value.toLowerCase()) ){

            trs += `   
        <tr>
        <td>${i}</td>
        <td>${productContainer[i].pname}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].descrip}</td>
        <td>

          <button class="btn bg-danger text-white"><i class="fa fa-solid fa-trash-can pe-1"></i> delete</button>
        </td>
        <td>


          <button class="btn border-dark"><i class="fa fa-solid fa-edit pe-1"></i> update</button>

          
        </td>
      </tr>`;

        }

    }

    tbody.innerHTML = trs;
    
}

function deleteProduct(index) {

    //productContainer.pop(); // اخر واحد بس delete

    //productContainer.shift(); // أول واحد بس delete

    productContainer.splice( index , 1 );

    displayProduct(); // بشوف ال table بعد ال delete

}

function updatProduct(index) {

    nameInput.value = productContainer[index].pname;
    categoryInput.value = productContainer[index].category;
    priceInput.value = productContainer[index].price;
    descripInput.value = productContainer[index].descrip;

    updateBtn.classList.replace('d-none' , 'd-inline-block');
    addBtn.classList.add('d-none');

    displayProduct();

    
}

function addBtnBack() {

    updateBtn.classList.replace('d-inline-block' , 'd-none');
    addBtn.classList.remove('d-none');

}

function validatProduct() {
    var nameRegex = /^[A-Z][a-z]{3,8}$/;


    if( nameRegex.test(nameInput.value) == true ) {
        nameInput.classList.replace('is-invalid' , 'is-valid');
        return true;
    }
    else
    {
        nameInput.classList.add('is-invalid');
        return false;
    }
}