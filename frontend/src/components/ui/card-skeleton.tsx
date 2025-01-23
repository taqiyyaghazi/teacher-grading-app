import React from 'react';
import { Card, CardContent, CardHeader } from './card';
import { Skeleton } from './skeleton';

const CardSkeleton = () => {
  return (
    <Card className="p-2">
      <CardHeader className="space-y-2">
        <Skeleton className="w-4/6 h-4" />
        <Skeleton className="w-5/6 h-4" />
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="w-4/6 h-4" />
        <Skeleton className="w-5/6 h-4" />
        <Skeleton className="w-4/6 h-4" />
        <Skeleton className="w-4/6 h-4" />
      </CardContent>
    </Card>
  );
};

export default CardSkeleton;
