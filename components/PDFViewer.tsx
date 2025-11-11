'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RefreshCcw,
  Maximize2,
  Minimize2,
} from 'lucide-react';

// ✅ Use local worker file
pdfjs.GlobalWorkerOptions.workerSrc = '/pdfjs/pdf.worker.min.mjs';
console.log('Worker src:', pdfjs.GlobalWorkerOptions.workerSrc);


interface PDFViewerProps {
  fileUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ fileUrl }) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);
  const [fitToWidth, setFitToWidth] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // ✅ Memoize PDF file to avoid re-parsing
  const memoizedFile = useMemo(() => ({ url: fileUrl }), [fileUrl]);

  // ✅ Handle PDF load
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  // ✅ Handle PDF load errors
  const onDocumentLoadError = (err: Error) => {
    if (err?.message?.includes('AbortException')) return; // ignore benign warning
    console.error('PDF load error:', err);
  };

  // ✅ Pagination
  const nextPage = useCallback(() => {
    if (numPages && pageNumber < numPages) setPageNumber((prev) => prev + 1);
  }, [numPages, pageNumber]);

  const prevPage = useCallback(() => {
    if (pageNumber > 1) setPageNumber((prev) => prev - 1);
  }, [pageNumber]);

  // ✅ Zoom Controls
  const zoomIn = useCallback(() => setScale((prev) => Math.min(prev + 0.2, 3)), []);
  const zoomOut = useCallback(() => setScale((prev) => Math.max(prev - 0.2, 0.6)), []);
  const resetZoom = useCallback(() => setScale(1.2), []);

  // ✅ Fit-to-width responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (fitToWidth && containerRef.current) {
        const width = containerRef.current.clientWidth * 0.95;
        setScale(width / 800);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitToWidth]);

  // ✅ Browser fullscreen (real fullscreen, not overlay)
  const toggleFullscreen = useCallback(() => {
    const elem = containerRef.current;
    if (!elem) return;

    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => console.error('Fullscreen error:', err));
    } else {
      document.exitFullscreen();
    }
  }, []);

  // ✅ Track fullscreen changes for icon state
  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // ✅ Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          nextPage();
          break;
        case 'ArrowLeft':
          prevPage();
          break;
        case '+':
        case '=':
          zoomIn();
          break;
        case '-':
          zoomOut();
          break;
        case '0':
          resetZoom();
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextPage, prevPage, zoomIn, zoomOut, resetZoom, toggleFullscreen]);

  return (
    <div
      ref={containerRef}
      className="w-[90%] mx-auto max-w-[950px] rounded-xl overflow-hidden shadow-2xl transition-all duration-300 bg-linear-to-br from-[#fdf9f3] to-[#f3eadc] dark:from-[#241b15] dark:to-[#2f261f]"
    >
      {/* Toolbar */}
      <div className="flex justify-between items-center bg-[#f0e6da] dark:bg-[#3a2f27] px-5 py-3 border-b border-[#d8cbb6] dark:border-[#4b3f35]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFitToWidth((prev) => !prev)}
            className="px-3 py-1 text-sm font-medium rounded bg-[#5a4634] text-[#f8efe1] hover:bg-[#6b5240] transition"
          >
            {fitToWidth ? 'Fixed Zoom' : 'Fit to Width'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="p-2 rounded-lg hover:bg-[#e0d2c2] dark:hover:bg-[#4b3f35] transition"
            title="Zoom Out (-)"
          >
            <ZoomOut className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
          </button>
          <button
            onClick={resetZoom}
            className="p-2 rounded-lg hover:bg-[#e0d2c2] dark:hover:bg-[#4b3f35] transition"
            title="Reset Zoom (0)"
          >
            <RefreshCcw className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
          </button>
          <button
            onClick={zoomIn}
            className="p-2 rounded-lg hover:bg-[#e0d2c2] dark:hover:bg-[#4b3f35] transition"
            title="Zoom In (+)"
          >
            <ZoomIn className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-[#e0d2c2] dark:hover:bg-[#4b3f35] transition"
            title="Toggle Fullscreen (F)"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
            ) : (
              <Maximize2 className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
            )}
          </button>
        </div>
      </div>

      {/* PDF Display */}
      <div
        id="pdf-container"
        className="flex justify-center overflow-y-auto max-h-[80vh] bg-white dark:bg-[#2a211b] transition-all duration-300"
      >
        <Document
          file={memoizedFile}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
          />
        </Document>
      </div>

      {/* Pagination */}
      {numPages && (
        <div className="flex items-center justify-center gap-6 py-4 bg-[#f0e6da] dark:bg-[#3a2f27] border-t border-[#d8cbb6] dark:border-[#4b3f35]">
          <button
            onClick={prevPage}
            disabled={pageNumber <= 1}
            className="p-2 rounded-full bg-[#f0e6da] dark:bg-[#3a2f27] hover:scale-110 active:scale-95 disabled:opacity-40 transition-all duration-200"
          >
            <ChevronLeft className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
          </button>

          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Page {pageNumber} of {numPages}
          </span>

          <button
            onClick={nextPage}
            disabled={pageNumber >= numPages}
            className="p-2 rounded-full bg-[#f0e6da] dark:bg-[#3a2f27] hover:scale-110 active:scale-95 disabled:opacity-40 transition-all duration-200"
          >
            <ChevronRight className="w-5 h-5 text-[#5a4634] dark:text-[#e5d6b8]" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
