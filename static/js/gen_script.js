document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            
            const category = form.id.split("-")[0]; // "length", "energy", or "frequency"
            const inputUnit = form.querySelector("select").value;
            const inputValue = parseFloat(form.querySelector("input").value);
            const resultDiv = document.getElementById(`${category}-results`);

            if (isNaN(inputValue)) {
                resultDiv.innerHTML = "<p style='color: red;'>Please enter a valid number.</p>";
                return;
            }

            // Send data to Flask backend
            const response = await fetch("/convertt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category, unit: inputUnit, value: inputValue }),
            });

            const data = await response.json();

            // Display the result
            resultDiv.innerHTML = "<h4>Converted Values:</h4>";
            for (const [unit, convertedValue] of Object.entries(data)) {
                resultDiv.innerHTML += `<p>${convertedValue.toFixed(4)} ${unit}</p>`;
            }
        });
    });

    // Tab switching logic
    document.querySelectorAll(".tab").forEach(tab => {
        tab.addEventListener("click", function () {
            document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
            document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
            
            this.classList.add("active");
            document.getElementById(this.getAttribute("data-target")).classList.add("active");
        });
    });
});
