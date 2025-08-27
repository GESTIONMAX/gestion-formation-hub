/*
  Warnings:

  - You are about to drop the column `formation_id` on the `dossiers_formation` table. All the data in the column will be lost.
  - You are about to drop the column `programme_formation_id` on the `dossiers_formation` table. All the data in the column will be lost.
  - You are about to drop the column `formation_selectionnee` on the `positionnement_requests` table. All the data in the column will be lost.
  - You are about to drop the column `formation_id` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `formation_selectionnee` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `formation_titre` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the column `programme_personnalise_id` on the `rendezvous` table. All the data in the column will be lost.
  - You are about to drop the `categories_programme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `formations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programmes_formation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `programmes_personnalises` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[programme_id]` on the table `positionnement_requests` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `programme_id` to the `dossiers_formation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."dossiers_formation" DROP CONSTRAINT "dossiers_formation_formation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."dossiers_formation" DROP CONSTRAINT "dossiers_formation_programme_formation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."programmes_formation" DROP CONSTRAINT "programmes_formation_categorie_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."programmes_formation" DROP CONSTRAINT "programmes_formation_positionnement_request_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."programmes_formation" DROP CONSTRAINT "programmes_formation_programme_source_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."programmes_personnalises" DROP CONSTRAINT "programmes_personnalises_formation_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."programmes_personnalises" DROP CONSTRAINT "programmes_personnalises_positionnement_request_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."rendezvous" DROP CONSTRAINT "rendezvous_formation_fkey";

-- DropForeignKey
ALTER TABLE "public"."rendezvous" DROP CONSTRAINT "rendezvous_programme_personnalise_fkey";

-- AlterTable
ALTER TABLE "public"."apprenants" ADD COLUMN     "prenom" TEXT;

-- AlterTable
ALTER TABLE "public"."dossiers_formation" DROP COLUMN "formation_id",
DROP COLUMN "programme_formation_id",
ADD COLUMN     "programme_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."positionnement_requests" DROP COLUMN "formation_selectionnee",
ADD COLUMN     "programme_id" TEXT;

-- AlterTable
ALTER TABLE "public"."rendezvous" DROP COLUMN "formation_id",
DROP COLUMN "formation_selectionnee",
DROP COLUMN "formation_titre",
DROP COLUMN "programme_personnalise_id",
ADD COLUMN     "programme_id" TEXT,
ALTER COLUMN "status" SET DEFAULT 'planifie';

-- DropTable
DROP TABLE "public"."categories_programme";

-- DropTable
DROP TABLE "public"."formations";

-- DropTable
DROP TABLE "public"."programmes_formation";

-- DropTable
DROP TABLE "public"."programmes_personnalises";

-- CreateTable
CREATE TABLE "public"."programmes" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "est_actif" BOOLEAN NOT NULL DEFAULT true,
    "est_visible" BOOLEAN NOT NULL DEFAULT true,
    "categorie_id" TEXT,
    "programme_source_id" TEXT,
    "pictogramme" TEXT,
    "duree" TEXT NOT NULL,
    "prix" TEXT NOT NULL,
    "niveau" TEXT NOT NULL,
    "prerequis" TEXT NOT NULL,
    "public_concerne" TEXT NOT NULL,
    "date_creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "programmes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."formation_details" (
    "id" TEXT NOT NULL,
    "programme_id" TEXT NOT NULL,
    "participants" TEXT NOT NULL,
    "objectifs" TEXT[],
    "competences_visees" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "objectifs_specifiques" TEXT,
    "contenu_detaille_jours" TEXT NOT NULL,
    "contenu_detaille_html" TEXT,
    "evaluation_sur" TEXT,
    "horaires" TEXT NOT NULL DEFAULT '9h-12h30 et 14h-17h30',
    "modalites" TEXT NOT NULL,
    "modalites_acces" TEXT NOT NULL,
    "modalites_techniques" TEXT NOT NULL,
    "delai_acces" TEXT,
    "modalites_reglement" TEXT NOT NULL,
    "contact_organisme" TEXT NOT NULL DEFAULT 'GestionMax - aurelien@gestionmax.fr - 06.46.02.24.68',
    "referent_pedagogique" TEXT NOT NULL DEFAULT 'Aurélien Lien - aurelien@gestionmax.fr',
    "referent_qualite" TEXT NOT NULL DEFAULT 'Aurélien Lien - aurelien@gestionmax.fr',
    "formateur" TEXT NOT NULL,
    "ressources_disposition" TEXT NOT NULL,
    "modalites_evaluation" TEXT NOT NULL,
    "sanction_formation" TEXT NOT NULL,
    "niveau_certification" TEXT NOT NULL,
    "delai_acceptation" TEXT NOT NULL,
    "accessibilite_handicap" TEXT NOT NULL,
    "cessation_abandon" TEXT NOT NULL,
    "programme_url" TEXT,
    "taux_participation" TEXT,
    "taux_reussite" TEXT,
    "tarif_intra_entreprise" DOUBLE PRECISION,
    "tarif_inter_entreprise" DOUBLE PRECISION,
    "ressources_associees" TEXT[],
    "verification_juridique" BOOLEAN NOT NULL DEFAULT false,
    "date_verification_juridique" TIMESTAMP(3),
    "action_non_respect" TEXT,
    "reference_texte" TEXT,
    "organisme_controle" TEXT,
    "date_controle" TIMESTAMP(3),
    "resultat_controle" TEXT,
    "commentaire_controle" TEXT,

    CONSTRAINT "formation_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."programme_personnalise_details" (
    "id" TEXT NOT NULL,
    "programme_id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "objectifs_specifiques" TEXT NOT NULL,
    "evaluation_sur" TEXT NOT NULL,

    CONSTRAINT "programme_personnalise_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "titre" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ordre" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "formation_details_programme_id_key" ON "public"."formation_details"("programme_id");

-- CreateIndex
CREATE UNIQUE INDEX "programme_personnalise_details_programme_id_key" ON "public"."programme_personnalise_details"("programme_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_code_key" ON "public"."categories"("code");

-- CreateIndex
CREATE UNIQUE INDEX "positionnement_requests_programme_id_key" ON "public"."positionnement_requests"("programme_id");

-- RenameForeignKey
ALTER TABLE "public"."rendezvous" RENAME CONSTRAINT "rendezvous_dossier_formation_fkey" TO "rendezvous_dossier_formation_id_fkey";

-- AddForeignKey
ALTER TABLE "public"."programmes" ADD CONSTRAINT "programmes_programme_source_id_fkey" FOREIGN KEY ("programme_source_id") REFERENCES "public"."programmes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."programmes" ADD CONSTRAINT "programmes_categorie_id_fkey" FOREIGN KEY ("categorie_id") REFERENCES "public"."categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."formation_details" ADD CONSTRAINT "formation_details_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."programme_personnalise_details" ADD CONSTRAINT "programme_personnalise_details_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."dossiers_formation" ADD CONSTRAINT "dossiers_formation_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."positionnement_requests" ADD CONSTRAINT "positionnement_requests_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."rendezvous" ADD CONSTRAINT "rendezvous_programme_id_fkey" FOREIGN KEY ("programme_id") REFERENCES "public"."programmes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
