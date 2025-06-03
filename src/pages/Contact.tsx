
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, FileText, Shield, Scale } from "lucide-react";

const formSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().optional(),
  sujet: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  type: z.enum(["question", "reclamation", "suggestion"]),
  message: z.string().min(20, "Le message doit contenir au moins 20 caractères"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nom: "",
      email: "",
      telephone: "",
      sujet: "",
      type: "question",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Formulaire soumis:", values);
    
    toast({
      title: "Message envoyé",
      description: "Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600">
            Une question ? Une réclamation ? Nous sommes là pour vous aider.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Informations de contact */}
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Nos coordonnées</CardTitle>
                <CardDescription>
                  N'hésitez pas à nous contacter par les moyens suivants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@gestionmax-formation.fr</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-600">06 12 34 56 78</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">
                      123 Rue de la Formation<br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Heures d'ouverture</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lundi - Vendredi</span>
                    <span>9h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Samedi</span>
                    <span>9h00 - 12h00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dimanche</span>
                    <span>Fermé</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Formulaire de contact */}
          <Card>
            <CardHeader>
              <CardTitle>Envoyez-nous un message</CardTitle>
              <CardDescription>
                Remplissez le formulaire ci-dessous et nous vous répondrons rapidement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet *</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom complet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input placeholder="06 12 34 56 78" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de demande *</FormLabel>
                        <FormControl>
                          <select 
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            {...field}
                          >
                            <option value="question">Question générale</option>
                            <option value="reclamation">Réclamation</option>
                            <option value="suggestion">Suggestion</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sujet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet *</FormLabel>
                        <FormControl>
                          <Input placeholder="Sujet de votre message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Décrivez votre demande en détail..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        {/* Mentions légales et conformité Qualiopi */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Mentions légales et conformité Qualiopi
            </h2>
            <p className="text-lg text-gray-600">
              Informations obligatoires et conditions de nos formations
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contractualisation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Contrat de formation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  Une convention ou un contrat de formation professionnelle est établi entre l'organisme et le bénéficiaire avant l'entrée en formation.
                </p>
                <p>
                  Ce document précise les objectifs, les modalités, le programme, les délais, les conditions financières, ainsi que les droits de rétractation.
                </p>
                <p>
                  <strong>Délai d'accès :</strong> Formation accessible à réception de l'accord de financement.
                </p>
                <p>
                  <strong>Personnalisation :</strong> Un entretien de positionnement est réalisé en amont de la formation pour adapter les contenus et objectifs au profil et aux attentes du stagiaire.
                </p>
              </CardContent>
            </Card>

            {/* Réclamations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-5 w-5 text-orange-600" />
                  Procédure de réclamation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  En cas d'insatisfaction, une procédure de réclamation est mise à disposition de l'apprenant via le formulaire de contact ci-dessus en sélectionnant "Réclamation".
                </p>
                <p>
                  <strong>Délai de traitement :</strong> Les réclamations sont étudiées dans un délai de 10 jours ouvrés maximum.
                </p>
                <p>
                  <strong>Suivi :</strong> Un retour personnalisé est apporté à chaque stagiaire concernant sa réclamation.
                </p>
                <p>
                  <strong>Contact direct :</strong> reclamation@gestionmax-formation.fr
                </p>
              </CardContent>
            </Card>

            {/* RGPD */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Protection des données
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p>
                  Les données personnelles recueillies dans le cadre de cette formation sont traitées conformément au RGPD.
                </p>
                <p>
                  <strong>Utilisation :</strong> Elles sont utilisées uniquement à des fins pédagogiques, administratives ou réglementaires.
                </p>
                <p>
                  <strong>Droits :</strong> Chaque apprenant dispose d'un droit d'accès, de rectification ou de suppression.
                </p>
                <p>
                  <strong>Contact DPO :</strong> dpo@gestionmax-formation.fr
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Informations complémentaires */}
          <Card>
            <CardHeader>
              <CardTitle>Informations légales complémentaires</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Modalités techniques et pédagogiques</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Formation en présentiel individuel</li>
                    <li>• Méthode expositive et démonstrative</li>
                    <li>• Support de cours fourni</li>
                    <li>• Exercices pratiques personnalisés</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Modalités d'évaluation</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Quiz de validation des acquis</li>
                    <li>• Grille de compétences</li>
                    <li>• Évaluation à chaud et à froid</li>
                    <li>• Certificat de réalisation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Adaptation aux publics</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Accompagnement adapté proposé</li>
                    <li>• Accessibilité handicap étudiée</li>
                    <li>• Adaptation des supports si besoin</li>
                    <li>• Contact référent handicap disponible</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Organisme de formation</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• SIRET : 123 456 789 00012</li>
                    <li>• N° déclaration : 11 75 12345 75</li>
                    <li>• Certification Qualiopi : 2024-QUAL-1234</li>
                    <li>• Référencement Datadock</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-500">
                  Cet enregistrement ne vaut pas agrément de l'État (Article L.6352-12 du Code du travail).
                  La certification qualité a été délivrée au titre de la catégorie d'action suivante : ACTIONS DE FORMATION.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
