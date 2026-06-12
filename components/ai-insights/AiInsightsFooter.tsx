type AiInsightsFooterProps = {
  classTitle: string;
};

export default function AiInsightsFooter({
  classTitle,
}: AiInsightsFooterProps) {
  return (
    <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 py-8 text-xs text-gray-400 md:flex-row">
      <p>
        © 2024 Academic Curator Platform. {classTitle} Cohort Alpha Intelligence
        Report.
      </p>
      <div className="flex gap-6 font-semibold">
        <a href="#" className="hover:text-indigo-600">
          Data Privacy
        </a>
        <a href="#" className="hover:text-indigo-600">
          AI Ethics Statement
        </a>
        <a href="#" className="hover:text-indigo-600">
          Model Transparency
        </a>
      </div>
    </footer>
  );
}
