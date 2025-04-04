
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Clock } from "lucide-react";

const MechanicPendingPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-blue-100 p-3">
              <Clock className="h-8 w-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">Application Under Review</CardTitle>
          <CardDescription className="text-center text-base">
            Your mechanic account is pending approval
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-sm p-4 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex">
                <ClipboardCheck className="h-5 w-5 text-blue-600 mr-2" />
                <div className="text-sm text-left text-blue-700">
                  <p className="font-medium">Application submitted successfully!</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-3 text-left">
            <p>Thank you for applying to join our mechanic network. Our admin team is reviewing your application and credentials.</p>
            
            <p>This process typically takes 1-2 business days. You'll receive an email notification once your account has been approved.</p>
            
            <p>If you have any questions, please contact our support team at <a href="mailto:support@autoaidconnect.com" className="text-primary hover:underline">support@autoaidconnect.com</a>.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default MechanicPendingPage;
