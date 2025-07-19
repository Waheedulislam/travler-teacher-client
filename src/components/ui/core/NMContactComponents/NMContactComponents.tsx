import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Globe } from "lucide-react";

const NMContactComponents = () => {
  return (
    <div>
      <Card className="mt-16 bg-gradient-to-r from-yellow-50 to-orange-50 border-0 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-r from-yellow-500 to-orange-400 rounded-full">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4">
            Ready to explore the world?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Can&lsquo;t find the answer you&lsquo;re looking for? Our travel
            experts are here to help you plan the perfect virtual adventure with
            local guides from around the globe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-orange-400 hover:from-yellow-600 hover:to-orange-500 text-white shadow-lg"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Travel Support
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 hover:bg-gray-50 bg-transparent"
            >
              <Globe className="w-5 h-5 mr-2" />
              Browse Destinations
            </Button>
          </div>
        </CardContent>
      </Card>
      ;
    </div>
  );
};

export default NMContactComponents;
