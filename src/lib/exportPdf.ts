import { jsPDF } from "jspdf";
import { toPng } from "html-to-image";

export async function exportCVToPDF(input: HTMLDivElement, fileName: string) {
  // Define A4 dimensions
  const pdfWidth = 595.28;
  const pdfHeight = 841.89;
  const margin = 15;

  const contentPrintableWidth = pdfWidth - 2 * margin;
  const contentPrintableHeight = pdfHeight - 2 * margin;

  // Store original styles to revert later
  const originalStyleWidth = input.style.width;
  const originalStyleMargin = input.style.margin;
  const originalStyleBoxSizing = input.style.boxSizing;
  const originalStyleOverflow = input.style.overflow;
  const originalStylePosition = input.style.position;
  const originalStyleTop = input.style.top;
  const originalStyleTransform = input.style.transform;
  const scale = 1.5;

  // Apply temporary styles for consistent capture
  input.style.width = `${794}px`;
  input.style.margin = "0";
  input.style.boxSizing = "border-box";
  input.style.overflow = "visible";
  input.style.position = "relative";

  try {
    // Capture the full content, including any overflow, by using scrollWidth/scrollHeight
    const dataUrl = await toPng(input, {
      quality: 0.92,
      width: input.scrollWidth * scale,
      height: input.scrollHeight * scale,
      style: {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${input.scrollWidth}px`,
        height: `${input.scrollHeight}px`,
      },
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve) => {
      img.onload = resolve;
    });

    const imgWidth = img.width;
    const imgHeight = img.height;

    // Calculate scaling factor from captured image pixels to PDF points based on width
    const scaleFactorPxToPt = contentPrintableWidth / imgWidth;

    let currentSourceYPx = 0;
    let pageNum = 0;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    while (currentSourceYPx < imgHeight) {
      if (pageNum > 0) {
        pdf.addPage();
      }

      // Calculate the height of the slice from the original image in pixels
      const sourceSliceHeightPx = Math.min(
        imgHeight - currentSourceYPx,
        contentPrintableHeight / scaleFactorPxToPt
      );

      // Create a canvas to crop the image slice
      const canvas = document.createElement("canvas");
      canvas.width = imgWidth;
      canvas.height = sourceSliceHeightPx;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(
          img,
          0,
          currentSourceYPx,
          imgWidth,
          sourceSliceHeightPx,
          0,
          0,
          imgWidth,
          sourceSliceHeightPx
        );
      }
      const sliceDataUrl = canvas.toDataURL("image/png");

      // Calculate the height of the slice on the PDF page in points
      const destSliceHeightPt = sourceSliceHeightPx * scaleFactorPxToPt;

      // Add the cropped image slice to the current PDF page
      pdf.addImage(
        sliceDataUrl,
        "PNG",
        margin,
        margin,
        contentPrintableWidth,
        destSliceHeightPt
      );

      currentSourceYPx += sourceSliceHeightPx;
      pageNum++;
    }
    pdf.save(fileName);
  } finally {
    // Revert original styles
    input.style.width = originalStyleWidth;
    input.style.margin = originalStyleMargin;
    input.style.boxSizing = originalStyleBoxSizing;
    input.style.overflow = originalStyleOverflow;
    input.style.position = originalStylePosition;
    input.style.top = originalStyleTop;
    input.style.transform = originalStyleTransform;
  }
}
