
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg",
      role: "Toyota Owner",
      content: "I had a flat tire on the highway and was stuck for hours until I found FixMyRide. Within 20 minutes, a mechanic arrived and got me back on the road. Incredible service!",
      rating: 5,
    },
    {
      name: "Michael Brown",
      avatar: "/placeholder.svg",
      role: "Honda Driver",
      content: "My car wouldn't start in a parking lot late at night. I requested help through this site and a mechanic arrived quickly. He jump-started my battery and even checked other systems. Great experience!",
      rating: 5,
    },
    {
      name: "Emily Chen",
      avatar: "/placeholder.svg",
      role: "SUV Owner",
      content: "Being able to track the mechanic's arrival in real-time was so reassuring. The mechanic was professional and fixed my overheating engine. I highly recommend this service!",
      rating: 4,
    },
  ];

  return (
    <div className="py-20 bg-brand-blue">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-white/80">
            Don't just take our word for it – hear from drivers we've helped
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-6">
                  <Avatar className="h-12 w-12 border-2 border-brand-orange">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <p className="font-medium text-white">{testimonial.name}</p>
                    <p className="text-white/60 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6">{testimonial.content}</p>
                
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
