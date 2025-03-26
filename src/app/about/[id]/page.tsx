
import React from 'react';

export type paramsType = Promise<{ id: string }>;

type Props = {
  params: paramsType;
};

const Page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-slate-500 text-xl">{id}</h1>
      </div>
    </div>
  );
};

export default Page;
