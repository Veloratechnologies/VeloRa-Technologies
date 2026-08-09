"use client";

import { useState } from "react";
import {
  Mail,
  CheckCircle2,
  CircleAlert,
  Settings2,
  MessageCircle,
  Globe2,
  Phone,
  ArrowRight,
  ShieldCheck,
  Unplug,
  RefreshCw,
} from "lucide-react";

const ChannelConfiguration = ({
  isDarkMode = false,
  theme = {},
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const colors = {
    pageBg: theme?.pageBg || (isDarkMode ? "#0f1117" : "#f6f7fb"),
    cardBg: theme?.cardBg || (isDarkMode ? "#171a21" : "#ffffff"),
    border: theme?.border || (isDarkMode ? "#292e39" : "#e6e8ef"),
    primary: theme?.primary || "#ff6600",
    text: theme?.text || (isDarkMode ? "#f5f7fa" : "#17191c"),
    secondaryText:
      theme?.secondaryText || (isDarkMode ? "#9ca3af" : "#6b7280"),
    mutedBg:
      theme?.mutedBg || (isDarkMode ? "#1d2129" : "#f3f4f6"),
  };

  const handleGoogleConnect = () => {
    setIsConnecting(true);

    /*
      TODO:
      Replace this with your actual Google OAuth endpoint.

      Example:

      window.location.href =
        `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    */

    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
    }, 1200);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  const channels = [
    {
      name: "WhatsApp",
      description:
        "Connect WhatsApp to manage customer conversations.",
      icon: MessageCircle,
    },
    {
      name: "Meta",
      description:
        "Connect Facebook and Instagram lead sources.",
      icon: Globe2,
    },
    {
      name: "IVR",
      description:
        "Connect IVR for automated customer calls.",
      icon: Phone,
    },
  ];

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: colors.pageBg,
        color: colors.text,
      }}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 py-7 lg:px-8">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="mb-2 flex items-center gap-2">
            <Settings2
              size={18}
              style={{ color: colors.primary }}
            />

            <span
              className="text-sm font-medium"
              style={{ color: colors.secondaryText }}
            >
              Settings
            </span>

            <ArrowRight
              size={14}
              style={{ color: colors.secondaryText }}
            />

            <span
              className="text-sm font-medium"
              style={{ color: colors.secondaryText }}
            >
              Channels
            </span>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Channel Configuration
          </h1>

          <p
            className="mt-2 max-w-2xl text-sm leading-6"
            style={{ color: colors.secondaryText }}
          >
            Connect and manage the communication channels your
            team uses to interact with customers and leads.
          </p>
        </div>

        {/* ================= MAIN GRID ================= */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_330px]">

          {/* ================= LEFT ================= */}
          <div className="space-y-6">

            {/* EMAIL CARD */}
            <div
              className="overflow-hidden rounded-2xl border"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
            >

              {/* CARD HEADER */}
              <div
                className="flex flex-col gap-4 border-b p-6 sm:flex-row sm:items-center sm:justify-between"
                style={{
                  borderColor: colors.border,
                }}
              >
                <div className="flex items-center gap-4">

                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: `${colors.primary}15`,
                      color: colors.primary,
                    }}
                  >
                    <Mail size={23} />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">

                      <h2 className="text-base font-semibold">
                        Gmail
                      </h2>

                      {isConnected ? (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: "#22c55e15",
                            color: "#16a34a",
                          }}
                        >
                          <CheckCircle2 size={12} />
                          Connected
                        </span>
                      ) : (
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium"
                          style={{
                            backgroundColor: `${colors.secondaryText}15`,
                            color: colors.secondaryText,
                          }}
                        >
                          <CircleAlert size={12} />
                          Not Connected
                        </span>
                      )}

                    </div>

                    <p
                      className="mt-1 text-sm"
                      style={{
                        color: colors.secondaryText,
                      }}
                    >
                      Connect your Gmail account to manage
                      customer emails directly from the CRM.
                    </p>
                  </div>

                </div>
              </div>

              {/* ================= CARD BODY ================= */}
              <div className="p-6">

                {!isConnected ? (
                  <>
                    {/* GOOGLE CONNECTION BOX */}
                    <div
                      className="rounded-xl border p-5"
                      style={{
                        backgroundColor: colors.mutedBg,
                        borderColor: colors.border,
                      }}
                    >

                      <div className="flex items-start gap-4">

                        {/* Google Logo */}
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm"
                        >
                          <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#4285F4"
                              d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.7Z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M6.54 13.81A5.86 5.86 0 0 1 6.23 12c0-.63.11-1.25.31-1.81V7.67H3.3A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.05 1.03 4.33l3.24-2.52Z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 6.16c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.26 14.63 2.3 12 2.3a9.75 9.75 0 0 0-8.7 5.37l3.24 2.52C6.85 7.88 9 6.16 12 6.16Z"
                            />
                          </svg>
                        </div>

                        <div className="flex-1">

                          <h3 className="text-sm font-semibold">
                            Connect with Google
                          </h3>

                          <p
                            className="mt-1 text-xs leading-5"
                            style={{
                              color: colors.secondaryText,
                            }}
                          >
                            Securely connect your Gmail account
                            using Google OAuth. You don't need to
                            enter or share your Gmail password.
                          </p>

                        </div>

                      </div>

                      {/* CONNECT BUTTON */}
                      <button
                        onClick={handleGoogleConnect}
                        disabled={isConnecting}
                        className="mt-5 flex h-11 w-full items-center justify-center gap-3 rounded-xl border bg-white px-5 text-sm font-semibold text-gray-700 shadow-sm transition-all hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
                      >

                        {isConnecting ? (
                          <>
                            <RefreshCw
                              size={17}
                              className="animate-spin"
                            />
                            Connecting...
                          </>
                        ) : (
                          <>
                            <svg
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#4285F4"
                                d="M21.35 12.27c0-.79-.07-1.55-.22-2.27H12v4.3h5.22a4.46 4.46 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                              />
                              <path
                                fill="#34A853"
                                d="M12 21.7c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.54 0-4.69-1.72-5.46-4.03H3.3v2.52A9.75 9.75 0 0 0 12 21.7Z"
                              />
                              <path
                                fill="#FBBC05"
                                d="M6.54 13.81A5.86 5.86 0 0 1 6.23 12c0-.63.11-1.25.31-1.81V7.67H3.3A9.73 9.73 0 0 0 2.27 12c0 1.57.38 3.05 1.03 4.33l3.24-2.52Z"
                              />
                              <path
                                fill="#EA4335"
                                d="M12 6.16c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.83 3.26 14.63 2.3 12 2.3a9.75 9.75 0 0 0-8.7 5.37l3.24 2.52C6.85 7.88 9 6.16 12 6.16Z"
                              />
                            </svg>

                            Connect with Google
                          </>
                        )}

                      </button>

                    </div>

                    {/* PERMISSION INFO */}
                    <div className="mt-5 flex items-start gap-3">

                      <ShieldCheck
                        size={17}
                        className="mt-0.5 shrink-0"
                        style={{
                          color: colors.primary,
                        }}
                      />

                      <p
                        className="text-xs leading-5"
                        style={{
                          color: colors.secondaryText,
                        }}
                      >
                        Your Gmail password is never shared with
                        us. Google securely handles authentication
                        and only the permissions you approve will
                        be granted to the CRM.
                      </p>

                    </div>
                  </>
                ) : (
                  /* ================= CONNECTED STATE ================= */
                  <div
                    className="rounded-xl border p-5"
                    style={{
                      backgroundColor: "#22c55e08",
                      borderColor: "#22c55e30",
                    }}
                  >

                    <div className="flex items-start gap-4">

                      <div className="mt-0.5">
                        <CheckCircle2
                          size={22}
                          style={{
                            color: "#16a34a",
                          }}
                        />
                      </div>

                      <div className="flex-1">

                        <h3 className="text-sm font-semibold">
                          Gmail connected successfully
                        </h3>

                        <p
                          className="mt-1 text-xs leading-5"
                          style={{
                            color: colors.secondaryText,
                          }}
                        >
                          Your Gmail account is connected and
                          customer emails can now be managed
                          through the CRM.
                        </p>

                      </div>

                    </div>

                    <button
                      onClick={handleDisconnect}
                      className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-lg border px-4 text-sm font-medium transition-all hover:bg-red-500/10"
                      style={{
                        borderColor: "#ef444450",
                        color: "#ef4444",
                      }}
                    >
                      <Unplug size={15} />
                      Disconnect Gmail
                    </button>

                  </div>
                )}

              </div>
            </div>

            {/* ================= OTHER CHANNELS ================= */}
            <div>

              <div className="mb-4">
                <h2 className="text-base font-semibold">
                  Other Channels
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{
                    color: colors.secondaryText,
                  }}
                >
                  More communication channels can be configured
                  here.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                {channels.map((channel) => {
                  const Icon = channel.icon;

                  return (
                    <div
                      key={channel.name}
                      className="relative overflow-hidden rounded-2xl border p-5"
                      style={{
                        backgroundColor: colors.cardBg,
                        borderColor: colors.border,
                      }}
                    >

                      <div className="absolute right-4 top-4">
                        <span
                          className="rounded-full px-2 py-1 text-[10px] font-medium"
                          style={{
                            backgroundColor: colors.mutedBg,
                            color: colors.secondaryText,
                          }}
                        >
                          Coming Soon
                        </span>
                      </div>

                      <div
                        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
                        style={{
                          backgroundColor: `${colors.secondaryText}12`,
                          color: colors.secondaryText,
                        }}
                      >
                        <Icon size={21} />
                      </div>

                      <h3 className="text-sm font-semibold">
                        {channel.name}
                      </h3>

                      <p
                        className="mt-2 min-h-[42px] text-xs leading-5"
                        style={{
                          color: colors.secondaryText,
                        }}
                      >
                        {channel.description}
                      </p>

                      <button
                        disabled
                        className="mt-5 flex h-9 w-full items-center justify-center rounded-lg border text-xs font-medium opacity-60"
                        style={{
                          borderColor: colors.border,
                          color: colors.secondaryText,
                        }}
                      >
                        Configure
                      </button>

                    </div>
                  );
                })}

              </div>
            </div>
          </div>

          {/* ================= RIGHT SIDEBAR ================= */}
          <div className="space-y-6">

            {/* CONNECTION STATUS */}
            <div
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
            >

              <div className="mb-5 flex items-center gap-3">

                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${colors.primary}15`,
                    color: colors.primary,
                  }}
                >
                  <ShieldCheck size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold">
                    Connection Status
                  </h3>

                  <p
                    className="mt-0.5 text-xs"
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    Current channel overview
                  </p>
                </div>

              </div>

              <div className="space-y-3">

                <div
                  className="flex items-center justify-between rounded-xl px-3 py-3"
                  style={{
                    backgroundColor: colors.mutedBg,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Mail
                      size={16}
                      style={{
                        color: colors.secondaryText,
                      }}
                    />

                    <span className="text-sm">
                      Gmail
                    </span>
                  </div>

                  <span
                    className="text-xs font-medium"
                    style={{
                      color: isConnected
                        ? "#16a34a"
                        : colors.secondaryText,
                    }}
                  >
                    {isConnected ? "Connected" : "Not connected"}
                  </span>
                </div>

                <div
                  className="flex items-center justify-between rounded-xl px-3 py-3"
                  style={{
                    backgroundColor: colors.mutedBg,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle
                      size={16}
                      style={{
                        color: colors.secondaryText,
                      }}
                    />

                    <span className="text-sm">
                      WhatsApp
                    </span>
                  </div>

                  <span
                    className="text-xs font-medium"
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    —
                  </span>
                </div>

                <div
                  className="flex items-center justify-between rounded-xl px-3 py-3"
                  style={{
                    backgroundColor: colors.mutedBg,
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe2
                      size={16}
                      style={{
                        color: colors.secondaryText,
                      }}
                    />

                    <span className="text-sm">
                      Meta
                    </span>
                  </div>

                  <span
                    className="text-xs font-medium"
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    —
                  </span>
                </div>

              </div>
            </div>

            {/* INFO CARD */}
            <div
              className="rounded-2xl border p-5"
              style={{
                backgroundColor: colors.cardBg,
                borderColor: colors.border,
              }}
            >

              <h3 className="text-sm font-semibold">
                About Channel Configuration
              </h3>

              <p
                className="mt-3 text-xs leading-5"
                style={{
                  color: colors.secondaryText,
                }}
              >
                Connect your communication channels to bring
                customer conversations directly into your CRM.
                Once connected, your team can manage conversations,
                generate AI responses, and track customer
                interactions from one place.
              </p>

              <div
                className="mt-4 rounded-xl p-3"
                style={{
                  backgroundColor: `${colors.primary}0c`,
                }}
              >
                <div className="flex gap-2.5">

                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{
                      color: colors.primary,
                    }}
                  />

                  <p
                    className="text-xs leading-5"
                    style={{
                      color: colors.secondaryText,
                    }}
                  >
                    Only administrators can configure or
                    disconnect communication channels.
                  </p>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChannelConfiguration;