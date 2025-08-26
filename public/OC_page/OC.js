
const crud = document.getElementsByClassName('crud')[0]


function renderComponentManagement(){
    crud.innerHTML = `
      <div class="container">

      <form id="componentForm" class="input" enctype="multipart/form-data">

        <input type="text" id="title" placeholder="title">
        <input type="number" type="number" id="price" placeholder="price">
        <input type="number" id="count" placeholder="count">
        <input type="text" id="componentLocation" placeholder="Location">
        <input type="text" id="category" placeholder="category">
        <input type="file" id="image" accept="image/*">
        <button type="submit" id="submit">Create</button>

      </form>
      <div class="output">
        <div class="search-box">
          <input onkeyup="searchdata(this.value)" type="text" id="search" placeholder="search">
          <div class="btn-search">
            <button onclick="searchq(this.id)" id="search-title">Search By Title</button>
            <button onclick="searchq(this.id)" id="search-cat">Search By Category</button>

          </div>
          <div id="delALL"></div>
        </div>


        <table>
          <thead>
            <tr>
              <th>id</th>
              <th>title</th>
              <th>price</th>
              <th>category</th>
              <th>update</th>
              <th>delete</th>

            </tr>
          </thead>
          <tbody id="body">

          </tbody>
        </table>



      </div>
    `
    let title = document.getElementById('title');
    let price = document.getElementById('price');
    let count = document.getElementById('count');
    let category = document.getElementById('category');
    let componentLocation = document.getElementById('componentLocation');
    let imageInput = document.getElementById('image');
    let submit = document.getElementById('submit');
    let mood = 'create';
    let it;
    let searchmood = 'title';
    let prodata = [];
    // if (localStorage.product != null) {
    //   prodata = JSON.parse(localStorage.product);
    // }
    // else {
    //   prodata = [];
    // }                      //  this code replaced with get the data from DB 
    const getComponents = async () => {
      const res = await fetch("https://assiut-robotics-server.vercel.app/components/getComponents")
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        prodata = await response.data;
        read();
      }
      else {
        const response = await res.json();
        console.log(response.message);
      }
    }
    getComponents();
    
    const updateComponent = async (formData) => {
      try {
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
    
        const dataObject = {};
        for (let [key, value] of formData.entries()) {
          dataObject[key] = value;
        }

        const res = await fetch("https://assiut-robotics-server.vercel.app/components/update", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${localStorage.getItem('token')}`
    
          },
          body: JSON.stringify({
            id: dataObject.id,
            newpro: {
              title: dataObject.title,
              price: dataObject.price,
              category: dataObject.category
    
            }
          })
        });
        if (res.ok) {
          const response = await res.json();
          console.log(response.message);
    
          getComponents();
          read();
        } else {
          const response = await res.json();
          console.log(response.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    let form = document.getElementById('componentForm');
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (title.value != '' && price.value > 0 && count.value <= 100 && category.value != '') {
        if (mood == 'create') {
          console.log('create');
          
          let countValue = Number(count.value) || 1;
          for (let i = 0; i < countValue; i++) {
            let formData = new FormData();
            formData.append('title', title.value);
            formData.append('price', price.value);
            formData.append('count', '1');
            formData.append('location', componentLocation.value);
            formData.append('category', category.value);
            if (imageInput.files.length > 0) {
              formData.append('image', imageInput.files[0]);
            }
            pushToDB(formData);
          }
        } else {
    
          let id = prodata[it]._id;
          let formData = new FormData();
          formData.append('id', id);
          formData.append('title', title.value);
          formData.append('price', price.value);
          // formData.append('location', componentLocation.value);
          formData.append('category', category.value);
    
          // if (imageInput.files.length > 0) {
          //   formData.append('image', imageInput.files[0]);
          // }
    
          updateComponent(formData);
          mood = 'create';
          submit.innerHTML = 'Create';
          count.style.display = 'block';
        }
        clear();
      }
    
      read();
    });
    
    
    read();
    function clear() {
      title.value = '';
      price.value = '';
      count.value = '';
      category.value = '';
      componentLocation.value = '';
      imageInput.value = '';
    }
    function read() {
      let table = "";
      for (let i = 0; i < prodata.length; i++) {
        table += `
        <tr>
                <td>${i + 1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].category}</td>
                <td><button  onclick="update(${i}) " id='update'>Update</button></td>
                <td><button  onclick="del(${i})" id='delete'>Delete</button></td>
    
            </tr>
        `;
      }
      let body = document.getElementById('body');
      body.innerHTML = table;
      let deALL = document.getElementById('delALL');
      if (prodata.length > 0) {
        deALL.innerHTML = `
          <button  onclick="delAll()" id="deleteAll">Delete All ( ${prodata.length} )</button>
          `
      }
      else {
        deALL.innerHTML = '';
      }
    }
    
    
    
    const deleteOne = async (id) => {
      data = {
        id
      }
      const res = await fetch("https://assiut-robotics-server.vercel.app/components/deleteOne", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    
      })
      if (res.ok) {
        const response = await res.json();
        console.log(await response);
        // prodata=await response.data;
        getComponents();
        read();
      }
      else {
        const response = await res.json();
        console.log(await response.message);
      }
    }
    
    
    function del(item) {
      deleteOne(prodata[item]._id)
      prodata.splice(item, 1);
      localStorage.product = JSON.stringify(prodata);
      read();
    }
    function delAll() {
      // localStorage.clear();
      // prodata.splice(0);
      deleteAll();
      getComponents();
      read();
    }
    
    function update(item) {
      title.value = prodata[item].title;
      price.value = prodata[item].price;
      count.style.display = 'none';
      category.value = prodata[item].category;
      componentLocation.value = prodata[item].location;
      mood = 'update';
      submit.innerHTML = 'Update';
      it = item;
      scroll({
        top: 0,
        behavior: "smooth",
      })
    }
    let search = document.getElementById('search');
    function searchq(id) {
    
      if (id == 'search-title') {
        searchmood = 'title';
    
    
      }
      else {
        searchmood = 'category';
    
      }
      search.placeholder = 'Search By ' + searchmood;
      search.value = '';
      read();
    
    }
    
    function searchdata(value) {
      let table = '';
      for (let i = 0; i < prodata.length; i++) {
        if (searchmood == 'title') {
    
    
          if (prodata[i].title.includes(value)) {
            table += `
        <tr>
                <td>${i + 1}</td>
                <td>${prodata[i].title}</td>
                <td>${prodata[i].price}</td>
                <td>${prodata[i].category}</td>
                <td><button  onclick="update(${i})" id='update'>Update</button></td>
                <td><button  onclick="del(${i})" id='delete'>Delete</button></td>
    
            </tr>
        `;
          }
        }
    
        else {
    
          if (prodata[i].category.includes(value)) {
            table += `
            <tr>
                    <td>${i + 1}</td>
                    <td>${prodata[i].title}</td>
                    <td>${prodata[i].price}</td>
                    <td>${prodata[i].category}</td>
                    <td><button  onclick="update(${i})" id='update'>Update</button></td>
                    <td><button  onclick="del(${i})" id='delete'>Delete</button></td>
        
                </tr>
            `;
          }
    
        }
        let body = document.getElementById('body');
        body.innerHTML = table;
      }
    }
    
    
    const pushToDB = async (formData) => {
      try {
        console.log(formData);
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`); 
        }
    
        const res = await fetch("https://assiut-robotics-server.vercel.app/components/add", {
          method: "post",
          body: formData
        })
        let response = await res.json()
        if (res.ok) {
          ;
          console.log(response);
     
    
        }
        alert(response.message)
        getComponents();
      } catch (error) {
    
        alert(error.message)
        console.log(error);
      }
    
    }
    
    const deleteAll = async () => {
      const res = await fetch("https://assiut-robotics-server.vercel.app/components/deleteAll")
      if (res.ok) {
        const response = await res.json();
        console.log(await response);
        // prodata=await response.data;
        getComponents();
        read();
      }
      else {
        const response = await res.json();
        console.log(await response.message);
      }
    }
}

function renderBorrowManagment(){
  crud.innerHTML = `
    <section id="taps">
        <button  id = "RequestedComponents" class = "m-2">Requested components</button>
        <button id = "BorrowedComponents"   class = "m-2">borrowed components</button>
      </section>
      <section id="render-body">
        
      </section>
  
  `
  const body = document.getElementById("render-body");
  console.log(body);
  
  document.getElementById("RequestedComponents").addEventListener("click", () => (renderRequestedComponents(body)))
  document.getElementById("BorrowedComponents").addEventListener("click", () => renderBorrowedComponents(body))
  
}
function renderRequestedComponents(body){
  console.log(body);
  body.innerHTML = ""
  const token = localStorage.getItem("token")
  // get data 
  fetch("https://assiut-robotics-server.vercel.app/components/getRequestedComponent", {
    method: "GET",
    headers: {
      Authorization: "bearer " + token
    }
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    if (res.data.length == 0) {
      body.innerHTML = "<h2>No requested components found</h2>";
      return;
    }
    res.data.forEach((element, index) => {
        body.innerHTML += `
          <div class="card ">
            <h1>${element.title}</h1>
            <img src="${element.image}" alt="component">
            <p style ="font-weight: bold; font-size : larger">Requested By </p>
            <div class="userinfo row">
              <img src="${element.requestToBorrow.avatar}" class="col" alt="user">
              <h4 class="col">${element.requestToBorrow.name}</h4>
              <h4 class="col">Committee : ${element.requestToBorrow.committee}</h4>
            </div>
            <div class="action row">
              <button class="col accept" id="${index}">Accept</button>
              <button class="col reject" id="${index}">Reject</button>
            </div>
          </div>
        `;
    });

    const accept = document.querySelectorAll('.accept');
    console.log(accept);

    accept.forEach(element => {
      // Your click listener
      element.addEventListener("click", (e) => {
      const component = res.data[e.target.id];
      console.log(component);
      // Show popup
      var deadlinePopup = document.getElementById("deadlinePopup");
      console.log(deadlinePopup);

      deadlinePopup.style.display = "block";
      // Cancel button
      document.getElementById("deadlineCancel").onclick = () => {
        document.getElementById("deadlinePopup").style.display = "none";
      };
      // Confirm button
      document.getElementById("deadlineConfirm").onclick = () => {
        const selectedDate = document.getElementById("deadlineInput").value;
        if (!selectedDate) {
          alert("Please choose a date");
          return;
        }

        const body = {
          componentId: component._id,
          borrowDate: new Date(),
          deadlineDate: new Date(selectedDate).toISOString()
        };

        console.log("Form data:", body);

        // Hide popup after confirming
        document.getElementById("deadlinePopup").style.display = "none";

        fetch("https://assiut-robotics-server.vercel.app/components/acceptRequestToBorrow", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
              },
              body: JSON.stringify(body)
            })
              .then(res => res.json())
              .then((res) => {
                console.log(res);
                if (res.message == "accepted") {
                  alert("Request accepted successfully");
                  window.location.reload();
                } else {
                  alert("Error accepting request");
                }
              });
          };
        });
      });

      const reject = document.querySelectorAll('.reject');
    console.log(reject);
    reject.forEach(element => {
      element.addEventListener("click", (e) => {
        const component = res.data[e.target.id];
        console.log(component);

        fetch("https://assiut-robotics-server.vercel.app/components/rejectRequestToBorrow",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
          },
          body: JSON.stringify({ componentId: component._id })
        }).then(res => res.json())
          .then((res) => {
            console.log(res);
            if (res.message == "rejected") {
              alert("Rejection Request has been done successfully");
              window.location.reload();
            } else {
              alert("Error rejecting request");
            }
          });
      })
    })
  });


    
    
  
}
function renderBorrowedComponents(){
  const body = document.getElementById("render-body");
  body.innerHTML = ""
  const token = localStorage.getItem("token")
  // get data 
  fetch("https://assiut-robotics-server.vercel.app/components/getBorrowedComponent", {
    method: "GET",
    headers: {
      Authorization: "bearer " + token
    }
  })
  .then(res => res.json())
  .then((res) => {
    console.log(res);
    if(res.length == 0){
      body.innerHTML = "<h2>No borrowed components found</h2>";
    }
    res.data.forEach((element, index) => {
      const deadlineDate = new Date(element.borrowedBy.deadlineDate);
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDeadline = deadlineDate.toLocaleDateString('en-US', options);
      const color = (deadlineDate < new Date()) ? 'red' : 'green';
      body.innerHTML += `
          <div class="card">
            <h1>${element.title}</h1>
            <img src="${element.image}" alt="component">
             <p style ="font-weight: bold; font-size : larger">Borrowed By </p>
            <div class="userinfo row">
              <img src="${element.borrowedBy.member.avatar}" class="col" alt="user">
              <h4 class="col">${element.borrowedBy.member.name}</h4>
              <h4 class="col">${element.borrowedBy.member.committee}</h4>
            </div>
              <h4 class="col" style="color: ${color}">Handing Deadline: ${formattedDeadline}</h4>

            <div class="action row">
              <button class="col return" id="${index}">Return</button>
            </div>
          </div>
        `;
    });

    const returnButtons = document.querySelectorAll('.return');
    console.log(returnButtons);

    returnButtons.forEach(element => {
      element.addEventListener("click", (e) => {
        const component = res.data[e.target.id];
        console.log(component);
        fetch("https://assiut-robotics-zeta.vercel.app/components/return",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "bearer " + token
          },
          body: JSON.stringify({ componentId: component._id })
        }).then(res => res.json())
          .then((res) => {
            console.log(res);
            if (res.message == "returned") {
              alert("Component returned successfully");
              window.location.reload();
            } else {
              alert("Error returning component");
            }
          });
      })
    })
  })
  .catch((error) => {
    console.error("Error fetching borrowed components:", error);
  });


}