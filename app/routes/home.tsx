import type { Route } from "./+types/home";
import { Layout } from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  Rocket,
  Database,
  Globe,
  Github,
  Zap,
  Shield,
  Trophy,
  ChevronRight,
  Settings,
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Welcome | Test Assignment" },
    {
      name: "description",
      content: "Welcome to the Test Assignment",
    },
  ];
}

export default function Home() {
  return (
    <Layout>
      <div className="p-8 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex gap-3 mb-6">
            <h1 className="text-5xl font-black text-neutral-800">
              Test Assignment
            </h1>
          </div>
          <p className="text-md text-neutral-600 max-w-4xl  mb-8">
            Testovacie zadanie som spracoval v dvoch úrovniach – základnej
            one-to-one implementácii, ktorá presne zodpovedá pôvodnému Figma
            návrhu, a v rozšírenej enhanced verzii, kde som zadanie posunul
            ďalej a pridal moderné UI komponenty, plnohodnotné CRUD operácie a
            enterprise-ready architektúru. Okrem vizuálnej vernosti som sa
            sústredil na čistý kód, typovú bezpečnosť a reálne použiteľné
            riešenia – od mock dát a validácie formulárov cez real-time databázu
            a cron joby až po pokročilý filtering, triedenie, stránkovanie a
            vyhľadávanie. Celé riešenie je postavené na modernom stacku (React
            Router v7, TypeScript, Shadcn/ui, TailwindCSS, Convex) a dodržuje
            best practices pre udržateľný vývoj.
          </p>
          <div className="flex gap-4">
            <Button variant="secondary" size="lg" className="gap-2" asChild>
              <a
                href="https://github.com/eodesign7/simplicity-test"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                Source Code
              </a>
            </Button>
            <Button variant="default" size="lg" className="gap-2" asChild>
              <a
                href="https://simplicity-test.onrender.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                One-to-One
                <ChevronRight className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>

        {/* Project Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-neutral-100 bg-neutral-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-lime-600" />
                <div>
                  <CardTitle className="text-neutral-800 text-xl">
                    one-to-one
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-neutral-700 mb-4">
                Základná implementácia podľa testovacieho zadania 1:1
              </CardDescription>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lime-600" />
                  Tabuľka oznamov: Mock Data + LocalStorage
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lime-600" />
                  Form validácia s Zod
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lime-600" />
                  CRUD operácie
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-lime-600" />
                  Toast notifikácie
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-neutral-100 bg-neutral-50/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5 text-sky-600" />
                <div>
                  <CardTitle className="text-neutral-800 text-xl">
                    Enhanced
                  </CardTitle>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-neutral-700 mb-4">
                Rozšírenie o moderné UI komponenty a plnohodnotné CRUD operácie
              </CardDescription>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-600" />
                  Shadcn/ui komponenty + Blocks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-600" />
                  Plnohodnotné CRUD + RT Database + preloadedQueries
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-600" />
                  Advanced filtering, sorting, pagination and search
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-sky-600" />
                  Scheduled Publish using Cron Jobs
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="h-5 w-5 text-neutral-600" />
              <CardTitle className="text-xl text-neutral-800">
                Tech Stack & Architecture
              </CardTitle>
            </div>
            <CardDescription>
              Moderné technológie a best practices pre enterprise-ready
              aplikácie
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Rocket className="h-5 w-5 text-blue-500" />
                  Frontend
                </h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">
                    React Router v7
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    TypeScript
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Shadcn/ui
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    TailwindCSS
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Vite
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-500" />
                  Backend
                </h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">
                    Convex
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Real-time DB
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Type-safe API
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Cron Jobs
                  </Badge>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-red-500" />
                  Quality
                </h3>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">
                    Zod Validation
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Error Boundaries
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    Clean Architecture
                  </Badge>
                  <Badge variant="outline" className="mr-2">
                    100% TypeScript
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-yellow-600" />
              <CardTitle className="text-2xl">Key Features</CardTitle>
            </div>
            <CardDescription>
              Kompletná funkcionalita pre moderný announcement management
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Real-time CRUD</h4>
                  <p className="text-sm text-gray-600">
                    Vytváranie, čítanie, úprava a mazanie oznamov
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Advanced Filtering</h4>
                  <p className="text-sm text-gray-600">
                    Filtrovanie podľa statusu a kategórií
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Smart Search</h4>
                  <p className="text-sm text-gray-600">
                    Rýchle vyhľadávanie v obsahu
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Form Validation</h4>
                  <p className="text-sm text-gray-600">
                    Type-safe validácia s Zod
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Error Boundaries</h4>
                  <p className="text-sm text-gray-600">
                    Graceful error handling
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-semibold">Mobile Responsive</h4>
                  <p className="text-sm text-gray-600">
                    Optimalizované pre všetky zariadenia
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-purple-600" />
                <CardTitle className="text-purple-800">Live Demo</CardTitle>
              </div>
              <CardDescription>Vyskúšaj aplikáciu v akcii</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg" asChild>
                <a
                  href="https://simplicity-test.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  Otvoriť Live Demo
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-gray-200 bg-gradient-to-br from-gray-50 to-gray-100">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Github className="h-8 w-8 text-gray-700" />
                <CardTitle className="text-gray-800">Source Code</CardTitle>
              </div>
              <CardDescription>
                Preskúmaj implementáciu na GitHub
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <a
                  href="https://github.com/eodesign7/simplicity-test"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 mr-2" />
                  Zobraziť na GitHub
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
