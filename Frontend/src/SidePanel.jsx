import { useEffect, useState } from "react";
import "./sidePanel.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function SidePanel() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [operation, setOperation] = useState("");
  const [copyStatus, setCopyStatus] = useState("copy");

  // History panel states
  const [historyOpen, setHistoryOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Load saved notes on mount
  useEffect(() => {
    chrome.storage.local.get(["researchNotes"], (result) => {
      if (result.researchNotes) setNotes(result.researchNotes);
    });
  }, []);

  // Fetch history when opened
  const fetchHistory = async () => {
    if (historyOpen) {
      setHistoryOpen(false);
      return;
    }
    setHistoryOpen(true);
    setHistoryLoading(true);
    try {
      const res = await fetch("http://localhost:8080/api/research/history");
      const data = await res.json();
      // collapse by default
      setHistory(data.map((h) => ({ ...h, expanded: false })));
    } catch (err) {
      console.error("Error fetching history:", err);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Summarize or Suggest
  const processText = async (op) => {
    setLoading(true);
    setOperation(op);
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
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
      setText(data);
    } catch (err) {
      setText("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Save notes to Chrome storage
  const saveNotes = () => {
    chrome.storage.local.set({ researchNotes: notes }, () => {
      alert("Notes saved successfully!");
    });
  };

  // Copy result
  const copyResult = () => {
    const plainText = text.replace(/<br>/g, "\n");
    navigator.clipboard.writeText(plainText).then(() => {
      setCopyStatus("done");
      setTimeout(() => setCopyStatus("copy"), 1500);
    });
  };

  // Expand/collapse a single history item
  const toggleHistoryItem = (id) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, expanded: !item.expanded }
          : { ...item, expanded: false }
      )
    );
  };

  return (
    <div className="container">
      {/* === Header === */}
      <div className="header">
        <h2>Summary AI: Research Assistant</h2>
      </div>

      {/* === Results Section === */}
      <div className="results-wrapper">
        <div id="results" className={!text ? "empty" : ""}>
          {!text ? (
            <span className="placeholder-text">Select text from browser</span>
          ) : (
            <div className="result-item result-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </div>
          )}
          {loading && <div className="loader"></div>}
        </div>

        {/* Copy button connected to result box */}
        <button id="copyBtn" onClick={copyResult}>
          {copyStatus}
        </button>
      </div>

      {/* === Action Buttons === */}
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

      {/* === History Section === */}
      <div className="history-container">
        <div className="history-header" onClick={fetchHistory}>
          <h3>History</h3>
          <span className={`arrow ${historyOpen ? "open" : ""}`}>▼</span>
        </div>

        <div className={`history-overlay ${historyOpen ? "open" : ""}`}>
          <div className="history-inner">
            {historyLoading ? (
              <p className="history-status">Loading...</p>
            ) : history.length > 0 ? (
              <ul className="history-list">
                {history.map((item) => (
                  <li
                    key={item.id}
                    className={`history-item ${
                      item.expanded ? "expanded" : ""
                    }`}
                    onClick={() => toggleHistoryItem(item.id)}
                  >
                    {/* Always show a clean title */}
                    <div className="history-title">
                      🗂 <strong>{item.content.slice(0, 60)}...</strong>
                    </div>

                    {/* Show details only when expanded */}
                    {item.expanded && (
                      <>
                        <div className="history-op">
                          Operation: {item.operation}
                        </div>

                        <div className="history-response markdown-output">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {item.response}
                          </ReactMarkdown>
                        </div>

                        <div className="history-time">
                          🕒 {new Date(item.createdAt).toLocaleString("en-IN")}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="history-status">No history available</p>
            )}
          </div>
        </div>
      </div>

      {/* === Notes Section === */}
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
