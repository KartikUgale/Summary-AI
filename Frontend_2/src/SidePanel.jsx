import { useEffect, useState } from "react";
import "./sidePanel.css";

function SidePanel() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);    // to tracks if API call is in progress
  const [operation, setOperation] = useState("");   // to remembers which button was clicked
  const [copyStatus, setCopyStatus] = useState("copy");

  useEffect(() => {
    chrome.storage.local.get(["researchNotes"], (result) => {   // When the panel opens, load the saved notes into the textarea.
      if (result.researchNotes) setNotes(result.researchNotes);
    });
  }, []);

  const processText = async (op) => {
    setLoading(true);
    setOperation(op);
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      const [{ result }] = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => window.getSelection().toString(),
      });

      if (!result) {
        setText("Please select some text first.");
        return;
      }

      const res = await fetch("http://localhost:8080/api/research/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: result, operation: op }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);
      const data = await res.text();
      setText(data.replace(/\n/g, "<br>"));
    } catch (err) {
      setText("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const saveNotes = () => {
    chrome.storage.local.set({ researchNotes: notes }, () => {
      alert("Notes saved successfully!");
    });
  };

  const copyResult = () => {
    const plainText = text.replace(/<br>/g, "\n");
    navigator.clipboard.writeText(plainText).then(() => {
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("copy"), 1500);
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h2>Summary AI: Research Assistant</h2>
      </div>

      <div className="results-wrapper">
        <div id="results" className={!text ? "empty" : ""}>
          {!text ? (
            <span className="placeholder-text">Select text from browser</span>
          ) : (
            <div
              className="result-item result-content"
              dangerouslySetInnerHTML={{ __html: text }}
            />
          )}
          {loading && <div className="loader"></div>}
        </div>
        <button id="copyBtn" onClick={copyResult}>
          {copyStatus}
        </button>
      </div>

      <div className="actions">
        <button
          onClick={() => processText("summarize")}
          className={loading && operation === "summarize" ? "loading" : ""}
        >
          Summarize
        </button>
        <button
          onClick={() => processText("suggest")}
          className={loading && operation === "suggest" ? "loading" : ""}
        >
          Suggest
        </button>
      </div>

      <div className="notes">
        <h3>Research Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Take notes here"
        />
        <button onClick={saveNotes}>Save Notes</button>
      </div>
    </div>
  );
}

export default SidePanel;
