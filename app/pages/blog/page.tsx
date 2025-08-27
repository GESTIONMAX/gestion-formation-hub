"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Exemple d'article de blog */}
        <Card>
          <CardHeader>
            <CardTitle>Article de blog</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Contenu de l'article de blog...
            </p>
            <Button asChild>
              <Link href="/blog/article-1">Lire la suite</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
