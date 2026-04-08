import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function UploadReport() {
    const navigate = useNavigate();
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setResult(null);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setResult(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("http://localhost:8000/predict", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();

            // Map backend response to UI expected structure
            setResult({
                annotated_image: data.annotated_image_base64,
                result: data.diagnosis,
                confidence: data.detailed_scores,
                detections: data.detection_confidence ? [{ class: 'Stone', confidence: data.detection_confidence }] : []
            });
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Failed to analyze report. Please ensure the backend server is running.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-cream-bg min-h-screen pb-40 font-sans">
            <header className="sticky top-0 z-40 bg-slate-900 text-cream-50 pt-12 pb-6 px-6 shadow-lg rounded-b-3xl mb-6">
                <div className="flex items-center justify-between">
                    <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-800 transition-colors">
                        <span className="material-symbols-outlined text-champagne-400">arrow_back_ios_new</span>
                    </button>
                    <h1 className="font-display text-xl tracking-wide text-cream-50">Upload Medical Scan</h1>
                    <div className="w-8"></div>
                </div>
            </header>

            <main className="px-6 space-y-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div
                        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-colors ${dragActive ? 'border-gold-primary bg-gold-primary/5' : 'border-slate-300 bg-white'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            onChange={handleChange}
                            accept=".jpg,.jpeg,.png,.pdf"
                        />

                        <div className="flex flex-col items-center gap-3">
                            <div className="w-16 h-16 bg-cream-100 rounded-full flex items-center justify-center text-gold-primary">
                                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                            </div>
                            <div>
                                {file ? (
                                    <p className="text-slate-800 font-bold">{file.name}</p>
                                ) : (
                                    <>
                                        <p className="text-slate-800 font-bold text-lg">Tap to Upload</p>
                                        <p className="text-slate-500 text-sm mt-1"> Kidney Stone X-Ray, CT Scan, or Sonography</p>
                                        <p className="text-slate-400 text-xs mt-4">JPG, PNG, PDF up to 10MB</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={!file || loading}
                        className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                <span>Analyzing...</span>
                            </>
                        ) : (
                            <>
                                <span>Analyze Scan</span>
                                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                            </>
                        )}
                    </button>
                </form>

                {/* Result Display */}
                {result && (
                    <div className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-md animate-fade-in mb-8">
                        <h3 className="bg-slate-50 px-6 py-4 text-lg font-bold text-slate-900 border-b border-stone-100">Analysis Result</h3>

                        <div className="p-6 space-y-6">
                            {/* Annotated Image */}
                            {result.annotated_image && (
                                <div className="rounded-lg overflow-hidden border border-stone-200 shadow-inner">
                                    <img src={result.annotated_image} alt="Analyzed Scan" className="w-full h-auto" />
                                </div>
                            )}

                            <div className="flex items-center justify-between">
                                <span className="text-slate-500 font-medium">Prediction</span>
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider ${result.result === 'Normal' ? 'bg-green-100 text-green-700' :
                                    result.result === 'Stone' ? 'bg-red-100 text-red-700' :
                                        'bg-yellow-100 text-yellow-700'
                                    }`}>
                                    {result.result}
                                </span>
                            </div>

                            {result.detections && result.detections.length > 0 && (
                                <div className="space-y-2">
                                    <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Detected Objects</p>
                                    {result.detections.map((det, idx) => (
                                        <div key={idx} className="flex justify-between text-sm bg-slate-50 p-2 rounded">
                                            <span className="font-medium text-slate-700">{det.class}</span>
                                            <span className="font-mono text-slate-500">{(det.confidence * 100).toFixed(1)}%</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="space-y-2 pt-4 border-t border-stone-100">
                                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Model Confidence Details</p>
                                {Object.entries(result.confidence || {}).map(([key, val]) => (
                                    <div key={key} className="flex items-center justify-between text-sm">
                                        <span className="text-slate-600">{key}</span>
                                        <span className="font-mono text-slate-800">{(parseFloat(val) * 100).toFixed(1)}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Clinical Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800 flex gap-3 items-start">
                    <span className="material-symbols-outlined text-amber-600 shrink-0">warning</span>
                    <p>
                        <strong>Disclaimer:</strong> This system is for academic and research purposes only.
                        It is not intended for clinical diagnosis. Please consult a qualified medical professional for health advice.
                    </p>
                </div>
            </main>
        </div>
    );
}
