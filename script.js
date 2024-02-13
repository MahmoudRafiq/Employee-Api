async function getEmployee() {
    const employeeId = document.getElementById("employeeId").value;
    try {
        const response = await fetch(`https://3mp72du6o7.execute-api.eu-central-1.amazonaws.com/dev/employee/${employeeId}`);
        if (!response.ok) {
            throw new Error("Employee not found!");
        }
        const data = await response.json();
        document.getElementById("employeeName").innerText = data.Name;
        document.getElementById("employeeAge").innerText = data.age;
        document.getElementById("employeeSalary").innerText = data.Salary;
        document.getElementById("employeeInfo").classList.remove("hidden");
    } catch (error) {
        alert(error.message);
    }
}

async function deleteEmployee() {
    const employeeId = document.getElementById("employeeId").value;
    try {
        const response = await fetch(`https://3mp72du6o7.execute-api.eu-central-1.amazonaws.com/dev/employee/${employeeId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            throw new Error("Failed to delete employee!");
        }
        alert("Employee deleted successfully!");
        document.getElementById("employeeInfo").classList.add("hidden");
    } catch (error) {
        alert(error.message);
    }
}

async function updateEmployee() {
    const employeeId = document.getElementById("employeeId").value;
    // Get updated employee data from input fields or other UI elements
    const updatedEmployeeData = {
        // Include updated employee data here (e.g., name, age, salary)
        "Name": document.getElementById("updatedName").value,
        "age": document.getElementById("updatedAge").value,
        "Salary": document.getElementById("updatedSalary").value
    };

    try {
        const response = await fetch(`https://3mp72du6o7.execute-api.eu-central-1.amazonaws.com/dev/employee/${employeeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedEmployeeData)
        });
        if (!response.ok) {
            throw new Error("Failed to update employee!");
        }
        alert("Employee updated successfully!");
        // Optionally update UI with the updated employee data
    } catch (error) {
        alert(error.message);
    }
}
