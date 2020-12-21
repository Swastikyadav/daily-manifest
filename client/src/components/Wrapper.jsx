import React from "react";

function Wrapper({ children }) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          { children }
        </div>
      </div>
    </main>
  );
}

export default Wrapper;