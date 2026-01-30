import React from 'react';
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown, FileText, BarChart } from 'lucide-react';
import toast from 'react-hot-toast'; // Import toast

const Reports = () => {
  const generatePDF = () => {
    const loadToast = toast.loading("Generating Enterprise Report...");
    
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("InsurAI Global - System Report", 14, 22);
      
      const tableColumn = ["Report ID", "Category", "Metric", "Status"];
      const tableRows = [
        ["RPT-001", "Health", "120 Active Policies", "Stable"],
        ["RPT-002", "Finance", "$124,500 Revenue", "Growth"],
      ];

      autoTable(doc, {
        startY: 30,
        head: [tableColumn],
        body: tableRows,
        headStyles: { fillColor: [13, 110, 253] }
      });
      
      doc.save("InsurAI_System_Report.pdf");
      
      // Success Feedback
      toast.success("Report downloaded successfully!", { id: loadToast });
    } catch (error) {
      toast.error("Failed to generate report.");
    }
  };

  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Reports & Analytics</h2>
        <button onClick={generatePDF} className="btn btn-dark d-flex align-items-center gap-2 shadow-sm">
          <FileDown size={18} /> Export as PDF
        </button>
      </div>

      <div className="row g-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 text-center">
            <div className="bg-soft-primary p-3 rounded-circle d-inline-block mb-3 mx-auto">
              <BarChart size={32} className="text-primary" />
            </div>
            <h5 className="fw-bold">System Performance</h5>
            <p className="text-muted small">Real-time audit logs and system health metrics.</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-0 shadow-sm p-4 text-center">
            <div className="bg-soft-success p-3 rounded-circle d-inline-block mb-3 mx-auto">
              <FileText size={32} className="text-success" />
            </div>
            <h5 className="fw-bold">Financial Summary</h5>
            <p className="text-muted small">Detailed breakdown of revenue and claims.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;