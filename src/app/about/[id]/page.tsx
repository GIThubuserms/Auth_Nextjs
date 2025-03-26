'use client';

import React from 'react';

interface PageProps {
  params: {
    id: string;
  };
}

const Page: React.FC<PageProps> = ({ params }) => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-slate-500 text-xl">{params.id}</h1>
    </div>
  </div>
);

export default Page;
