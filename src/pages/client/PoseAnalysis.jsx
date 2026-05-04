import React, { useState, useRef } from 'react';
import { ClientLayout } from './Sessions';
import { useYMove } from '../../hooks/useYMove';
import { Upload, Video, Activity, AlertCircle, CheckCircle, Info, ArrowRight, BrainCircuit, Target, Wrench } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const ClientPoseAnalysis = () => {
  const { analyzePosture, loading } = useYMove();
  const fileInputRef = useRef(null);
  
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [instructions, setInstructions] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB limit to prevent browser crash

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setErrorMsg('');
    
    if (selected) {
      if (selected.size > MAX_FILE_SIZE) {
        setErrorMsg('File is too large. Please upload a video under 50MB.');
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      if (!selected.type.startsWith('video/')) {
        setErrorMsg('Please upload a valid video file.');
        setFile(null);
        setPreviewUrl(null);
        return;
      }
      setFile(selected);
      setPreviewUrl(URL.createObjectURL(selected));
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // reader.result looks like "data:video/mp4;base64,AAAAHGZ0eXBtcDQ..."
        // We only want the base64 data part.
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file || !exerciseName) {
      setErrorMsg('Please provide a video and specify the exercise name.');
      return;
    }

    try {
      setErrorMsg('');
      setAnalysisResult(null);
      
      const base64Data = await convertFileToBase64(file);
      const result = await analyzePosture(base64Data, exerciseName, instructions);
      
      if (result) {
        setAnalysisResult(result);
      } else {
        setErrorMsg('Failed to analyze the video. Please try again.');
      }
    } catch (err) {
      setErrorMsg('An error occurred during analysis.');
      console.error(err);
    }
  };

  return (
    <ClientLayout activePath="/client/pose-analysis" fullWidth={true}>
      <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8">
        
        <div className="bg-card border rounded-md p-6 fade-in text-center">
          <Activity className="mx-auto text-accent-primary mb-4" size={56} />
          <h2 className="text-3xl font-bold mb-3">AI Pose Analysis</h2>
          <p className="text-secondary max-w-3xl mx-auto text-lg">
            Upload a video of your workout. Our AI will analyze your form, identify mistakes, and provide actionable feedback to improve your technique and prevent injuries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Upload Form */}
          <div className="bg-card border rounded-xl p-8 fade-in lg:col-span-5 shadow-lg flex flex-col h-fit">
            <h3 className="text-2xl mb-6 font-bold">Upload Video</h3>
            <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
              
              <div 
                className="upload-zone border-2 border-dashed rounded-md p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-colors hover:border-accent-primary bg-sidebar"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="video/*" 
                  className="hidden" 
                />
                {previewUrl ? (
                  <video src={previewUrl} className="max-h-48 rounded-md mb-4" controls />
                ) : (
                  <>
                    <Upload className="text-secondary mb-2" size={32} />
                    <p className="font-medium">Click to upload video</p>
                    <p className="text-xs text-secondary mt-1">MP4, WebM (Max 50MB)</p>
                  </>
                )}
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-md flex gap-2 items-center text-sm">
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-sm text-secondary mb-1">Exercise Name (Required)</label>
                <input 
                  type="text" 
                  placeholder="e.g., Barbell Squat, Deadlift" 
                  className="w-full bg-sidebar border rounded-md p-3"
                  value={exerciseName}
                  onChange={(e) => setExerciseName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-secondary mb-1">Specific Instructions/Focus (Optional)</label>
                <textarea 
                  placeholder="e.g., 'Watch my lower back rounding' or 'Is my depth sufficient?'" 
                  className="w-full bg-sidebar border rounded-md p-3 min-h-[100px] resize-none"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={loading || !file || !exerciseName} className="w-full h-12 mt-2">
                {loading ? 'Analyzing Form (This may take a minute)...' : 'Analyze Form'}
              </Button>
            </form>
          </div>

          {/* Results Area */}
          <div className="bg-card border rounded-xl p-8 fade-in lg:col-span-7 shadow-lg flex flex-col min-h-[600px]">
            <h3 className="text-2xl mb-6 font-bold flex items-center gap-3">
              <BrainCircuit className="text-accent-primary" size={28} /> AI Analysis Report
            </h3>
            
            <div className="flex-1 overflow-y-auto max-h-[800px] custom-scrollbar pr-4">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-secondary min-h-[400px]">
                  <div className="loader mb-6"></div>
                  <p className="text-lg font-medium text-white mb-2">Analyzing Biomechanics...</p>
                  <p className="text-sm text-center max-w-sm">Processing joint angles, velocity, and movement patterns frame by frame.</p>
                </div>
              ) : analysisResult && analysisResult.data ? (
                <div className="analysis-content space-y-8 pb-4">
                  
                  {/* Score Dashboard */}
                  <div className="flex items-center gap-6 bg-gradient-to-br from-sidebar to-card p-6 rounded-xl border shadow-inner">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-700"
                          strokeWidth="3"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className={`${
                            analysisResult.data.score >= 80 ? 'text-green-500' :
                            analysisResult.data.score >= 60 ? 'text-yellow-500' : 'text-red-500'
                          }`}
                          strokeDasharray={`${analysisResult.data.score}, 100`}
                          strokeWidth="3"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="none"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-2xl font-bold">{analysisResult.data.score}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold mb-1">Overall Form Score</h4>
                      <p className="text-secondary text-base leading-relaxed max-w-md">
                        {analysisResult.data.score >= 80 ? 'Great form! Only minor adjustments needed.' :
                         analysisResult.data.score >= 60 ? 'Good effort, but there are some critical areas to improve.' : 
                         'Needs significant correction to prevent injury and maximize gains.'}
                      </p>
                    </div>
                  </div>

                  {/* Coach Summary */}
                  <div className="relative p-8 rounded-xl border-2 border-accent-primary/30 bg-accent-primary/5 mt-4">
                    <div className="absolute -top-4 left-6 bg-card px-4 py-1 rounded-full text-accent-primary font-bold text-sm uppercase tracking-wider flex items-center gap-2 border border-accent-primary/30 shadow-md">
                      <Target size={18} /> Coach's Notes
                    </div>
                    <p className="text-lg leading-relaxed text-gray-200 mt-2 font-medium">
                      {analysisResult.data.summary}
                    </p>
                  </div>

                  {/* Detailed Issues */}
                  {analysisResult.data.issues && analysisResult.data.issues.length > 0 ? (
                    <div className="mt-8">
                      <h4 className="font-bold text-2xl mb-6 flex items-center gap-3">
                        <Wrench size={28} className="text-secondary" /> Action Items ({analysisResult.data.issues.length})
                      </h4>
                      <div className="space-y-6">
                        {analysisResult.data.issues.map((issue, idx) => {
                          const isSevere = issue.severity === 'severe';
                          const isMod = issue.severity === 'moderate';
                          
                          return (
                            <div key={idx} className={`border rounded-xl overflow-hidden transition-all hover:shadow-md ${
                              isSevere ? 'border-red-500/30 bg-red-500/5' :
                              isMod ? 'border-yellow-500/30 bg-yellow-500/5' :
                              'border-blue-500/30 bg-blue-500/5'
                            }`}>
                              <div className="p-5 border-b border-black/20 flex justify-between items-center bg-black/10">
                                <h5 className="font-bold text-xl capitalize flex items-center gap-3">
                                  {isSevere ? <AlertCircle size={24} className="text-red-500" /> :
                                   isMod ? <AlertCircle size={24} className="text-yellow-500" /> :
                                   <Info size={24} className="text-blue-500" />}
                                  {issue.name.replace(/_/g, ' ')}
                                </h5>
                                <span className={`text-sm px-4 py-1.5 rounded-full font-bold uppercase tracking-wider ${
                                  isSevere ? 'bg-red-500/20 text-red-400' :
                                  isMod ? 'bg-yellow-500/20 text-yellow-400' :
                                  'bg-blue-500/20 text-blue-400'
                                }`}>
                                  {issue.severity}
                                </span>
                              </div>
                              <div className="p-6 space-y-5 text-base">
                                <div>
                                  <span className="text-sm font-bold text-secondary uppercase tracking-wider mb-2 block">Observation</span>
                                  <p className="text-gray-300 leading-relaxed text-base">{issue.description}</p>
                                </div>
                                <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                                  <span className="text-sm font-bold text-accent-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <CheckCircle size={16} /> How to fix
                                  </span>
                                  <p className="text-white leading-relaxed text-base">{issue.how_to_fix}</p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    <div className="p-6 text-center border rounded-xl bg-green-500/10 border-green-500/30">
                      <CheckCircle className="mx-auto text-green-500 mb-2" size={32} />
                      <h4 className="text-green-500 font-bold mb-1">Flawless Form</h4>
                      <p className="text-sm text-green-400/80">No significant issues detected in your movement pattern.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-secondary text-center min-h-[400px]">
                  <Video className="opacity-20 mb-6" size={80} />
                  <p className="text-2xl font-bold mb-2">Waiting for video upload...</p>
                  <p className="text-lg text-secondary mt-2 max-w-sm">Your detailed biomechanical breakdown will appear here after analysis.</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <style>{`
        .bg-card { background-color: var(--bg-card); }
        .bg-sidebar { background-color: var(--bg-color); }
        .bg-red-500\\/10 { background-color: rgba(239, 68, 68, 0.1); }
        .border { border: 1px solid var(--border-color); }
        .border-2 { border-width: 2px; }
        .border-dashed { border-style: dashed; }
        .border-red-500\\/20 { border-color: rgba(239, 68, 68, 0.2); }
        .rounded-md { border-radius: var(--radius-card); }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .p-4 { padding: 1rem; }
        .p-3 { padding: 0.75rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .max-w-\\[1400px\\] { max-width: 1400px; }
        .max-w-3xl { max-width: 48rem; }
        .max-h-48 { max-height: 12rem; }
        .w-full { width: 100%; }
        .h-12 { height: 3rem; }
        .h-full { height: 100%; }
        .min-h-\\[100px\\] { min-height: 100px; }
        .max-h-\\[600px\\] { max-height: 600px; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .flex-1 { flex: 1; }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        @media (min-width: 1024px) {
          .lg\\:grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)); }
          .lg\\:col-span-5 { grid-column: span 5 / span 5; }
          .lg\\:col-span-7 { grid-column: span 7 / span 7; }
        }
        .gap-2 { gap: 0.5rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .text-3xl { font-size: 1.875rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .text-center { text-align: center; }
        .text-secondary { color: var(--text-secondary); }
        .text-accent-primary { color: var(--accent-primary); }
        .text-red-400 { color: #f87171; }
        .block { display: block; }
        .hidden { display: none; }
        .overflow-y-auto { overflow-y: auto; }
        .cursor-pointer { cursor: pointer; }
        .resize-none { resize: none; }
        .transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .hover\\:border-accent-primary:hover { border-color: var(--accent-primary); }
        .opacity-20 { opacity: 0.2; }
        .rounded-xl { border-radius: 0.75rem; }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
        .shadow-inner { box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06); }
        .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--bg-color), var(--bg-card)); }
        .from-sidebar { --tw-gradient-from: var(--bg-color); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(255, 255, 255, 0)); }
        .to-card { --tw-gradient-to: var(--bg-card); }
        .border-accent-primary\\/30 { border-color: rgba(0, 210, 255, 0.3); }
        .bg-accent-primary\\/5 { background-color: rgba(0, 210, 255, 0.05); }
        .text-gray-200 { color: #e5e7eb; }
        .text-gray-300 { color: #d1d5db; }
        .text-gray-700 { color: #374151; }
        .-top-3 { top: -0.75rem; }
        .left-4 { left: 1rem; }
        .tracking-wider { letter-spacing: 0.05em; }
        .uppercase { text-transform: uppercase; }
        .w-24 { width: 6rem; }
        .h-24 { height: 6rem; }
        .flex-shrink-0 { flex-shrink: 0; }
        .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
        .-rotate-90 { --tw-rotate: -90deg; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .border-red-500\\/30 { border-color: rgba(239, 68, 68, 0.3); }
        .bg-red-500\\/5 { background-color: rgba(239, 68, 68, 0.05); }
        .border-yellow-500\\/30 { border-color: rgba(234, 179, 8, 0.3); }
        .bg-yellow-500\\/5 { background-color: rgba(234, 179, 8, 0.05); }
        .border-blue-500\\/30 { border-color: rgba(59, 130, 246, 0.3); }
        .bg-blue-500\\/5 { background-color: rgba(59, 130, 246, 0.05); }
        .bg-black\\/10 { background-color: rgba(0, 0, 0, 0.1); }
        .bg-black\\/20 { background-color: rgba(0, 0, 0, 0.2); }
        .border-black\\/20 { border-color: rgba(0, 0, 0, 0.2); }
        .border-white\\/5 { border-color: rgba(255, 255, 255, 0.05); }
        .hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
        .transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
        .rounded-lg { border-radius: 0.5rem; }
        .pb-4 { padding-bottom: 1rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .max-h-\\[800px\\] { max-height: 800px; }
        .min-h-\\[400px\\] { min-height: 400px; }
        .min-h-\\[600px\\] { min-height: 600px; }
        .h-fit { height: fit-content; }
        .text-3xl { font-size: 1.875rem; }
        .pr-2 { padding-right: 0.5rem; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: var(--bg-card); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--text-secondary); }
      `}</style>
    </ClientLayout>
  );
};
