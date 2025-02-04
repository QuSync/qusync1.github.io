function sendData() {
    let number = document.getElementById("number").value;

    fetch("https://your-backend.onrender.com/calculate", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ number: Number(number) })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            document.getElementById("result").innerText = "Error: " + data.error;
        } else {
            document.getElementById("result").innerText = data.result;
        }
    })
    .catch(error => console.error("Error:", error));
}
