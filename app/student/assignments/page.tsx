import Link from "next/link";
import { getStudentAssignments } from "@/lib/actions/student";
import { connection } from "next/server";

export default async function StudentAssignmentsPage() {
  await connection();
  const assignments = await getStudentAssignments();

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-[2rem] bg-slate-900 p-10 text-white shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-indigo-500/20 blur-3xl rounded-full" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">Assignments</h1>
          <p className="text-slate-400 text-lg max-w-xl">
            Keep track of your deadlines and submit your work on time to maintain your academic streak.
          </p>
        </div>
      </div>

      {assignments.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-xl rounded-[2rem] p-16 shadow-sm border border-slate-100 text-center">
          <span className="material-symbols-outlined text-indigo-300 text-7xl mb-6">
            assignment_turned_in
          </span>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">No pending assignments</h2>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">You are all caught up! Enjoy your free time or review your course materials.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assignments.map((assignment, idx) => {
            const isDueSoon = new Date(assignment.dueDate).getTime() - Date.now() < 3 * 24 * 60 * 60 * 1000;
            return (
              <div 
                key={assignment.id} 
                className="group relative bg-white rounded-[1.5rem] p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    <span className="material-symbols-outlined text-2xl">assignment</span>
                  </div>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${isDueSoon ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"}`}>
                    {isDueSoon ? "Due Soon" : "Pending"}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
                  {assignment.title}
                </h3>
                
                <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                  <span className="material-symbols-outlined text-base">schedule</span>
                  <span className="font-medium">Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <Link 
                    href={`/student/assignments/${assignment.id}`} 
                    className="flex items-center justify-between w-full text-indigo-600 font-bold group/btn"
                  >
                    <span>View Details</span>
                    <span className="material-symbols-outlined bg-indigo-50 w-8 h-8 rounded-full flex items-center justify-center group-hover/btn:bg-indigo-600 group-hover/btn:text-white transition-all">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
