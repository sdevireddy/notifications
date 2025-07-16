export const Section = ({ title, icon, children }) => (
  <div className="mb-4 rounded border p-4">
    <h3 className="mb-4 flex items-center gap-2 border-b pb-1 text-lg font-semibold">
      {icon} {title}
    </h3>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{children}</div>
  </div>
);