import React, { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_URL;

function LogApp() {
  const [loading, setLoading] = useState(false);
  const [previewData, setPreviewData] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const processFile = async (file) => {
    if (!file || !file.name.endsWith(".csv")) {
      alert("Please upload a valid CSV file.");
      return;
    }

    setFileName(file.name);
    setPreviewData([]);
    setDownloadUrl(null);
    
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/classify/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        setDownloadUrl(window.URL.createObjectURL(blob));

        const text = await blob.text();
        // REMOVED .slice(0, 6) to show ALL data
        const rows = text.split('\n').filter(r => r.trim() !== "");
        setPreviewData(rows.map(row => row.split(',')));
      } else {
        alert("Upload failed. Ensure CSV has 'source' and 'log_message' columns.");
      }
    } catch (err) {
      alert("Backend server is offline.");
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => { setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    processFile(file);
  };

  return (
    <div style={styles.container}>
      {/* INJECTING ANIMATIONS */}
      <style>
        {`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
          @keyframes slideIn { from { width: 0%; } to { width: 100%; } }
          .animate-fade { animation: fadeIn 0.6s ease-out forwards; }
          .animate-pulse { animation: pulse 1.5s infinite ease-in-out; }
        `}
      </style>

      <div style={styles.card} className="animate-fade">
        <h1 style={styles.title}>Log Classification System <span style={{fontSize: '0.8rem', color: '#64748b'}}>GenAI Edition</span></h1>
        
        <div 
          style={{
            ...styles.dropZone,
            borderColor: isDragging ? '#10b981' : '#334155',
            backgroundColor: isDragging ? '#1e293b' : '#0f172a',
            transform: isDragging ? 'scale(1.02)' : 'scale(1)'
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div style={styles.icon} className={isDragging ? "animate-pulse" : ""}>
            {loading ? "⚙️" : "📥"}
          </div>
          <p style={styles.uploadText}>
            {fileName ? `Target: ${fileName}` : "Drag & Drop CSV Logs"}
          </p>
          {!loading && (
            <>
              <p style={{color: '#64748b', fontSize: '12px', marginBottom: '15px'}}>or</p>
              <label style={styles.browseBtn}>
                Browse File
                <input type="file" onChange={(e) => processFile(e.target.files[0])} accept=".csv" style={styles.hiddenInput} />
              </label>
            </>
          )}
        </div>

        {loading && (
          <div style={styles.loader} className="animate-pulse">
            <div style={{marginBottom: '10px'}}>🚀 Analyzing your log patterns...</div>
            <div style={{height: '4px', width: '100%', backgroundColor: '#334155', borderRadius: '10px', overflow: 'hidden'}}>
               <div style={{height: '100%', backgroundColor: '#10b981', animation: 'slideIn 3s linear infinite'}}></div>
            </div>
          </div>
        )}

        {previewData.length > 0 && (
          <div style={styles.previewSection} className="animate-fade">
            <div style={styles.headerRow}>
              <h3 style={styles.sectionTitle}>Final Classification Output ({previewData.length - 1} Rows)</h3>
              <a href={downloadUrl} download={`classified_${fileName}`} style={styles.downloadBtn}>
                Download Full CSV
              </a>
            </div>
            
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    {previewData[0].map((header, i) => (
                      <th key={i} style={styles.th}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.slice(1).map((row, i) => (
                    <tr key={i} style={{backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)'}}>
                      {row.map((cell, j) => (
                        <td key={j} style={styles.td}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#020617', display: 'flex', justifyContent: 'center', padding: '40px', fontFamily: 'Inter, system-ui, sans-serif' },
  card: { backgroundColor: '#0f172a', padding: '40px', borderRadius: '24px', width: '100%', maxWidth: '1000px', textAlign: 'center', color: 'white', border: '1px solid #1e293b', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' },
  title: { color: '#f8fafc', marginBottom: '30px', fontSize: '2.2rem', fontWeight: '800' },
  dropZone: { border: '2px dashed', padding: '50px', borderRadius: '20px', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  icon: { fontSize: '50px', marginBottom: '15px', transition: 'transform 0.3s ease' },
  hiddenInput: { display: 'none' },
  uploadText: { fontSize: '18px', color: '#f1f5f9', fontWeight: '600', marginBottom: '5px' },
  browseBtn: { backgroundColor: '#10b981', color: 'white', padding: '12px 30px', borderRadius: '8px', cursor: 'pointer', fontSize: '15px', fontWeight: '700', transition: '0.3s', boxShadow: '0 4px 14px 0 rgba(16, 185, 129, 0.39)' },
  loader: { color: '#10b981', margin: '30px 0', fontSize: '1.1rem', textAlign: 'center' },
  previewSection: { marginTop: '40px', textAlign: 'left' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  sectionTitle: { color: '#f1f5f9', fontSize: '20px', fontWeight: '700' },
  tableWrapper: { overflowX: 'auto', backgroundColor: '#020617', borderRadius: '12px', border: '1px solid #1e293b', maxHeight: '500px' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '14px' },
  th: { borderBottom: '1px solid #1e293b', padding: '16px', textAlign: 'left', color: '#10b981', backgroundColor: '#0f172a', position: 'sticky', top: 0 },
  td: { padding: '14px', borderBottom: '1px solid #0f172a', color: '#94a3b8' },
  downloadBtn: { backgroundColor: '#ffffff', color: '#020617', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: '800', transition: '0.2s' }
};

export default LogApp;