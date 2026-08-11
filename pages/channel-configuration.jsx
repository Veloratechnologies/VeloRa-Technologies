import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  CheckCircle2,
  CircleAlert,
  Settings2,
  MessageCircle,
  Phone,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Globe2,
} from "lucide-react";

/*
|--------------------------------------------------------------------------
| API Configuration
|--------------------------------------------------------------------------
*/

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.veloratechnologies.in";

/*
|--------------------------------------------------------------------------
| Google Logo
|--------------------------------------------------------------------------
*/

const GoogleLogo = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.79-.07-1.55-.22-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z"
    />

    <path
      fill="#34A853"
      d="M12 21.75c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.3v2.53A9.75 9.75 0 0 0 12 21.75Z"
    />

    <path
      fill="#FBBC05"
      d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.3A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.05 4.37l3.24-2.53Z"
    />

    <path
      fill="#EA4335"
      d="M12 6.13c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.24 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.7 5.38l3.24 2.53C7.31 7.85 9.46 6.13 12 6.13Z"
    />
  </svg>
);

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const getChannelIcon = (channel) => {
  const code = channel?.code?.toLowerCase();

  switch (code) {
    case "gmail":
    case "email":
      return Mail;

    case "whatsapp":
      return MessageCircle;

    case "meta":
    case "facebook":
    case "instagram":
      return Globe2;

    case "ivr":
    case "phone":
      return Phone;

    default:
      return Settings2;
  }
};

const getChannelDescription = (channel) => {
  const code = channel?.code?.toLowerCase();

  switch (code) {
    case "gmail":
    case "email":
      return "Connect your Gmail account to manage customer emails directly from the CRM.";

    case "whatsapp":
      return "Connect WhatsApp to manage customer conversations directly from the CRM.";

    case "meta":
    case "facebook":
    case "instagram":
      return "Connect Facebook and Instagram lead sources.";

    case "ivr":
    case "phone":
      return "Connect IVR for automated customer calls.";

    default:
      return (
        channel?.description ||
        `Connect your ${
          channel?.name || "communication"
        } channel to the CRM.`
      );
  }
};

/*
|--------------------------------------------------------------------------
| Main Component
|--------------------------------------------------------------------------
*/

const ChannelConfiguration = ({
  isDarkMode = false,
  theme: incomingTheme,
}) => {
  /*
  |--------------------------------------------------------------------------
  | Theme
  |--------------------------------------------------------------------------
  */

  const defaultTheme = {
    pageBg: isDarkMode ? "#0f172a" : "#f5f7fb",
    cardBg: isDarkMode ? "#111827" : "#ffffff",
    panelBg: isDarkMode ? "#1f2937" : "#f3f4f6",
    textPrimary: isDarkMode ? "#f8fafc" : "#111827",
    textSecondary: isDarkMode ? "#cbd5e1" : "#526b85",
    border: isDarkMode ? "#334155" : "#e2e8f0",
    mutedBg: isDarkMode ? "#1e293b" : "#f3f4f6",
  };

  const theme = {
    ...defaultTheme,
    ...(incomingTheme || {}),
  };

  /*
  |--------------------------------------------------------------------------
  | State
  |--------------------------------------------------------------------------
  */

  const [channels, setChannels] = useState([]);

  const [loadingChannels, setLoadingChannels] = useState(true);

  const [connectingChannel, setConnectingChannel] =
    useState(null);

  const [settingUpChannel, setSettingUpChannel] =
    useState(null);

  const [connectedChannels, setConnectedChannels] =
    useState({});

  const [setupError, setSetupError] = useState("");

  const [showErrorModal, setShowErrorModal] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | IMPORTANT
  |--------------------------------------------------------------------------
  |
  | Prevent setup-watch from being called multiple times
  | during the same page lifecycle.
  |
  | We intentionally DO NOT use sessionStorage here.
  |
  */

  const setupAttemptedRef = useRef(false);

  /*
  |--------------------------------------------------------------------------
  | Fetch Available Channels
  |--------------------------------------------------------------------------
  */

  const fetchChannels = async () => {
    try {
      setLoadingChannels(true);

      const response = await fetch(
        `${API_BASE_URL}/channels/`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      console.log(
        "[Channel Configuration] /channels response:",
        response.status,
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.message ||
            data?.detail ||
            data?.error ||
            `Failed to load channels (${response.status})`
        );
      }

      if (Array.isArray(data)) {
        setChannels(data);
      } else {
        setChannels([]);
      }
    } catch (error) {
      console.error(
        "[Channel Configuration] Failed to fetch channels:",
        error
      );

      setSetupError(
        error?.message ||
          "Unable to load communication channels. Please try again."
      );

      setShowErrorModal(true);
    } finally {
      setLoadingChannels(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Channel Fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchChannels();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | Read OAuth Callback Parameters
  |--------------------------------------------------------------------------
  */

  const getChannelFromUrl = () => {
    if (typeof window === "undefined") {
      return {
        channel: null,
        status: null,
      };
    }

    const params = new URLSearchParams(
      window.location.search
    );

    return {
      channel: params.get("channel"),
      status: params.get("status"),
    };
  };

  /*
  |--------------------------------------------------------------------------
  | Setup Channel After OAuth
  |--------------------------------------------------------------------------
  |
  | URL returned by backend:
  |
  | /channel-configuration?channel=gmail&status=connected
  |
  | Flow:
  |
  | 1. /channels/ GET
  | 2. Find channel from returned JSON
  | 3. Show loader
  | 4. POST /channels/{channel_code}/setup-watch
  | 5. 200 => Connected
  | 6. Error => Custom error modal
  |
  */

  useEffect(() => {
    /*
     * Wait for /channels/ to finish.
     */
    if (loadingChannels) {
      return;
    }

    /*
     * No channels available.
     */
    if (!channels.length) {
      return;
    }

    const {
      channel: channelFromUrl,
      status,
    } = getChannelFromUrl();

    console.log(
      "[Channel Configuration] OAuth callback:",
      {
        channel: channelFromUrl,
        status,
      }
    );

    /*
     * Only run setup after successful OAuth.
     */
    if (
      !channelFromUrl ||
      status !== "connected"
    ) {
      return;
    }

    /*
     * Prevent duplicate calls during the same
     * page lifecycle.
     */
    if (setupAttemptedRef.current) {
      console.log(
        "[Channel Configuration] Setup already attempted."
      );

      return;
    }

    /*
     * Find channel from FIRST /channels/ API response.
     */
    const matchedChannel = channels.find(
      (item) =>
        item?.code?.toLowerCase() ===
        channelFromUrl.toLowerCase()
    );

    /*
     * Channel does not exist in configuration.
     */
    if (!matchedChannel) {
      console.error(
        `[Channel Configuration] Channel "${channelFromUrl}" was not found in /channels/.`
      );

      setSetupError(
        `The ${channelFromUrl} channel is not available for configuration.`
      );

      setShowErrorModal(true);

      return;
    }

    const channelCode = matchedChannel.code;

    /*
     * Mark BEFORE calling API.
     *
     * This prevents React Strict Mode from triggering
     * the POST twice.
     */
    setupAttemptedRef.current = true;

    /*
     * Show loader immediately.
     */
    setSetupError("");
    setShowErrorModal(false);
    setSettingUpChannel(channelCode);

    console.log(
      `[Channel Configuration] Starting setup for ${channelCode}`
    );

    const setupChannelAfterOAuth =
      async () => {
        try {
          /*
           * ----------------------------------------------------------
           * POST /channels/{channel_code}/setup-watch
           * ----------------------------------------------------------
           */

          const response = await fetch(
            `${API_BASE_URL}/channels/${channelCode}/setup-watch`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              credentials: "include",
            }
          );

          let data = null;

          try {
            data = await response.json();
          } catch {
            data = null;
          }

          console.log(
            "[Channel Configuration] setup-watch response:",
            response.status,
            data
          );

          /*
           * --------------------------------------------------------
           * SUCCESS
           * --------------------------------------------------------
           */

          if (response.ok) {
            console.log(
              `[Channel Configuration] ${channelCode} setup completed successfully.`
            );

            setConnectedChannels(
              (previous) => ({
                ...previous,
                [channelCode.toLowerCase()]:
                  true,
              })
            );

            /*
             * Stop loader.
             */
            setSettingUpChannel(null);

            /*
             * Remove OAuth query parameters.
             *
             * This prevents setup-watch from running again
             * if the user refreshes the page.
             */
            if (
              typeof window !==
              "undefined"
            ) {
              window.history.replaceState(
                {},
                document.title,
                "/channel-configuration"
              );
            }

            return;
          }

          /*
           * --------------------------------------------------------
           * BACKEND ERROR
           * --------------------------------------------------------
           *
           * DO NOT throw the error.
           *
           * We want our own popup instead of the Next.js
           * Runtime Error screen.
           */

          const backendMessage =
            data?.message ||
            data?.detail ||
            data?.error ||
            `Unable to complete channel setup (${response.status}).`;

          console.error(
            "[Channel Configuration] setup-watch failed:",
            backendMessage
          );

          /*
           * Stop loader.
           */
          setSettingUpChannel(null);

          /*
           * Show custom popup.
           */
          setSetupError(backendMessage);
          setShowErrorModal(true);

          /*
           * Allow Retry.
           */
          setupAttemptedRef.current = false;
        } catch (error) {
          /*
           * --------------------------------------------------------
           * NETWORK / JAVASCRIPT ERROR
           * --------------------------------------------------------
           */

          console.error(
            "[Channel Configuration] setup-watch error:",
            error
          );

          setSettingUpChannel(null);

          setSetupError(
            error?.message ||
              "Something went wrong while setting up your channel. Please try again."
          );

          setShowErrorModal(true);

          /*
           * Allow Retry.
           */
          setupAttemptedRef.current = false;
        }
      };

    setupChannelAfterOAuth();
  }, [channels, loadingChannels]);

  /*
  |--------------------------------------------------------------------------
  | Connect Channel
  |--------------------------------------------------------------------------
  |
  | POST /channels/{channel_code}/connect
  |
  | Backend returns:
  |
  | {
  |   "success": true,
  |   "authorization_url": "...",
  |   "message": "Redirect user to Google."
  | }
  |
  */

  const handleConnect = async (
    channel
  ) => {
    if (!channel?.code) {
      return;
    }

    const channelCode = channel.code;

    try {
      setConnectingChannel(channelCode);

      setSetupError("");
      setShowErrorModal(false);

      console.log(
        `[Channel Configuration] Connecting ${channelCode}`
      );

      const response = await fetch(
        `${API_BASE_URL}/channels/${channelCode}/connect`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      let data = null;

      try {
        data = await response.json();
      } catch {
        data = null;
      }

      console.log(
        "[Channel Configuration] connect response:",
        response.status,
        data
      );

      /*
       * ----------------------------------------------------------
       * API ERROR
       * ----------------------------------------------------------
       */

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.detail ||
          data?.error ||
          `Failed to connect channel (${response.status}).`;

        setSetupError(errorMessage);
        setShowErrorModal(true);

        return;
      }

      /*
       * ----------------------------------------------------------
       * AUTHORIZATION URL
       * ----------------------------------------------------------
       */

      const authorizationUrl =
        data?.authorization_url;

      if (!authorizationUrl) {
        setSetupError(
          "The authentication URL was not returned by the server."
        );

        setShowErrorModal(true);

        return;
      }

      /*
       * Redirect to Google.
       */
      window.location.href =
        authorizationUrl;
    } catch (error) {
      console.error(
        "[Channel Configuration] connect error:",
        error
      );

      setSetupError(
        error?.message ||
          "Unable to connect this channel. Please try again."
      );

      setShowErrorModal(true);
    } finally {
      setConnectingChannel(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Retry Setup
  |--------------------------------------------------------------------------
  */

  const handleRetrySetup = () => {
    setShowErrorModal(false);
    setSetupError("");

    /*
     * Allow setup-watch to execute again.
     */
    setupAttemptedRef.current = false;

    /*
     * Re-fetch channels.
     *
     * The OAuth URL remains present, so once /channels/
     * finishes the setup effect will execute again.
     */
    fetchChannels();
  };

  /*
  |--------------------------------------------------------------------------
  | Available Channel Codes
  |--------------------------------------------------------------------------
  */

  const availableChannelCodes =
    useMemo(() => {
      return new Set(
        channels.map((channel) =>
          channel?.code?.toLowerCase()
        )
      );
    }, [channels]);

  /*
  |--------------------------------------------------------------------------
  | Static Other Channels
  |--------------------------------------------------------------------------
  */

  const otherChannels = [
    {
      code: "whatsapp",
      name: "WhatsApp",
      description:
        "Connect WhatsApp to manage customer conversations directly from the CRM.",
      icon: MessageCircle,
    },
    {
      code: "meta",
      name: "Meta",
      description:
        "Connect Facebook and Instagram lead sources.",
      icon: Globe2,
    },
    {
      code: "ivr",
      name: "IVR",
      description:
        "Connect IVR for automated customer calls.",
      icon: Phone,
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | Gmail Channel
  |--------------------------------------------------------------------------
  */

  const gmailChannel =
    channels.find(
      (channel) =>
        channel?.code?.toLowerCase() ===
        "gmail"
    );

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme.pageBg,
        color: theme.textPrimary,
        padding: "32px 24px 60px",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* ============================================================
            HEADER
        ============================================================ */}

        <div
          style={{
            marginBottom: "34px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: theme.textSecondary,
              fontSize: "14px",
              marginBottom: "12px",
            }}
          >
            <Settings2
              size={16}
              color="#ff6600"
            />

            <span>Settings</span>

            <ArrowRight size={14} />

            <span>Channels</span>
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "34px",
              lineHeight: 1.2,
              fontWeight: 700,
              letterSpacing: "-0.02em",
            }}
          >
            Channel Configuration
          </h1>

          <p
            style={{
              margin: "12px 0 0",
              maxWidth: "850px",
              fontSize: "17px",
              lineHeight: 1.55,
              color: theme.textSecondary,
            }}
          >
            Connect and manage the communication
            channels your team uses to interact
            with customers and leads.
          </p>
        </div>

        {/* ============================================================
            MAIN LAYOUT
        ============================================================ */}

        <div
          className="channel-configuration-layout"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) 390px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* ==========================================================
              LEFT COLUMN
          ========================================================== */}

          <div>
            {/* ========================================================
                GMAIL
            ======================================================== */}

            <div
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow:
                  "0 2px 8px rgba(15, 23, 42, 0.02)",
              }}
            >
              {/* Header */}

              <div
                style={{
                  padding: "28px 30px",
                  borderBottom: `1px solid ${theme.border}`,
                  display: "flex",
                  alignItems: "center",
                  gap: "18px",
                }}
              >
                <div
                  style={{
                    width: "58px",
                    height: "58px",
                    borderRadius: "15px",
                    background: "#fff1e8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Mail
                    size={29}
                    color="#ff6600"
                    strokeWidth={2}
                  />
                </div>

                <div
                  style={{
                    flex: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <h2
                      style={{
                        margin: 0,
                        fontSize: "20px",
                        fontWeight: 650,
                      }}
                    >
                      Gmail
                    </h2>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 11px",
                        borderRadius: "999px",
                        background:
                          connectedChannels.gmail
                            ? "#ecfdf3"
                            : "#f1f3f5",
                        color:
                          connectedChannels.gmail
                            ? "#15803d"
                            : theme.textSecondary,
                        fontSize: "13px",
                        fontWeight: 500,
                      }}
                    >
                      {connectedChannels.gmail ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <CircleAlert size={14} />
                      )}

                      {connectedChannels.gmail
                        ? "Connected"
                        : "Not Connected"}
                    </div>
                  </div>

                  <p
                    style={{
                      margin: "7px 0 0",
                      color: theme.textSecondary,
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    {gmailChannel
                      ? getChannelDescription(
                          gmailChannel
                        )
                      : "Connect your Gmail account to manage customer emails directly from the CRM."}
                  </p>
                </div>
              </div>

              {/* Body */}

              {!connectedChannels.gmail ? (
                <div
                  style={{
                    padding: "30px",
                  }}
                >
                  <div
                    style={{
                      background: theme.mutedBg,
                      border: `1px solid ${theme.border}`,
                      borderRadius: "16px",
                      padding: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                        marginBottom: "22px",
                      }}
                    >
                      <div
                        style={{
                          width: "56px",
                          height: "56px",
                          borderRadius: "12px",
                          background: theme.cardBg,
                          border: `1px solid ${theme.border}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <GoogleLogo
                          size={25}
                        />
                      </div>

                      <div>
                        <h3
                          style={{
                            margin: 0,
                            fontSize: "17px",
                            fontWeight: 650,
                          }}
                        >
                          Connect with Google
                        </h3>

                        <p
                          style={{
                            margin: "5px 0 0",
                            fontSize: "14px",
                            lineHeight: 1.5,
                            color: theme.textSecondary,
                          }}
                        >
                          Securely connect your
                          Gmail account using Google
                          OAuth. You don't need to
                          enter or share your Gmail
                          password.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={
                        connectingChannel ===
                          "gmail" ||
                        !gmailChannel
                      }
                      onClick={() =>
                        gmailChannel &&
                        handleConnect(
                          gmailChannel
                        )
                      }
                      style={{
                        width: "100%",
                        height: "52px",
                        borderRadius: "13px",
                        border: `1px solid ${theme.border}`,
                        background: theme.cardBg,
                        color: theme.textPrimary,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                        fontSize: "16px",
                        fontWeight: 600,
                        cursor:
                          connectingChannel ===
                            "gmail" ||
                          !gmailChannel
                            ? "not-allowed"
                            : "pointer",
                        opacity:
                          connectingChannel ===
                          "gmail"
                            ? 0.7
                            : 1,
                        boxShadow:
                          "0 1px 2px rgba(15,23,42,0.05)",
                      }}
                    >
                      {connectingChannel ===
                      "gmail" ? (
                        <>
                          <RefreshCw
                            size={19}
                            style={{
                              animation:
                                "channelSpin 0.8s linear infinite",
                            }}
                          />

                          Connecting...
                        </>
                      ) : (
                        <>
                          <GoogleLogo
                            size={20}
                          />

                          Connect with Google
                        </>
                      )}
                    </button>
                  </div>

                  {/* Security information */}

                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      marginTop: "25px",
                      padding: "0 4px",
                    }}
                  >
                    <ShieldCheck
                      size={19}
                      color="#ff6600"
                      style={{
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    />

                    <p
                      style={{
                        margin: 0,
                        color: theme.textSecondary,
                        fontSize: "14px",
                        lineHeight: 1.55,
                      }}
                    >
                      Your Gmail password is never
                      shared with us. Google
                      securely handles authentication
                      and only the permissions you
                      approve will be granted to the
                      CRM.
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    padding: "30px",
                  }}
                >
                  <div
                    style={{
                      padding: "20px",
                      borderRadius: "14px",
                      background: "#ecfdf3",
                      border:
                        "1px solid #bbf7d0",
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                    }}
                  >
                    <CheckCircle2
                      size={25}
                      color="#16a34a"
                    />

                    <div>
                      <div
                        style={{
                          fontWeight: 650,
                          color: "#166534",
                        }}
                      >
                        Gmail connected
                        successfully
                      </div>

                      <div
                        style={{
                          marginTop: "4px",
                          fontSize: "14px",
                          color: "#15803d",
                        }}
                      >
                        Your Gmail account is
                        ready to use with the CRM.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================
                OTHER CHANNELS
            ======================================================== */}

            <div
              style={{
                marginTop: "34px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "20px",
                  fontWeight: 650,
                }}
              >
                Other Channels
              </h2>

              <p
                style={{
                  margin: "7px 0 20px",
                  color: theme.textSecondary,
                  fontSize: "16px",
                }}
              >
                More communication channels can be
                configured here.
              </p>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(3, minmax(0, 1fr))",
                  gap: "18px",
                }}
              >
                {otherChannels.map(
                  (channel) => {
                    const Icon = channel.icon;

                    const isAvailable =
                      availableChannelCodes.has(
                        channel.code
                      );

                    return (
                      <div
                        key={channel.code}
                        style={{
                          background:
                            theme.cardBg,
                          border: `1px solid ${theme.border}`,
                          borderRadius: "16px",
                          padding: "24px",
                          minHeight: "205px",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent:
                              "space-between",
                            alignItems:
                              "flex-start",
                          }}
                        >
                          <div
                            style={{
                              width: "52px",
                              height: "52px",
                              borderRadius: "13px",
                              background:
                                theme.mutedBg,
                              display: "flex",
                              alignItems:
                                "center",
                              justifyContent:
                                "center",
                            }}
                          >
                            <Icon
                              size={26}
                              color="#64748b"
                            />
                          </div>

                          <span
                            style={{
                              padding:
                                "5px 10px",
                              borderRadius:
                                "999px",
                              background:
                                isAvailable
                                  ? "#ecfdf3"
                                  : theme.mutedBg,
                              color:
                                isAvailable
                                  ? "#15803d"
                                  : theme.textSecondary,
                              fontSize: "12px",
                              fontWeight: 500,
                            }}
                          >
                            {isAvailable
                              ? "Available"
                              : "Coming Soon"}
                          </span>
                        </div>

                        <h3
                          style={{
                            margin:
                              "24px 0 8px",
                            fontSize: "16px",
                            fontWeight: 650,
                          }}
                        >
                          {channel.name}
                        </h3>

                        <p
                          style={{
                            margin: 0,
                            color:
                              theme.textSecondary,
                            fontSize: "14px",
                            lineHeight: 1.5,
                          }}
                        >
                          {channel.description}
                        </p>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>

          {/* ==========================================================
              RIGHT SIDEBAR
          ========================================================== */}

          <div>
            {/* Connection Status */}

            <div
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: "18px",
                padding: "25px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "13px",
                  marginBottom: "22px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    background: "#fff1e8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShieldCheck
                    size={24}
                    color="#ff6600"
                  />
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "17px",
                      fontWeight: 650,
                    }}
                  >
                    Connection Status
                  </h3>

                  <p
                    style={{
                      margin: "3px 0 0",
                      color:
                        theme.textSecondary,
                      fontSize: "13px",
                    }}
                  >
                    Current channel overview
                  </p>
                </div>
              </div>

              {/* Gmail */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  padding: "15px",
                  borderRadius: "13px",
                  background: theme.mutedBg,
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Mail
                    size={20}
                    color="#64748b"
                  />

                  <span>Gmail</span>
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    color:
                      connectedChannels.gmail
                        ? "#16a34a"
                        : theme.textSecondary,
                    fontWeight:
                      connectedChannels.gmail
                        ? 600
                        : 400,
                  }}
                >
                  {connectedChannels.gmail
                    ? "Connected"
                    : "Not connected"}
                </span>
              </div>

              {/* WhatsApp */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  padding: "15px",
                  borderRadius: "13px",
                  background: theme.mutedBg,
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <MessageCircle
                    size={20}
                    color="#64748b"
                  />

                  <span>WhatsApp</span>
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    color:
                      theme.textSecondary,
                  }}
                >
                  —
                </span>
              </div>

              {/* Meta */}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "space-between",
                  padding: "15px",
                  borderRadius: "13px",
                  background: theme.mutedBg,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <Globe2
                    size={20}
                    color="#64748b"
                  />

                  <span>Meta</span>
                </div>

                <span
                  style={{
                    fontSize: "13px",
                    color:
                      theme.textSecondary,
                  }}
                >
                  —
                </span>
              </div>
            </div>

            {/* About */}

            <div
              style={{
                background: theme.cardBg,
                border: `1px solid ${theme.border}`,
                borderRadius: "18px",
                padding: "25px",
                marginTop: "26px",
              }}
            >
              <h3
                style={{
                  margin: "0 0 15px",
                  fontSize: "17px",
                  fontWeight: 650,
                }}
              >
                About Channel Configuration
              </h3>

              <p
                style={{
                  margin: 0,
                  color: theme.textSecondary,
                  fontSize: "14px",
                  lineHeight: 1.65,
                }}
              >
                Connect your communication channels
                to bring customer conversations
                directly into your CRM. Once
                connected, your team can manage
                conversations, generate AI responses,
                and track customer interactions from
                one place.
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "11px",
                  marginTop: "20px",
                  padding: "15px",
                  borderRadius: "13px",
                  background: "#fff7ed",
                  color: theme.textSecondary,
                  fontSize: "13px",
                  lineHeight: 1.5,
                }}
              >
                <ShieldCheck
                  size={19}
                  color="#ff6600"
                  style={{
                    flexShrink: 0,
                    marginTop: "1px",
                  }}
                />

                <span>
                  Only administrators can configure
                  or disconnect communication
                  channels.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ==============================================================
          SETUP LOADER
      ============================================================== */}

      {settingUpChannel && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
            background:
              "rgba(15, 23, 42, 0.48)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: "390px",
              maxWidth:
                "calc(100vw - 32px)",
              background: theme.cardBg,
              borderRadius: "18px",
              padding: "34px",
              textAlign: "center",
              boxShadow:
                "0 25px 70px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                border:
                  "4px solid #e5e7eb",
                borderTopColor:
                  "#ff6600",
                margin:
                  "0 auto 22px",
                animation:
                  "channelSpin 0.8s linear infinite",
              }}
            />

            <h3
              style={{
                margin: "0 0 8px",
                fontSize: "19px",
                fontWeight: 650,
                color: theme.textPrimary,
              }}
            >
              Setting up your{" "}
              {settingUpChannel ===
              "gmail"
                ? "Gmail"
                : settingUpChannel}{" "}
              account
            </h3>

            <p
              style={{
                margin: 0,
                color: theme.textSecondary,
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Please wait while we finish
              configuring your account.
            </p>
          </div>
        </div>
      )}

      {/* ==============================================================
          ERROR MODAL
      ============================================================== */}

      {showErrorModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background:
              "rgba(15, 23, 42, 0.52)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            backdropFilter: "blur(4px)",
          }}
          onClick={() =>
            setShowErrorModal(false)
          }
        >
          <div
            style={{
              width: "430px",
              maxWidth: "100%",
              background: theme.cardBg,
              borderRadius: "18px",
              padding: "28px",
              boxShadow:
                "0 25px 70px rgba(0,0,0,0.25)",
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "13px",
                background: "#fef2f2",
                display: "flex",
                alignItems: "center",
                justifyContent:
                  "center",
                marginBottom: "18px",
              }}
            >
              <CircleAlert
                size={27}
                color="#dc2626"
              />
            </div>

            <h3
              style={{
                margin: "0 0 9px",
                fontSize: "19px",
                fontWeight: 650,
                color: theme.textPrimary,
              }}
            >
              Unable to complete setup
            </h3>

            <p
              style={{
                margin: "0 0 22px",
                fontSize: "14px",
                lineHeight: 1.6,
                color: theme.textSecondary,
                wordBreak: "break-word",
              }}
            >
              {setupError ||
                "Something went wrong while setting up your channel."}
            </p>

            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={() =>
                  setShowErrorModal(
                    false
                  )
                }
                style={{
                  flex: 1,
                  height: "44px",
                  borderRadius: "10px",
                  border: `1px solid ${theme.border}`,
                  background: theme.cardBg,
                  color: theme.textPrimary,
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={
                  handleRetrySetup
                }
                style={{
                  flex: 1,
                  height: "44px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "#ff6600",
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    "center",
                  gap: "8px",
                }}
              >
                <RefreshCw size={16} />
                Retry
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==============================================================
          GLOBAL ANIMATION
      ============================================================== */}

      <style jsx global>{`
        @keyframes channelSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 1050px) {
          .channel-configuration-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default ChannelConfiguration;