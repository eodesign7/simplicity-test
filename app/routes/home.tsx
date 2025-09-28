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
  Code,
  Database,
  Globe,
  Github,
  Zap,
  Shield,
  Trophy,
} from "lucide-react";
import { Link } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Announcements Dashboard" },
    {
      name: "description",
      content: "Simple announcements management dashboard",
    },
  ];
}

export default function Home() {
  return (
    <Layout>
      <div className="p-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Trophy className="h-12 w-12 text-yellow-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Test Assignment
            </h1>
            <Rocket className="h-12 w-12 text-blue-500" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Moderný announcement management systém postavený s najnovšími
            technológiami. Od jednoduchej verzie po enterprise-ready riešenie.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/announcements">
              <Button size="lg" className="gap-2">
                <Database className="h-5 w-5" />
                Zobraziť Announcements
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <a
                href="https://github.com/eodesign7/simplicity-test"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-5 w-5" />
                Source Code
              </a>
            </Button>
          </div>
        </div>

        {/* Project Status Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div>
                  <CardTitle className="text-green-800">
                    Phase 1: One-to-One
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    COMPLETED
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-green-700 mb-4">
                Základná implementácia podľa testovacieho zadania
              </CardDescription>
              <ul className="space-y-2 text-sm text-green-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Tabuľka oznamov s Convex backend
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Form validácia s Zod
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  CRUD operácie
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Toast notifikácie
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-blue-600" />
                <div>
                  <CardTitle className="text-blue-800">
                    Phase 2: Enhanced
                  </CardTitle>
                  <Badge className="bg-blue-100 text-blue-700">COMPLETED</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-blue-700 mb-4">
                Enterprise-ready rozšírenie s modernými technológiami
              </CardDescription>
              <ul className="space-y-2 text-sm text-blue-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Shadcn/ui komponenty
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Plnohodnotné CRUD + real-time
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Advanced filtering & sorting
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Error boundaries & performance
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Tech Stack */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Code className="h-8 w-8 text-purple-600" />
              <CardTitle className="text-2xl">
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
                    Auto-scaling
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
