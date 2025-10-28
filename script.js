let tenants = [];

document.addEventListener("DOMContentLoaded", () => {
  // Load data from XML
  fetch("data/tenants.xml")
    .then(res => res.text())
    .then(str => new DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      const nodes = data.getElementsByTagName("tenant");
      for (let t of nodes) {
        tenants.push({
          name: t.getElementsByTagName("name")[0].textContent,
          room: t.getElementsByTagName("room")[0].textContent,
          rent: t.getElementsByTagName("rent")[0].textContent,
          date: t.getElementsByTagName("date")[0].textContent
        });
      }
      displayTenants();
    });

  document.getElementById("tenantForm").addEventListener("submit", saveTenant);
});

function displayTenants() {
  const tbody = document.getElementById("tenantBody");
  tbody.innerHTML = "";
  tenants.forEach((t, i) => {
    const row = `
      <tr>
        <td>${t.name}</td>
        <td>${t.room}</td>
        <td>${t.rent}</td>
        <td>${t.date}</td>
        <td>
          <button class="action edit" onclick="editTenant(${i})">Edit</button>
          <button class="action delete" onclick="deleteTenant(${i})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

function saveTenant(e) {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const room = document.getElementById("room").value.trim();
  const rent = document.getElementById("rent").value.trim();
  const date = document.getElementById("date").value;
  const index = document.getElementById("editIndex").value;

  if (!name || !room || !rent || !date) {
    alert("Please fill all fields!");
    return;
  }

  const newTenant = { name, room, rent, date };

  if (index !== "") {
    tenants[index] = newTenant;
    document.getElementById("editIndex").value = "";
    alert("Tenant updated successfully!");
  } else {
    tenants.push(newTenant);
    alert("Tenant added successfully!");
  }

  document.getElementById("tenantForm").reset();
  displayTenants();
}

function editTenant(i) {
  const t = tenants[i];
  document.getElementById("name").value = t.name;
  document.getElementById("room").value = t.room;
  document.getElementById("rent").value = t.rent;
  document.getElementById("date").value = t.date;
  document.getElementById("editIndex").value = i;
}

function deleteTenant(i) {
  if (confirm("Are you sure you want to delete this tenant?")) {
    tenants.splice(i, 1);
    displayTenants();
  }
}
