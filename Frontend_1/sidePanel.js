document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['researchNotes'], function(result) {
        if (result.researchNotes) {
            document.getElementById('notes').value = result.researchNotes;
        }
    });

    document.getElementById('summarizeBtn').addEventListener('click', () => processText('summarize'));
    document.getElementById('suggestBtn').addEventListener('click', () => processText('suggest'));
    document.getElementById('saveNotesBtn').addEventListener('click', saveNotes);
});

// Unified function for Summarize/Suggest
async function processText(operation) {
    const button = operation === 'summarize' ? document.getElementById('summarizeBtn') : document.getElementById('suggestBtn');

    try {
        button.classList.add('loading'); // Show button spinner
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{ result }] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => window.getSelection().toString()
        });

        if (!result) {
            showResult('Please select some text first.');
            button.classList.remove('loading');
            return;
        }

        const response = await fetch('http://localhost:8080/api/research/process', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: result, operation })
        });

        if (!response.ok) throw new Error(`API Error: ${response.status}`);

        const text = await response.text();
        showResult(text.replace(/\n/g, '<br>'));
    } catch (error) {
        showResult('Error: ' + error.message);
    } finally {
        button.classList.remove('loading'); // Remove spinner after request
    }
}

async function saveNotes() {
    const notes = document.getElementById(`notes`).value;
    chrome.storage.local.set({ 'researchNotes': notes }, function() {
        alert('Notes saved successfully!');
    });
}

function showResult(content) {
    document.getElementById('results').innerHTML = `<div class="result-item"><div class="result-content">${content}</div></div>`;
}



//  loading animation
const summarizeBtn = document.getElementById('summarizeBtn');
const results = document.getElementById('results');

summarizeBtn.addEventListener('click', () => {
    // Start loading
    summarizeBtn.classList.add('loading');

    // Simulate async processing (e.g., 2 seconds)
    setTimeout(() => {
        summarizeBtn.classList.remove('loading'); // Stop loading
    }, 2000);
});



// copy result function
const copyBtn = document.getElementById('copyBtn');

copyBtn.addEventListener('click', () => {
    const resultsContent = document.querySelector('#results .result-content');
    if(resultsContent && resultsContent.textContent.trim() !== '') {
        navigator.clipboard.writeText(resultsContent.textContent)
            .then(() => {
                copyBtn.textContent = 'done'; // Show checkmark temporarily
                setTimeout(() => copyBtn.textContent = 'copy', 1500);
            })
            .catch(err => {
                console.error('Failed to copy text:', err);
            });
    }
});

