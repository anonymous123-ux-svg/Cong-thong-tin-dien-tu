import { HelpCircle, LogOut } from "lucide-react";

export default function TaskMemberFooter() {
  return (
    <footer className="mt-12 bg-gray-50 px-6 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="text-center md:text-left">
          <span className="text-lg font-black text-gray-900">
            Advanced Physics
          </span>
          <p className="mt-2 text-sm text-gray-500">
            Curating the frontiers of physical science for the next generation.
          </p>
        </div>

        <div className="flex gap-8">
          <a
            href="#"
            className="flex items-center gap-2 font-medium text-gray-500 transition-colors hover:text-[#2D2DE8]"
          >
            <HelpCircle className="h-4 w-4" />
            Help Center
          </a>
          <a
            href="#"
            className="flex items-center gap-2 font-medium text-gray-500 transition-colors hover:text-red-500"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </a>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-7xl flex-col justify-between gap-4 border-t border-gray-200 pt-8 text-center text-xs font-bold tracking-widest text-gray-400 uppercase md:flex-row md:text-left">
        <span>© 2024 Academic Curator Ecosystem</span>
        <div className="flex justify-center gap-6 md:justify-end">
          <a href="#">Privacy Protocol</a>
          <a href="#">Academic Integrity</a>
          <a href="#">API Access</a>
        </div>
      </div>
    </footer>
  );
}
