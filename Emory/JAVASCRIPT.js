    const subjectIdInput = document.getElementById("subject-id");
    const subjectIdLabel = document.getElementById("subject-id-label");
    const startTaskButton = document.getElementById("start-task-button");
    const taskAudio = document.getElementById("task-audio");
    const finishAudio = document.getElementById("finish-audio");
const confidenceScaleContainer = document.getElementById("confidence-scale-container");
const confidenceScale = document.getElementById("confidence-scale");
const recordResponseButton = document.getElementById("record-response-button");
recordResponseButton.disabled = true;

    let seatedTimers = [0, 0, 0];
    let tiltedTimers = [];
    let currentTimer = 0;
 let animationPaused = false; // New variable to track animation pause state
let sliderClicked = false;

  function pauseAnimation() {
    heartDiv.classList.add("paused");
  animationPaused = true;

 


  }

    // Disable the "Start Task" button initially
    startTaskButton.disabled = true;

    // Add event listener to the subject ID input
    subjectIdInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        subjectIdInput.style.display = "none";
        subjectIdLabel.style.display = "none";
        subjectId = subjectIdInput.value; // Store the entered subject ID

        // Enable the "Start Task" button if a subject number is entered
        if (subjectId.trim() !== "") {
          startTaskButton.disabled = false;
        }
      }
    });
    const sliderInstructions = document.getElementById("slider-instructions");

    const beatRateSlider = document.getElementById("beat-rate");
    const heartDiv = document.getElementById("heart-div");
    const beatRateText = document.getElementById("beat-rate-text");
    const finishedButton = document.getElementById("finished-button");
    const cantFeelButton = document.getElementById("cant-feel-button");

    const confirmationMessage = document.getElementById("confirmation-message");
    const endTaskButton = document.getElementById("end-task-button");
    const taskLabel = document.getElementById("task-label");

    let sliderMoving = false;
    let timeoutID;
    let outputData = ""; // Variable to store the recorded data
    let recordingStarted = false;
    let seatedCount = 1;
    let tiltedCount = 1;
    let subjectId = ""; // Variable to store the subject ID
    let startTime = 0;
    let startTime2 = 0;
    let endTime = 0;
    let previousSliderValue; // Variable to store the previous slider value

    

    function resumeAnimation() {
      heartDiv.classList.remove("paused");
  animationPaused = false;

    }

    beatRateSlider.addEventListener("input", () => {

 if (!sliderClicked) {
    // Set the start time of the current interval
    startTime = Date.now();
    sliderClicked = true; // Set sliderClicked to true on the first click


}
  const beatRate = beatRateSlider.value;
  const animationDuration = (60 / beatRate) + "s";
  heartDiv.style.animationDuration = animationDuration;

  
 if (sliderInstructions.style.display !== "none") {
        sliderInstructions.style.display = "none";
      }
});
   
  


    finishedButton.addEventListener("click", () => {
      finishAudio.play();
      if (recordingStarted) {
        endTime = Date.now(); // Get the end time of the current interval
        const timeSpent = endTime - startTime; // Calculate the time spent on the current interval in milliseconds
const timeSpent2 = endTime - startTime2; // Calculate the time spent on the current interval in milliseconds

        const beatRate = beatRateSlider.value;
        beatRateText.style.display = "block";
        finishedButton.style.display = "none";
        cantFeelButton.style.display = "none";
    confidenceScaleContainer.classList.add("show-container"); // Show the container when starting the task

        let confirmationMessageText =
          "Continue to silently sense your heartbeat. When the animation returns, complete the task again.";

if (seatedCount === 3 || tiltedCount === 3) {
          confirmationMessageText =
            "<span style='color: darkgreen;'>Please await further instructions from the researcher</span>";

          timeoutID = setTimeout(() => {
            finishedButton.style.display = "block";
            cantFeelButton.style.display = "block";
            beatRateText.style.display = "none";
            confirmationMessage.style.display = "none";
        confidenceScaleContainer.classList.remove("show-container"); // Show the container when starting the task

            beatRateSlider.classList.remove("hide-slider");
            heartDiv.classList.remove("hide-heart");
            resetTask();
            increaseCounter();
  pauseAnimation(); // Pause the animation after the delay

          }, 3000000); // Delay changed to 5 hours
        } else {
          timeoutID = setTimeout(() => {
// Append a line with N/A for skipped data, keeping the trial name in the first column
    outputData += "N/A \n";
            finishedButton.style.display = "block";
            cantFeelButton.style.display = "block";
            beatRateText.style.display = "none";
            confirmationMessage.style.display = "none";
    confidenceScaleContainer.classList.remove("show-container"); // Show the container when starting the task


            beatRateSlider.classList.remove("hide-slider");
            heartDiv.classList.remove("hide-heart");
            resetTask();
            increaseCounter();
  pauseAnimation(); // Pause the animation after the delay
          }, 20000); // Default delay for other tasks (30,000 milliseconds)
        }

        confirmationMessage.innerHTML = confirmationMessageText;
        beatRateSlider.classList.add("hide-slider");

        heartDiv.classList.add("hide-heart");


      let output;
  if (seatedCount === 1) {
    output = `Seated ${seatedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    seatedTimers[0] += timeSpent;
seatedTimers[0] += timeSpent2;
  } else if (seatedCount === 2) {
    output = `Seated ${seatedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    seatedTimers[1] += timeSpent;
seatedTimers[1] += timeSpent2;
  } else if (seatedCount === 3) {
    output = `Seated ${seatedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    seatedTimers[2] += timeSpent;
seatedTimers[2] += timeSpent2;
  } else {
    output = `Tilted ${tiltedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    tiltedTimers.push(timeSpent);
tiltedTimers.push(timeSpent2);
    tiltedCount++;
  }
  outputData += output + ","; // Record the slider value in the output data

        previousSliderValue = beatRate; // Update the previous slider value for the next interval
      }

  });


 
recordResponseButton.addEventListener("click", () => {
  const confidenceLevel = confidenceScale.value;
  let confidenceOutput;
  if (seatedCount <= 3) {
    confidenceOutput = `${confidenceLevel}`;
  } else {
    confidenceOutput = `${confidenceLevel}`;
  }
  outputData += confidenceOutput + "\n"; // Append confidence output to the output data

  // Process the recorded response here or perform any desired action
  console.log("Recorded Confidence Level:", confidenceLevel);

  confidenceScaleContainer.classList.remove("show-container"); // Hide the container after recording the response
  confirmationMessage.style.display = "block"; // Show the confirmation message
});

confidenceScale.addEventListener("input", () => {
  recordResponseButton.disabled = false;
});

    cantFeelButton.addEventListener("click", () => {
      finishAudio.play();
      if (recordingStarted) {
        endTime = Date.now(); // Get the end time of the current interval
        const timeSpent = endTime - startTime; // Calculate the time spent on the current interval in milliseconds
        const timeSpent2 = endTime - startTime2; // Calculate the time spent on the current interval in milliseconds

        const beatRate = 0;
        beatRateText.style.display = "block";
        finishedButton.style.display = "none";
        cantFeelButton.style.display = "none";
    confidenceScaleContainer.classList.add("show-container"); // Show the container when starting the task

        let confirmationMessageText =
          "Continue to silently sense your heartbeat. When the animation returns, complete the task again.";

if (seatedCount === 3 || tiltedCount === 3) {
          confirmationMessageText =
            "<span style='color: darkgreen;'>Please await further instructions from the researcher</span>";

          timeoutID = setTimeout(() => {

            finishedButton.style.display = "block";
            cantFeelButton.style.display = "block";
            beatRateText.style.display = "none";
            confirmationMessage.style.display = "none";
    confidenceScaleContainer.classList.remove("show-container"); // Show the container when starting the task

            beatRateSlider.classList.remove("hide-slider");
            heartDiv.classList.remove("hide-heart");
            resetTask();
            increaseCounter();
  pauseAnimation(); // Pause the animation after the delay

          }, 3000000); // Delay changed (3,000,000 milliseconds)
        } else {
          timeoutID = setTimeout(() => {

            finishedButton.style.display = "block";
            cantFeelButton.style.display = "block";
            beatRateText.style.display = "none";
            confirmationMessage.style.display = "none";
    confidenceScaleContainer.classList.remove("show-container"); // Show the container when starting the task

            beatRateSlider.classList.remove("hide-slider");
            heartDiv.classList.remove("hide-heart");
            resetTask();
            increaseCounter();
  pauseAnimation(); // Pause the animation after the delay

          }, 20000); // Default delay for other tasks (30,000 milliseconds)
        }

        confirmationMessage.innerHTML = confirmationMessageText;
        beatRateSlider.classList.add("hide-slider");
confidenceScaleContainer.style.display = "block";

        heartDiv.classList.add("hide-heart");

         let output;
  if (seatedCount === 1) {
    output = `Seated ${seatedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    seatedTimers[0] += timeSpent;
    seatedTimers[0] += timeSpent2;
  } else if (seatedCount === 2) {
    output = `Seated ${seatedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    seatedTimers[1] += timeSpent;
    seatedTimers[1] += timeSpent2;
  } else if (seatedCount === 3) {
    output = `Seated ${seatedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    seatedTimers[2] += timeSpent;
    seatedTimers[2] += timeSpent2;
  } else {
    output = `Tilted ${tiltedCount}: ${beatRate} ,${timeSpent}, ${timeSpent2}, ${getCurrentTimestamp()}`;
    tiltedTimers.push(timeSpent);
    tiltedTimers.push(timeSpent2);
    tiltedCount++;
  }
  outputData += output + ","; // Record the slider value in the output data data

        previousSliderValue = beatRate; // Update the previous slider value for the next interval
      }
    });
function getCurrentTimestamp() {
  const date = new Date();
  const timestamp = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return timestamp;
}

    startTaskButton.addEventListener("click", () => {
      taskLabel.classList.add("show-label");
      finishedButton.classList.add("show-button");
    sliderInstructions.style.display = "block";

      cantFeelButton.classList.add("show-button");
      beatRateSlider.classList.add("show-slider");
      heartDiv.classList.add("show-heart");
      beatRateSlider.classList.remove("hide-slider");
      taskAudio.play();

      if (!recordingStarted && subjectId.trim() !== "") {
        previousSliderValue = beatRateSlider.value; // Initialize previousSliderValue with the initial slider value
        const initialBeatRate = beatRateSlider.value;
        const initialAnimationDuration = (60 / initialBeatRate) + "s";
        heartDiv.style.animationDuration = initialAnimationDuration;

        recordingStarted = true;
        startTaskButton.disabled = true;
        endTaskButton.style.display = "block";
        startTaskButton.style.display = "none";
        resetTask();
    sliderInstructions.classList.add("show-instructions");


        // Move the slider to 95
        beatRateSlider.value = beatRateSlider.min;
        const beatRate = beatRateSlider.value;
        const animationDuration = (60 / beatRate) + "s";
        heartDiv.style.animationDuration = animationDuration;

        // Disable the "Finished" and "I cannot feel my heartbeat" buttons initially
        finishedButton.disabled = true;
cantFeelButton.disabled = true;

        // Set the start time of the current interval
        startTime2 = Date.now();

      }
    });

    beatRateSlider.addEventListener("mousedown", () => {
   sliderMoving = true;
  pauseAnimation();
  animationPaused = true;
  previousSliderValue = beatRateSlider.value;

      // Enable the "Finished" and "I cannot feel my heartbeat" buttons
      finishedButton.disabled = false;
      cantFeelButton.disabled = false;

    });
beatRateSlider.addEventListener("mouseup", () => {
  sliderMoving = false;
  resumeAnimation();
  animationPaused = false;
});

function triggerEscapeKeyActions() {
  // Mimic the actions bound to the Escape key press
  endTask(); // Call endTask function directly

  // Hide all elements as done in the Escape key event listener
  const elements = document.querySelectorAll("body > *");
  elements.forEach((element) => {
    element.style.display = "none";
  });

  // Display the "Task Completed" message
  const completionMessage = document.createElement("div");
  completionMessage.textContent = "Task Completed";
  completionMessage.style.fontFamily = "Arial, sans-serif";
  completionMessage.style.fontSize = "22px";
  completionMessage.style.marginTop = "-3in"; // Adjust as necessary
  completionMessage.style.marginLeft = "-2.3in"; // Adjust as necessary
  completionMessage.style.textAlign = "center";
  document.body.appendChild(completionMessage);

  // Display the copyright notice
  const copyrightText = document.createElement("div");
  copyrightText.textContent = "Copyright (c) 2023 Nicholas Neuwald. All rights reserved.";
  copyrightText.style.fontFamily = "Arial, sans-serif";
  copyrightText.style.fontSize = "11px";
  copyrightText.style.marginTop = "90px"; // Adjust as necessary
  copyrightText.style.marginLeft = "-210px"; // Adjust as necessary
  copyrightText.style.textAlign = "center";
  document.body.appendChild(copyrightText);

}
function endTask() {
  if (recordingStarted) {
    clearTimeout(timeoutID);

    // Split the recorded data into lines
    const dataLines = outputData.trim().split("\n");

 // Filter out lines with "N/A" in column A
    const filteredDataLines = dataLines.filter(line => !line.startsWith("N/A"));

    // Adding headers to CSV
    const csvHeaders = "Trial #, Subjective Heartrate,Slider Time (ms),Total Time (ms),Finished Timestamp, confidence \n";

    // Convert data lines to CSV format
    const csvData = csvHeaders + filteredDataLines.map((line) => {
        const parts = line.split(': ');
        return parts.map(part => part.trim()).join(',');
    }).join('\n');
    // Blob for CSV
    const csvBlob = new Blob([csvData], { type: 'text/csv' });
    const fileName = `TICTACH_output_${subjectId}.csv`; // Change file extension to .csv

    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveOrOpenBlob(csvBlob, fileName);
    } else {
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(csvBlob);
      downloadLink.download = fileName;
      downloadLink.click();
    }

    recordingStarted = false;
    resetTask();
  }
}
   
    // Add event listener to the escape key
    document.addEventListener("keyup", (event) => {
      if (event.code === "Space") {
    pauseAnimation();






  }
    });
    // Add event listener to the escape key
    document.addEventListener("keyup", (event) => {
      if (event.code === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        endTask();
// Hide all elements
        const elements = document.querySelectorAll("body > *");
        elements.forEach((element) => {
          element.style.display = "none";
        });

   const completionMessage = document.createElement("div");
completionMessage.textContent = "Task Completed";
completionMessage.style.fontFamily = "Arial, sans-serif";
completionMessage.style.fontSize = "22px";
completionMessage.style.marginTop = "-3in"; /* Adjust the marginTop value to move the text higher */
completionMessage.style.marginLeft = "-2.3in"; /* Adjust the marginLeft value to move the text more to the left */

completionMessage.style.textAlign = "center";
document.body.appendChild(completionMessage);
     // Display the copyright text
const copyrightText = document.createElement("div");
copyrightText.textContent = "Copyright (c) 2023 Nicholas Neuwald. All rights reserved.";
copyrightText.style.fontFamily = "Arial, sans-serif";
copyrightText.style.fontSize = "11px";
copyrightText.style.marginTop = "90px"; /* Adjust the marginTop value to move the text further down */
copyrightText.style.marginLeft = "-210px"; 

copyrightText.style.textAlign = "center";
document.body.appendChild(copyrightText);
}
    });
    

    function resetTask() {
sliderClicked = false
      beatRateSlider.value = beatRateSlider.min;
previousSliderValue = beatRateSlider.value;

      const beatRate = beatRateSlider.value;
      const animationDuration = (60 / beatRate) + "s";
      heartDiv.style.animationDuration = animationDuration;
      beatRateText.innerHTML = "";
  confidenceScale.value = 50;
  recordResponseButton.disabled = true;
      heartDiv.classList.add("paused");


      beatRateText.style.display = "none";
      finishedButton.style.display = "none";
      cantFeelButton.style.display = "none";
      confirmationMessage.innerHTML = "";
  sliderInstructions.style.display = "block";

      // Set the start time of the current interval to 0
timeSpent = 0
      startTime2 = 0;


      if (recordingStarted) {
        finishedButton.style.display = "block";
        cantFeelButton.style.display = "block";
      }
    }

    function increaseCounter() {
      const counterElement = document.getElementById("task-label");
      counterElement.classList.add("task-label-animation");
      setTimeout(() => {
        if (seatedCount === 1) {
          counterElement.innerText = "Seated 2";
          seatedCount++;
        } else if (seatedCount === 2) {
          counterElement.innerText = "Seated 3";
          seatedCount++;
        } else if (seatedCount === 3) {
          const currentCount = parseInt(counterElement.innerText.replace("Tilted", ""), 10);
          const newCount = isNaN(currentCount) ? 1 : currentCount + 1;
          counterElement.innerText = "Tilted " + newCount;
          seatedCount++;
        } else {
          const currentCount = parseInt(counterElement.innerText.replace("Tilted", ""), 10);
          const newCount = isNaN(currentCount) ? 1 : currentCount + 1;
          counterElement.innerText = "Tilted " + newCount;
         if (newCount === 4) {
        // Instead of simulating an Escape key press, directly invoke the actions
        triggerEscapeKeyActions();
      }
}
        counterElement.classList.remove("task-label-animation");
      }, 300);
      // Enable the "Finished" and "I cannot feel my heartbeat" buttons for the current interval
      finishedButton.disabled = true;
cantFeelButton.disabled = true;
        startTime2 = Date.now();

      
    }

    document.addEventListener("keydown", (event) => {
      const finishedButton = document.getElementById("finished-button");
      const finishedButtonVisible = getComputedStyle(finishedButton).display !== "none";

      if (event.code === "Space" && finishedButtonVisible) {
        event.preventDefault();
        event.stopPropagation();
  pauseAnimation(); // Pause the animation after the delay

        return false;
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Space" && recordingStarted) {
        clearTimeout(timeoutID);
event.preventDefault();
    event.stopPropagation();

        finishedButton.style.display = "block";
        cantFeelButton.style.display = "block";
        beatRateText.style.display = "none";
        confirmationMessage.style.display = "none";
        beatRateSlider.classList.remove("hide-slider");
        heartDiv.classList.remove("hide-heart");
  confidenceScaleContainer.classList.remove("show-container"); // Show the container when starting the task



        if (finishedButton.style.display !== "none") {
          resetTask();
          increaseCounter();
 // Get the current trial number
    const counterElement = document.getElementById("task-label");
    const currentTrial = counterElement.innerText;

    // Append a line with N/A for skipped data, keeping the trial name in the first column
     outputData += "N/A \n";
        }
      }
    });

    document.addEventListener("keyup", (event) => {
      if (event.code === "Backspace") {
        const counterElement = document.getElementById("task-label");
        counterElement.innerText = "Seated 1";
        seatedCount = 1;
      }
    });
