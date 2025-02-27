import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertTriangle, FileText, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Police Incident Reporting System
        </h1>
        <p className="text-xl text-muted-foreground">
          Report incidents, track cases, and stay informed
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="p-6 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 mb-4 text-red-500" />
          <h2 className="text-xl font-semibold mb-2">Report Incidents</h2>
          <p className="text-muted-foreground mb-4">
            Submit reports for crimes, accidents, or lost property
          </p>
          <Link href="/register">
            <Button className="w-full">Get Started</Button>
          </Link>
        </Card>

        <Card className="p-6 text-center">
          <FileText className="mx-auto h-12 w-12 mb-4 text-blue-500" />
          <h2 className="text-xl font-semibold mb-2">Track Status</h2>
          <p className="text-muted-foreground mb-4">
            Monitor the progress of your submitted reports
          </p>
          <Link href="/login">
            <Button variant="outline" className="w-full">View Reports</Button>
          </Link>
        </Card>

        <Card className="p-6 text-center">
          <Shield className="mx-auto h-12 w-12 mb-4 text-green-500" />
          <h2 className="text-xl font-semibold mb-2">Police Information</h2>
          <p className="text-muted-foreground mb-4">
            Access important police department information
          </p>
          <Link href="/police-info">
            <Button variant="outline" className="w-full">Learn More</Button>
          </Link>
        </Card>
      </div>

      <div className="text-center">
        <img
          src="https://images.unsplash.com/photo-1485056616736-b0840bdf4732"
          alt="Police Department"
          className="rounded-lg shadow-lg mx-auto mb-8"
          width={800}
          height={400}
        />
      </div>
    </div>
  );
}
