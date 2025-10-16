import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { discordUserAtom } from "@/utils/atoms";
import useDiscordAuth from "@/utils/discord";
import logoImage from '@/assets/roach_logo_discord.png';

export default function Home() {
  const [discordUser] = useAtom(discordUserAtom);
  const discord = useDiscordAuth();
  const navigate = useNavigate();

  const handleGetStarted = () => {
    if (discordUser) {
      navigate("/discords");
    } else {
      discord.login();
    }
  };

  const features = [
    {
      icon: "pi pi-heart-fill",
      title: "100% Free Forever",
      description: "No subscriptions, no hidden fees, no limits. Roach is completely free to use for unlimited Discord servers.",
      color: "text-pink-500"
    },
    {
      icon: "pi pi-server",
      title: "Unlimited Servers", 
      description: "Manage reaction roles across as many Discord servers as you want. Perfect for communities of any size.",
      color: "text-blue-500"
    },
    {
      icon: "pi pi-sparkles",
      title: "Unlimited Reaction Roles",
      description: "Create as many reaction roles as you need. No artificial limits on emotes, roles, or categories.",
      color: "text-purple-500"
    },
    {
      icon: "pi pi-mobile",
      title: "Mobile Optimized",
      description: "Built with modern React and responsive design. Manage your Discord servers from anywhere on any device.",
      color: "text-green-500"
    },
    {
      icon: "pi pi-shield",
      title: "Secure & Private",
      description: "We only store your Discord ID and username. All other data is fetched live from Discord's API.",
      color: "text-orange-500"
    },
    {
      icon: "pi pi-bolt",
      title: "Lightning Fast",
      description: "Modern TypeScript codebase with optimized performance. Quick setup and instant publishing to Discord.",
      color: "text-yellow-500"
    }
  ];

  const steps = [
    {
      step: "1",
      title: "Login with Discord",
      description: "Authenticate with your Discord account - that's the only requirement!"
    },
    {
      step: "2", 
      title: "Select Your Server",
      description: "Choose from your Discord servers where you have admin permissions"
    },
    {
      step: "3",
      title: "Create Categories",
      description: "Organize your reaction roles into message categories for better management"
    },
    {
      step: "4",
      title: "Add Reaction Roles",
      description: "Map Discord emotes to roles and publish instantly to your server"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            {/* Logo and Title */}
            <div className="flex justify-center items-center mb-8">
              <img
                src={logoImage}
                alt="Roach Logo"
                className="h-20 w-20 mr-4"
              />
              <div className="text-left">
                <h1 className="text-6xl font-bold text-white mb-2">Roach</h1>
                <p className="text-xl text-gray-300">Discord Bot Management</p>
              </div>
            </div>

            {/* Main Headline */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6">
              Free, Unlimited
              <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                {" "}
                Reaction Roles
              </span>
            </h2>

            <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The easiest way to manage reaction roles across unlimited Discord
              servers. No limits, no fees, just pure functionality.
            </p>

            {/* Free Badge */}
            <div className="flex justify-center mb-8">
              <Badge
                value="100% FREE FOREVER"
                severity="success"
                className="text-lg px-4 py-2"
              />
            </div>

            {/* CTA Button */}
            <Button
              label={discordUser ? "My Discords" : "Login with Discord"}
              icon={discordUser ? "pi pi-arrow-right" : "pi pi-discord"}
              severity="info"
              size="large"
              className="px-8 py-4 text-lg font-semibold"
              onClick={handleGetStarted}
            />

            <p className="text-sm text-gray-400 mt-4">
              Only requirement: Discord login • No email • No registration
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Why Choose Roach?
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Built by Discord community managers, for Discord community
              managers. Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="h-full hover:shadow-lg transition-shadow duration-300 bg-gray-800 border-gray-700"
              >
                <div className="text-center p-6">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-700 mb-4`}
                  >
                    <i
                      className={`${feature.icon} text-2xl ${feature.color}`}
                    />
                  </div>
                  <h4 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-20">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">
              Get Started in Minutes
            </h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Simple 4-step process to get unlimited reaction roles running on
              your Discord server.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-lg mb-4">
                  {step.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-3">
                  {step.title}
                </h4>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What You Get Section */}
        <Card className="mb-20 bg-gray-800 border-gray-700">
          <div className="p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">
                What You Get
              </h3>
              <p className="text-lg text-gray-300">
                Everything you need to manage reaction roles at scale
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Unlimited Discord servers
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Unlimited reaction roles per server
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Organized message categories
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">Custom emote support</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Instant publishing to Discord
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Mobile-responsive interface
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Real-time role management
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="pi pi-check-circle text-green-500 text-xl mr-3" />
                  <span className="text-gray-200">
                    Zero configuration required
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Final CTA Section */}
        <div className="text-center py-20">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Discord Server?
          </h3>

          <div className="pb-3">
            <Button
              label={
                discordUser ? "Manage My Servers" : "Get Started with Discord"
              }
              icon={discordUser ? "pi pi-cog" : "pi pi-discord"}
              severity="info"
              size="large"
              className="px-8 py-4 text-lg font-semibold mb-4"
              onClick={handleGetStarted}
            />
          </div>

          <div className="flex justify-center items-center space-x-8 text-sm text-gray-400">
            <div className="flex items-center">
              <i className="pi pi-shield text-green-500 mr-2" />
              <span>Secure</span>
            </div>
            <div className="flex items-center">
              <i className="pi pi-heart-fill text-pink-500 mr-2" />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center">
              <i className="pi pi-bolt text-yellow-500 mr-2" />
              <span>Instant Setup</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}