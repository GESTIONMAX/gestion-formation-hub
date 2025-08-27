/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `apprenants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `apprenants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."apprenants" ADD COLUMN     "date_expiration_token" TIMESTAMP(3),
ADD COLUMN     "est_actif" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mot_de_passe" TEXT,
ADD COLUMN     "premier_acces" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "token_acces" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "apprenants_email_key" ON "public"."apprenants"("email");
