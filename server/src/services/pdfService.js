import PDFParser from "pdf2json";

export const parsePDF = (filePath) => {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", (err) => reject(err));

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((t) => {
          t.R.forEach((r) => {
            try {
              text += decodeURIComponent(r.T) + " ";
            } catch {
              text += r.T + " ";
            }
          });
        });
      });

      resolve(text);
    });

    pdfParser.loadPDF(filePath);
  });
};
