import React from 'react';

export default async function Dashboard({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const role = (await params).role;
  return <div>{role}</div>;
}
