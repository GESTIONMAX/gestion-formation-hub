"use client";

import React from "react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
// Import d'autres composants que tu veux tester
// import PositionnementForm from "@/app/_components/features/rendez-vous/PositionnementForm";

export default function TestComponents() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">Sandbox des composants</h1>

      <Card>
        <CardHeader>
          <CardTitle>Exemple Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Contenu d’exemple</p>
          <Badge>Test</Badge>
        </CardContent>
      </Card>

      <Button>Mon bouton</Button>

      {/* Décommente et teste les composants un par un */}
      {/* <PositionnementForm /> */}
    </div>
  );
}
