import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import AdminDashboard from "@/pages/AdminDashboard";
import PoliceInfo from "@/pages/PoliceInfo";
import NotFound from "@/pages/not-found";
import { storage } from "@/lib/storage";

function PrivateRoute({ component: Component, adminOnly = false }: { component: React.ComponentType, adminOnly?: boolean }) {
  const user = storage.getCurrentUser();
  
  if (!user) {
    return <Route component={Login} />;
  }

  if (adminOnly && !user.isAdmin) {
    return <Route component={NotFound} />;
  }

  return <Route component={Component} />;
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/police-info" component={PoliceInfo} />
        <Route path="/dashboard">
          <PrivateRoute component={Dashboard} />
        </Route>
        <Route path="/admin">
          <PrivateRoute component={AdminDashboard} adminOnly />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
