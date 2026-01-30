import html2pdf from 'html2pdf.js';

export const handleDownloadPDF = (elementId, filename) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const options = {
    margin: 10,
    filename: `${filename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'landscape' }
  };

  html2pdf().from(element).set(options).save();
};