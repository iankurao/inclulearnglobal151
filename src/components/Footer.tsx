import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <Heart className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold text-foreground">IncluLearn Global</h3>
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Discovering possibilities, one child at a time. Connecting families with the right educational and
              healthcare resources.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  School Matching
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Health Specialists
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Parent Community
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Educational Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Support Groups
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Accessibility
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1">
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-muted-foreground">hello@inclulearn.co.ke</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-muted-foreground mr-3" />
                <span className="text-muted-foreground">+254 700 123 456</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 text-muted-foreground mr-3 mt-1" />
                <span className="text-muted-foreground">
                  Nairobi, Kenya
                  <br />
                  Westlands Business District
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">© 2024 IncluLearn Global. All rights reserved.</p>
          <p className="text-muted-foreground text-sm mt-4 md:mt-0">Made with ❤️ for families worldwide</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
