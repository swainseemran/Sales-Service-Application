const statusFilter = document.getElementById("statusFilter");
const listFilter = document.getElementById("listFilter");
const tableBody = document.getElementById("tableBody");
const salesTable = document.getElementById("salesTable");
const addItemButton = document.getElementById("addItemButton");

document.addEventListener("DOMContentLoaded", function () {
  fetch("salesData.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data, typeof(data));
      // Assume you have stored data in localStorage with key "salesItems"
      let storedData = localStorage.getItem("salesItems");

      // Check if data exists in localStorage
      if (storedData) {
        // Parse the stored JSON data
        let parsedData = JSON.parse(storedData);
        data = [...data,...parsedData ];
        // Now 'parsedData' contains the data from localStorage
        console.log(parsedData , typeof(parsedData));
      } else {
        // Handle the case when no data is found in localStorage
        console.log("No data found in localStorage");
      }

      renderTable(data);

      statusFilter.addEventListener("change", function () {
        const selectedStatus = statusFilter.value;
        const selectedList = listFilter.value;
        filterData(selectedStatus, selectedList, data);
      });

      listFilter.addEventListener("change", function () {
        const selectedStatus = statusFilter.value;
        const selectedList = listFilter.value;
        filterData(selectedStatus, selectedList, data);
      });
    })
    .catch((error) => console.error("Error fetching sales data:", error));

  populateTable();
});

function handleFormSubmission() {
  let itemId = document.getElementById("itemId").value;
  let itemName = document.getElementById("itemName").value;
  let startDate = document.getElementById("startDate").value;
  let endDate = document.getElementById("endDate").value;
  let category = document.getElementById("category").value;
  let ownerName = document.getElementById("ownerName").value;
  let status = document.getElementById("status").value;

  let newItem = {
    id: itemId,
    name: itemName,
    startDate: startDate,
    endDate: endDate,
    category: category,
    ownerName: ownerName,
    status: status,
  };

  let existingItems = JSON.parse(localStorage.getItem("salesItems")) || [];

  existingItems.push(newItem);

  localStorage.setItem("salesItems", JSON.stringify(existingItems));

  populateTable();

  document.getElementById("itemId").value = "";
  document.getElementById("itemName").value = "";
  document.getElementById("startDate").value = "";
  document.getElementById("endDate").value = "";
  document.getElementById("category").value = "";
  document.getElementById("ownerName").value = "";
  document.getElementById("status").value = "";
}

function renderTable(data) {
  tableBody.innerHTML = "";

  data.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.startDate}</td>
              <td>${item.endDate}</td>
              <td>${item.category}</td>
              <td>${item.ownerName}</td>
              <td>${item.status}</td>
          `;
    tableBody.appendChild(row);
  });
}

function filterData(status, list, data) {
  let filteredData = data;

  if (status !== "all") {
    filteredData = filteredData.filter((item) => item.status === status);
  }

  if (list === "my-list") {
    const currentUser = "Seemran";
    filteredData = filteredData.filter(
      (item) => item.ownerName === currentUser
    );
  } else if (list === "all-list") {
    const currentUser = ["Shiv Reddy", "Rahul kumar", "Manish Sahu"];
    filteredData = filteredData.filter(
      (item) => item.ownerName !== currentUser
    );
  }

  renderTable(filteredData);
}

function populateTable() {
  let items = JSON.parse(localStorage.getItem("salesItems")) || [];

  let tableBody = document.getElementById("tableBody");

  tableBody.innerHTML = "";

  items.forEach(function (item) {
    let row = tableBody.insertRow();
    row.insertCell(0).innerHTML = item.id;
    row.insertCell(1).innerHTML = item.name;
    row.insertCell(2).innerHTML = item.startDate;
    row.insertCell(3).innerHTML = item.endDate;
    row.insertCell(4).innerHTML = item.category;
    row.insertCell(5).innerHTML = item.ownerName;
    row.insertCell(6).innerHTML = item.status;
  });
}

function openModal() {
  document.getElementById("addItemModal").style.display = "block";
}

function closeModal() {
  document.getElementById("addItemModal").style.display = "none";
  console.log("closemodel clicked outside");
}

document.getElementById("addItemButton").addEventListener("click", openModal);

document
  .getElementById("addItemForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    handleFormSubmission();

    closeModal();
  });
