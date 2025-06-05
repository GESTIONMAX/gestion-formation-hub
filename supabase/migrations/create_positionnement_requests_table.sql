
-- Create table for positioning appointment requests
CREATE TABLE public.positionnement_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  formation_selectionnee TEXT,
  nom_beneficiaire TEXT NOT NULL,
  prenom_beneficiaire TEXT NOT NULL,
  date_naissance DATE,
  sexe TEXT,
  situation_handicap TEXT,
  email TEXT NOT NULL,
  telephone TEXT NOT NULL,
  adresse TEXT,
  code_postal TEXT,
  ville TEXT,
  statut TEXT,
  experience_wordpress TEXT,
  objectifs_principaux TEXT,
  niveau_maitrise TEXT DEFAULT 'non',
  programme_formation TEXT,
  attestation_besoin BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'en_attente' CHECK (status IN ('en_attente', 'traite', 'rdv_fixe')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add RLS
ALTER TABLE public.positionnement_requests ENABLE ROW LEVEL SECURITY;

-- Allow public insert (for the form submission)
CREATE POLICY "Allow public insert" ON public.positionnement_requests
  FOR INSERT TO anon
  WITH CHECK (true);

-- Allow authenticated users to view all requests
CREATE POLICY "Allow authenticated select" ON public.positionnement_requests
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users to update requests
CREATE POLICY "Allow authenticated update" ON public.positionnement_requests
  FOR UPDATE TO authenticated
  USING (true);
