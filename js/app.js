document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generatePdf')
          .addEventListener('click', generatePdf);
});

function generatePdf() {
  const { jsPDF } = window.jspdf;
  const contratoEl = document.getElementById('contrato');

  contratoEl.classList.add('pdf-mode');

  html2canvas(contratoEl, {
    scale: 2,
    useCORS: true,
    scrollX: 0,
    scrollY: 0
  }).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
    const imgWidth = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    const name  = document.querySelector('.datos .row:nth-child(1) .editable').textContent.trim();
    const event = document.querySelector('.datos .row:nth-child(3) .editable').textContent.trim();
    const fileName = `Contrato_${name.replace(/ /g,'_')}_${event.replace(/ /g,'_')}.pdf`;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(fileName);
  }).finally(() => {
    contratoEl.classList.remove('pdf-mode');
  });
}
