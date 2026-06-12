export default function LecturerCreateExamPage() {
    return (
      <div className="mx-auto max-w-5xl">
        {/* Page Header */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create Exam</h1>
          <p className="text-slate-500 mt-1">Configure your academic assessment criteria</p>
        </header>
  
        {/* Form Section */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <form className="space-y-8">
            {/* Top Row Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Subject Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <select className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-indigo-200 transition-all">
                    <option defaultValue="advanced-math">Advanced Mathematics</option>
                    <option>Database Fundamentals</option>
                    <option>Object-Oriented Programming</option>
                    <option>Macroeconomics</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <span className="material-symbols-outlined text-slate-400">expand_more</span>
                  </div>
                </div>
              </div>
  
              {/* Exam Code */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Exam Code
                </label>
                <input
                  className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-200 transition-all placeholder:text-slate-400"
                  placeholder="e.g. CS101-FINAL-2024"
                  type="text"
                />
              </div>
            </div>
  
            {/* Secondary Row: Numbers & Difficulty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Question Counter (static UI for now) */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Number of Questions
                </label>
                <div className="flex items-center h-12">
                  <button
                    className="h-full px-4 bg-slate-100 hover:bg-slate-200 hover:text-indigo-600 transition-colors rounded-l-lg border-r border-white flex items-center"
                    type="button"
                    aria-label="Decrease"
                  >
                    <span className="material-symbols-outlined text-lg">remove</span>
                  </button>
  
                  <div className="h-full flex-grow bg-slate-100 flex items-center justify-center font-bold text-lg text-indigo-600">
                    40
                  </div>
  
                  <button
                    className="h-full px-4 bg-slate-100 hover:bg-slate-200 hover:text-indigo-600 transition-colors rounded-r-lg border-l border-white flex items-center"
                    type="button"
                    aria-label="Increase"
                  >
                    <span className="material-symbols-outlined text-lg">add</span>
                  </button>
                </div>
              </div>
  
              {/* Difficulty Segmented (static UI for now) */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Difficulty
                </label>
                <div className="grid grid-cols-3 p-1 bg-slate-100 rounded-lg h-12">
                  <button
                    className="rounded-md flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-white/60 transition-all"
                    type="button"
                  >
                    Easy
                  </button>
                  <button
                    className="bg-white rounded-md flex items-center justify-center text-sm font-bold text-indigo-600 shadow-sm ring-1 ring-slate-100"
                    type="button"
                  >
                    Medium
                  </button>
                  <button
                    className="rounded-md flex items-center justify-center text-sm font-medium text-slate-600 hover:bg-white/60 transition-all"
                    type="button"
                  >
                    Hard
                  </button>
                </div>
              </div>
            </div>
  
            {/* Textarea Content */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
                  Question Content
                  <button
                    className="p-1 hover:bg-indigo-50 rounded-full transition-colors text-indigo-600"
                    type="button"
                    aria-label="Upload file"
                  >
                    <span className="material-symbols-outlined text-base">upload_file</span>
                  </button>
                </label>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                  Markdown Supported
                </span>
              </div>
  
              <textarea
                className="w-full bg-slate-100 border-none rounded-xl px-6 py-5 focus:ring-2 focus:ring-indigo-200 transition-all placeholder:text-slate-400 resize-none"
                placeholder="Enter questions here or upload a file..."
                rows={8}
              />
            </div>
  
            {/* Pro Tip Card */}
            <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100/60 flex gap-4">
              <span
                className="material-symbols-outlined text-indigo-600"
                style={{ fontVariationSettings: "'FILL' 1" } as any}
              >
                lightbulb
              </span>
              <p className="text-sm text-indigo-900 leading-relaxed">
                <strong className="font-bold">Pro Tip:</strong> Our AI curator can automatically
                generate balanced question sets based on your subject selection and difficulty.
              </p>
            </div>
  
            {/* Actions */}
            <div className="flex justify-end items-center gap-4 pt-4">
              <button
                className="px-8 py-3 rounded-full text-slate-500 font-semibold hover:bg-slate-100 transition-colors"
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-12 py-3 rounded-full bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-200 transition-transform active:scale-95"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
  
        {/* Info Columns Footer */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-slate-100 pt-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Automated Scoring</h4>
            <p className="text-xs text-slate-500 px-4">
              Instant results processing for objective assessments.
            </p>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <span className="material-symbols-outlined">security</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Proctoring Ready</h4>
            <p className="text-xs text-slate-500 px-4">
              Built-in anti-cheat measures and environmental monitoring.
            </p>
          </div>
  
          <div className="flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h4 className="font-bold text-sm text-slate-900 mb-2">Smart Scheduling</h4>
            <p className="text-xs text-slate-500 px-4">
              Coordinate exam slots and notifications automatically.
            </p>
          </div>
        </div>
      </div>
    )
  }