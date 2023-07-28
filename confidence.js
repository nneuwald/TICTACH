<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
    }
    input[type="range"] {
      display: block;
      width: 100%;
      background-color: transparent;
      -webkit-appearance: none;
      height: 10px;
      position: relative;
    }

    input[type="range"]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 14px;
      height: 14px;
      background-color: black;
      cursor: pointer;
      border-radius: 50%;
      border: 1px solid black;
      margin-top: -6px;
      position: relative;
      z-index: 1;
    }

    input[type="range"]::-webkit-slider-runnable-track {
      border: none;
      height: 1.5px;
      background: black;
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    input[type="range"]::before,
    input[type="range"]::after {
      content: "";
      position: absolute;
      height: 14px;
      width: 2px;
      background-color: black;
      top: 50%;
      transform: translateY(-50%);
    }

    input[type="range"]::before {
      left: 0;
    }

    input[type="range"]::after {
      right: 0;
    }
    input[type=range] {
      -webkit-appearance: none;
      appearance: none;
      height: 5px;
      background-color: lightgray;
      border-radius: 10px;
      outline: none;
      margin: 0;
      padding: 0;
    }

    input[type=range]::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
      cursor: pointer;
      margin-top: -5.5px; /* Adjust the value as needed */
    }

    input[type=range]::-moz-range-thumb {
      width: 12px;
      height: 12px;
      background-color: black;
      border-radius: 50%;
      cursor: pointer;
      margin-top: -6px; /* Adjust the value as needed */
    }
    #confidence-scale-container,
    #trial-label,
    #response-label,
    #confirmation-message,
    #next-trial-button {
      display: none;
    }
    #confidence-scale-container {
      text-align: left;
      width: 500px;
      margin-left: 50px;
      margin-right: auto;
      margin-bottom: 30px;
    }

    #confidence-scale {
      width: 100%;
      margin-bottom: 40px;
    }

    #record-response-button {
      font-size: 16px;
      padding: 5px 10px;
      display: inline-block;
      margin-top: 30px;
      margin-bottom: 20px;
    }

    #confirmation-message {
      display: none;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin-top: 20px;
      margin-left: auto;
      margin-right: 10px;
      color: green; /* Added color property to make the text green */
    }

    #next-trial-button {
      display: none;
      font-size: 12px;
      margin-top: 10px;
      margin-left: 185px;
      margin-right: auto;
      padding: 5px 10px; /* Added padding to match the size of the record response button */
    }

    #response-label {
      display: block;
    }

    #trial-label {
      font-size: 12px;
      margin-top: 0px;
      margin-left: 10px;
  display: block;

    }

    #subject-id-container {
      position: absolute;
      top: 10px;
left: 200;
      right: auto;
      display: center
    }

    #subject-id-label {
      margin-right: 5px;
      margin-top: 10px; /* Adjust the value as desired */
    }

    #subject-id {
      width: 50px;
      font-size: 14px;
    }

    #start-task-button {
      font-size: 20px;
      padding: 10px 20px;
      margin-top: 40px;
      position: absolute;
      top: 50px;
      left: 200px;
visibility: hidden
    }

  
  </style>
</head>
<body>
  <div id="subject-id-container">
    <label for="subject-id" id="subject-id-label"><b>Subject ID:</b></label>
    <input type="text" id="subject-id" name="subject-id">
  </div>

  <button id="start-task-button">Start Task</button>

  <div id="confidence-scale-container">
    <label id="response-label" for="confidence-scale" style="text-align: center; display: block; font-size: 16px; font-weight: bold; font-family: Arial, sans-serif; margin-bottom: 20px;">
      How confident are you that your previous response is accurate?
    </label>
    <div style="display: flex; justify-content: space-between;">
      <span id="slider-text" style="margin-right: -10px; margin-top: -10px; font-size: 14px; font-family: Arial, sans-serif;">Not at all confident</span>
      <input type="range" id="confidence-scale" min="0" max="100" step="1">
      <span id="anchor-text" style="margin-left: 10px; margin-top: -10px;font-size: 14px; font-family: Arial, sans-serif;">Extremely confident</span>
    </div>
    <button id="record-response-button" style="font-size: 12px; margin-top: 0px; margin-left: 185px; margin-right: auto;">Record Response</button>
    <p id="confirmation-message">Response Recorded</p>
    <button id="next-trial-button" style="font-size: 12px; margin-top: 10px; margin-left: 210px; margin-right: auto;">Next Trial</button>
    <p id="trial-label">Trial 1</p>
  </div>
  <p id="subject-id-instruction" style="margin-top: 60px; margin-left: 100px; font-size: 16px;">Enter Subject ID to begin Schandry Task</p>

  <script>
    const subjectIdInput = document.getElementById("subject-id");
    const subjectIdLabel = document.getElementById("subject-id-label");
    const startTaskButton = document.getElementById("start-task-button");
    const confidenceScaleContainer = document.getElementById("confidence-scale-container");
const subjectIdInstruction = document.getElementById("subject-id-instruction");

    startTaskButton.addEventListener("click", () => {
      const subjectId = subjectIdInput.value.trim();
      if (subjectId === "") {
        return;
      }
      // Perform any necessary actions to start the task using the subject ID
      console.log("Subject ID:", subjectId);
  subjectIdInstruction.style.display = "none";


      // Show the confidence scale container
      confidenceScaleContainer.style.display = "block";

      // Hide the subject ID container
      subjectIdInput.parentElement.style.display = "none";
  subjectIdInstruction.style.display = "none";

    });

    subjectIdInput.addEventListener("keyup", (event) => {
      if (event.keyCode === 13) { // Enter key code
        const subjectId = subjectIdInput.value.trim();
        if (subjectId === "") {
          subjectIdLabel.style.color = "red";
          return;
        }
        subjectIdLabel.style.color = "black";

        // Perform any necessary actions to start the task using the subject ID
        console.log("Subject ID:", subjectId);

        // Show the confidence scale container
        confidenceScaleContainer.style.display = "block";

        // Hide the subject ID container
        subjectIdInput.parentElement.style.display = "none";
  subjectIdInstruction.style.display = "none";

      }
    });

    const confidenceScale = document.getElementById("confidence-scale");
    const recordResponseButton = document.getElementById("record-response-button");
    const confirmationMessage = document.getElementById("confirmation-message");
    const nextTrialButton = document.getElementById("next-trial-button");
    const sliderText = document.getElementById("slider-text");
    const anchorText = document.getElementById("anchor-text");
    const responseLabel = document.getElementById("response-label");
    const trialLabel = document.getElementById("trial-label");
    let trialCount = 1;
    let taskData = [];
    recordResponseButton.disabled = true;

    function setTrialLabel(trialCount) {
      trialLabel.innerText = `Trial ${trialCount}`;
    }
function getCurrentTimestamp() {
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  return timestamp;
}

    function handleBackspace(event) {
      if (event.keyCode === 8) { // Backspace key code
        trialCount = 1;
        setTrialLabel(trialCount);
      }
    }

  function handleEscape(event) {
  if (event.keyCode === 27) { // Escape key code
    // Modify data to include both the confidence level and the timestamp
    const data = taskData.map((task, index) => `Task ${index + 1}: Confidence level - ${task.confidenceLevel}, Timestamp - ${task.timestamp}`).join("\n");
    const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "Schandry_Confidence.txt");
  }
}

    function saveAs(blob, filename) {
  const subjectId = subjectIdInput.value.trim();
  const modifiedFilename = `${filename.replace(".txt", "")}_${subjectId}.txt`;
  const downloadLink = document.createElement("a");
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = modifiedFilename;
  downloadLink.click();
}

    confidenceScale.addEventListener("input", () => {
      recordResponseButton.disabled = false;
    });

   recordResponseButton.addEventListener("click", () => {
  const confidenceLevel = confidenceScale.value;
  const timestamp = getCurrentTimestamp();

  // Process the recorded response here or perform any desired action
  console.log("Timestamp:", timestamp);
  console.log("Recorded Confidence Level:", confidenceLevel);

  // Hide the scale, button, slider text, anchor text, response label, and show the confirmation message and next trial button
  confidenceScale.style.display = "none";
  recordResponseButton.style.display = "none";
  sliderText.style.display = "none";
  anchorText.style.display = "none";
  responseLabel.style.display = "none";
  confirmationMessage.style.display = "block";
  nextTrialButton.style.display = "block";
  trialLabel.style.display = "none";

  // Store both the confidence level and timestamp in the taskData array
  taskData.push({ confidenceLevel, timestamp });

  trialCount++;
  setTrialLabel(trialCount);
});
    nextTrialButton.addEventListener("click", () => {
      // Reset the slider to its initial value (0) and show the scale, button, slider text, anchor text, response label
      confidenceScale.value = 50;
      confidenceScale.style.display = "block";
      recordResponseButton.style.display = "inline-block";
      sliderText.style.display = "inline-block";
      anchorText.style.display = "inline-block";
      responseLabel.style.display = "block";
      confirmationMessage.style.display = "none";
      nextTrialButton.style.display = "none";
      trialLabel.style.display = "block";

      setTrialLabel(trialCount);
    });

    startTaskButton.addEventListener("click", () => {
      const subjectId = subjectIdInput.value.trim();
      if (subjectId === "") {
        subjectIdLabel.style.color = "red";
        return;
      }
      subjectIdLabel.style.color = "black";

      // Perform any necessary actions to start the task using the subject ID
      console.log("Subject ID:", subjectId);

      // Hide the subject ID container
      subjectIdInput.parentElement.style.display = "none";
    });

    document.addEventListener("keydown", handleBackspace);
    document.addEventListener("keydown", handleEscape);
    setTrialLabel(trialCount);
// Create an audio element and set its source
    const audio = new Audio("https://drive.google.com/uc?export=download&id=1uw-n2hN6A-jZVDQrq5E6n0-HdUVBuMPD");

    // Play the audio when the "Record Response" button is clicked
    recordResponseButton.addEventListener("click", () => {
      audio.play();
    });
  </script>
</body>
</html>
