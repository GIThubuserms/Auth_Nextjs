import React from 'react';

type PageProps = {
  params: { id: string };
};

const Page: React.FC<PageProps> = ({ params }) => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col justify-center items-center p-4 rounded-lg shadow-lg bg-white">
        <h1 className="text-slate-700 text-2xl font-semibold">{params.id}</h1>
      </div>
    </div>
  );
};

export default Page;
