
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Badge } from "primereact/badge";
import { Divider } from "primereact/divider";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { discordUserAtom } from "@/utils/atoms";
import useDiscordAuth from "@/utils/discord";
import logoImage from '@/assets/roach_logo_discord.png';

function Setup() {
  const navigate = useNavigate();
  const [discordUser] = useAtom(discordUserAtom);
  const discord = useDiscordAuth();

  const setupSteps = [
    {
      step: "1",
      title: "Add Roach to Your Discord Server",
      description: "Click the button below to invite Roach to your Discord server with the proper permissions.",
      icon: "pi pi-plus-circle",
      color: "text-blue-500",
      action: {
        label: "Add Roach To Discord",
        icon: "pi pi-discord",
        isRoachButton: true,
        url: "https://discord.com/api/oauth2/authorize?client_id=756971852701892648&permissions=268774464&scope=bot"
      }
    },
    {
      step: "2", 
      title: "Position the Roach Role",
      description: "Move the Roach role above all roles you want to manage. This is crucial for proper functionality.",
      icon: "pi pi-sort-alt",
      color: "text-orange-500",
      details: [
        "Go to Server Settings → Roles",
        "Drag the 'Roach' role above target roles",
        "Roach doesn't need to be at the very top",
        "Just above the roles you want to manage"
      ]
    },
    {
      step: "3",
      title: "Create a Channel for Role Messages",
      description: "Create a text channel where Roach will post role reaction messages (commonly called #roles).",
      icon: "pi pi-hashtag",
      color: "text-green-500",
      details: [
        "Create a new text channel (e.g., #roles)",
        "Ensure Roach can read and send messages",
        "This is where reaction role messages appear",
        "You can change the channel anytime"
      ]
    },
    {
      step: "4",
      title: "Configure Roles & Emotes",
      description: "Use this website to create reaction role messages with your desired roles and emotes.",
      icon: "pi pi-cog",
      color: "text-purple-500",
      details: [
        "Add roles and their corresponding emotes",
        "Organize into message categories",
        "Preview before publishing",
        "Changes are instant in Discord"
      ]
    },
    {
      step: "5",
      title: "Start Managing Roles",
      description: "You're all set! Manage everything from this website without Discord commands.",
      icon: "pi pi-check-circle",
      color: "text-green-600",
      action: discordUser ? {
        label: "Start Creating Role Reactions",
        icon: "pi pi-arrow-right",
        internal: true,
        url: "/discords"
      } : {
        label: "Login with Discord",
        icon: "pi pi-discord",
        internal: false,
        loginAction: true
      }
    }
  ];

  const handleActionClick = (action: any) => {
    if (action.loginAction) {
      discord.login();
    } else if (action.internal) {
      navigate(action.url);
    } else {
      window.open(action.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center items-center mb-6">
            <img src={logoImage} alt="Roach Logo" className="h-16 w-16 mr-4" />
            <div className="text-left">
              <h1 className="text-4xl font-bold text-white mb-1">
                Setup Guide
              </h1>
              <p className="text-lg text-gray-300">First Time Roach Setup</p>
            </div>
          </div>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Follow these simple steps to get Roach up and running on your
            Discord server. The entire process takes less than 5 minutes!
          </p>

          <Badge
            value="5 Easy Steps"
            severity="info"
            className="text-sm px-3 py-1"
          />
        </div>

        {/* Setup Steps */}
        <div className="space-y-8">
          {setupSteps.map((step, index) => (
            <Card
              key={index}
              className="bg-gray-800 border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start space-x-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold text-lg">
                      {step.step}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <i
                        className={`${step.icon} ${step.color} text-2xl mr-3`}
                      />
                      <h3 className="text-2xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>

                    <p className="text-gray-300 text-lg mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Action Button */}
                    {step.action && (
                      <div className="mb-4">
                        {step.action.isRoachButton ? (
                          <Button
                            severity="warning"
                            size="large"
                            className="px-6 py-3 font-semibold flex items-center"
                            onClick={() => handleActionClick(step.action)}
                          >
                            <img
                              src={logoImage}
                              alt="Roach"
                              className="h-5 w-5 mr-2"
                            />
                            {step.action.label}
                          </Button>
                        ) : (
                          <Button
                            label={step.action.label}
                            icon={step.action.icon}
                            severity={step.action.internal ? "success" : "info"}
                            size="large"
                            className="px-6 py-3 font-semibold"
                            onClick={() => handleActionClick(step.action)}
                          />
                        )}
                      </div>
                    )}

                    {/* Step Details */}
                    {step.details && (
                      <div className="bg-gray-700 rounded-lg p-4">
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <i className="pi pi-info-circle text-blue-400 mr-2" />
                          Quick Steps:
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li
                              key={detailIndex}
                              className="flex items-center text-gray-300"
                            >
                              <i className="pi pi-angle-right text-orange-400 mr-2 text-sm" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Divider className="my-12" />

        {/* Important Notes Section */}
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <i className="pi pi-exclamation-triangle text-yellow-500 mr-3" />
              Important Notes
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="pi pi-shield text-green-500 text-xl mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Required Permissions
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Roach needs "Manage Roles" and "Send Messages" permissions
                      to function properly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="pi pi-sort-alt text-orange-500 text-xl mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Role Hierarchy
                    </h4>
                    <p className="text-gray-300 text-sm">
                      The Roach role must be positioned above any roles you want
                      to assign to users.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start">
                  <i className="pi pi-bolt text-yellow-500 text-xl mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Instant Updates
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Changes made on this website appear immediately in your
                      Discord server.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <i className="pi pi-mobile text-blue-500 text-xl mr-3 mt-1" />
                  <div>
                    <h4 className="text-white font-semibold mb-1">
                      Mobile Friendly
                    </h4>
                    <p className="text-gray-300 text-sm">
                      Manage your reaction roles from anywhere with our
                      responsive interface.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Final CTA */}
        <div className="text-center py-8">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
            Once you've completed the setup steps above, you can start creating
            unlimited reaction roles for your Discord server.
          </p>

          <div className="flex justify-center space-x-4">
            <div>
              <Button
                severity="warning"
                size="large"
                className="px-6 py-3 font-semibold flex items-center"
                onClick={() =>
                  window.open(
                    "https://discord.com/api/oauth2/authorize?client_id=756971852701892648&permissions=268774464&scope=bot",
                    "_blank"
                  )
                }
              >
                <img src={logoImage} alt="Roach" className="h-5 w-5 mr-2" />
                Add Roach to Discord
              </Button>
            </div>
            <div>
              {discordUser ? (
                <Button
                  label="Manage My Servers"
                  icon="pi pi-arrow-right"
                  severity="success"
                  size="large"
                  className="px-6 py-3 font-semibold"
                  onClick={() => navigate("/discords")}
                />
              ) : (
                <Button
                  label="Login with Discord"
                  icon="pi pi-discord"
                  severity="info"
                  size="large"
                  className="px-6 py-3 font-semibold"
                  onClick={() => discord.login()}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setup;