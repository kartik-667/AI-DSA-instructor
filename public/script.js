// Get references to the HTML elements
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Add event listeners for the send button and the Enter key
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Function to add a message to the chat window
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    messageElement.innerText = text; // Using innerText to prevent HTML injection
    chatMessages.appendChild(messageElement);
    // Scroll to the bottom of the chat
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show the typing indicator
function showTypingIndicator() {
    const indicatorElement = document.createElement('div');
    indicatorElement.classList.add('message', 'bot-message', 'typing-indicator');
    indicatorElement.id = 'typing-indicator';
    indicatorElement.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(indicatorElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove the typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

import callerfnc from '../dsa'

// The main function to handle sending a message
async function sendMessage() {
    const query = userInput.value.trim();
    if (query === '') return;

    // Display the user's message
    addMessage(query, 'user');
    userInput.value = '';

    // Show the typing indicator while waiting for the bot's response
    showTypingIndicator();

    try {

        const botresponse=await callerfnc(query)
        removeTypingIndicator();
        addMessage(botresponse, 'bot');


        
    } catch (error) {
         removeTypingIndicator();
        addMessage("Sorry, I'm having a little trouble right now. Please try again later.", 'bot');
        console.error("Error fetching bot response:", error);
        
    }

    // try {
    //     // Get the response from the bot
    //     const botResponse = await getBotResponse(query);
        
    //     // Remove the typing indicator and display the bot's message
    //     removeTypingIndicator();
    //     addMessage(botResponse, 'bot');

    // } catch (error) {
    //     // Handle any errors
    //     removeTypingIndicator();
    //     addMessage("Sorry, I'm having a little trouble right now. Please try again later.", 'bot');
    //     console.error("Error fetching bot response:", error);
    // }
}

// ===================================================================================
// =================== 🤖 YOUR GEMINI API INTEGRATION GOES HERE 🤖 ===================
// ===================================================================================

// async function getBotResponse(query) {
//     /**
//      *  IMPORTANT: This is a MOCK function.
//      *  Replace the content of this function with your actual call to the Gemini API.
//      * 
//      *  - You will likely use the `fetch()` API to make a POST request to your backend
//      *    or directly to the Gemini API endpoint if you are handling it client-side.
//      *  - You'll need to send the user's `query` in the request body.
//      *  - You'll then parse the JSON response from the API to get the bot's message.
//      */

//     // --- MOCK IMPLEMENTATION (DELETE THIS PART) ---
//     console.log("Sending to mock bot:", query);
//     // Simulate a network delay
//     await new Promise(resolve => setTimeout(resolve, 1500)); 

//     if (query.toLowerCase().includes("array")) {
//         return "An array is a data structure consisting of a collection of elements, each identified by at least one array index or key. They are great for fast lookups by index (O(1)) but can be slow for insertions and deletions.";
//     } else if (query.toLowerCase().includes("linked list")) {
//         return "A linked list is a linear collection of data elements whose order is not given by their physical placement in memory. Instead, each element points to the next. They are efficient for insertions and deletions but slower for lookups (O(n)).";
//     } else if (query.toLowerCase().includes("big o")) {
//         return "Big O notation is a mathematical notation that describes the limiting behavior of a function when the argument tends towards a particular value or infinity. In computer science, it's used to classify algorithms according to how their run time or space requirements grow as the input size grows.";
//     } else {
//         return "I'm a DSA bot! Ask me about topics like arrays, sorting algorithms (like Bubble Sort, Merge Sort), data structures (like stacks, queues), or time complexity (Big O notation).";
//     }
//     // --- END OF MOCK IMPLEMENTATION ---


//     // --- YOUR REAL IMPLEMENTATION (EXAMPLE) ---
//     /*
//     const GEMINI_API_ENDPOINT = "YOUR_GEMINI_API_ENDPOINT_HERE"; // e.g., your backend server URL
//     const API_KEY = "YOUR_API_KEY_HERE"; // If needed

//     try {
//         const response = await fetch(GEMINI_API_ENDPOINT, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 // 'Authorization': `Bearer ${API_KEY}` // Uncomment if you use auth headers
//             },
//             body: JSON.stringify({
//                 prompt: query // Make sure the body format matches what your backend expects
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();
        
//         // IMPORTANT: Adjust this line based on the actual structure of your Gemini API response
//         const botMessage = data.candidates[0].content.parts[0].text; 

//         return botMessage;

//     } catch (error) {
//         console.error("Could not fetch response from Gemini API:", error);
//         return "I'm sorry, I couldn't connect to my brain. Please check the connection and try again.";
//     }
//     */
// }

// Add a welcome message when the page loads
window.onload = () => {
    addMessage("Hello! I'm a DSA expert bot. How can I help you today?", 'bot');
};