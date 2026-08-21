"use client";

import { useEffect, useMemo, useState } from "react";
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
  X,
  Plus,
  Unplug,
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
| Primary Theme Color
|--------------------------------------------------------------------------
*/

const PRIMARY_COLOR = "oklch(54.6% 0.245 262.881)";

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

  const [loadingChannels, setLoadingChannels] =
    useState(true);

  const [connectingChannel, setConnectingChannel] =
    useState(null);

  /*
   * Used for the subscribe/setup-watch loader.
   */
  const [settingUpChannel, setSettingUpChannel] =
    useState(null);

  /*
   * Connection state of channels.
   */
  const [connectedChannels, setConnectedChannels] =
    useState({});

  /*
   * Connection currently being disconnected.
   */
  const [disconnectingConnectionId, setDisconnectingConnectionId] =
    useState(null);

  /*
   * Error popup.
   */
  const [setupError, setSetupError] = useState("");

  const [showErrorModal, setShowErrorModal] =
    useState(false);

  /*
   * OAuth success popup.
   *
   * This is shown ONLY when the user returns from Google.
   *
   * setup-watch is NOT automatically called anymore.
   */
  const [showOAuthSuccess, setShowOAuthSuccess] =
    useState(false);

  /*
  |--------------------------------------------------------------------------
  | Fetch All Channels
  |--------------------------------------------------------------------------
  |
  | GET /channels/all
  |
  | Response:
  |
  | [
  |   {
  |     "id": 1,
  |     "code": "gmail",
  |     "name": "Gmail",
  |     "connection_status": "connected",
  |     "connected_accounts": [
  |       {
  |         "id": 24,
  |         "provider_identifier": "akashwork0252@gmail.com",
  |         "messagesubscription": true
  |       }
  |     ]
  |   }
  | ]
  |
  |--------------------------------------------------------------------------
  */

  const fetchChannels = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoadingChannels(true);
      }

      const response = await fetch(
        `${API_BASE_URL}/channels/all`,
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
        "[Channel Configuration] /channels/all:",
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

      if (!Array.isArray(data)) {
        setChannels([]);
        setConnectedChannels({});
        return;
      }

      setChannels(data);

      /*
       * Determine channel connection state from API.
       */
      const initialConnectedState = {};

      data.forEach((channel) => {
        if (
          channel?.code &&
          String(channel?.connection_status || "")
            .toLowerCase() === "connected"
        ) {
          initialConnectedState[
            channel.code.toLowerCase()
          ] = true;
        }
      });

      setConnectedChannels(initialConnectedState);
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
      if (showLoader) {
        setLoadingChannels(false);
      }
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Initial Fetch
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchChannels(true);
  }, []);

  /*
  |--------------------------------------------------------------------------
  | URL Parameters
  |--------------------------------------------------------------------------
  */

  const getChannelFromUrl = () => {
    if (typeof window === "undefined") {
      return null;
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
  | OAuth Redirect Handling
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | We DO NOT call setup-watch here.
  |
  | After Google redirects back:
  |
  | /channel-configuration?channel=gmail&status=connected
  |
  | we simply show the Gmail connected popup.
  |
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (loadingChannels || !channels.length) {
      return;
    }

    const urlData = getChannelFromUrl();

    if (!urlData) {
      return;
    }

    const {
      channel: channelFromUrl,
      status,
    } = urlData;

    if (
      !channelFromUrl ||
      status !== "connected"
    ) {
      return;
    }

    /*
     * Only show this popup for Gmail OAuth.
     */
    if (
      channelFromUrl.toLowerCase() === "gmail"
    ) {
      setShowOAuthSuccess(true);
    }

    /*
     * Remove URL parameters.
     *
     * This is important because we don't want the
     * OAuth success popup to appear again after refresh.
     */
    if (typeof window !== "undefined") {
      window.history.replaceState(
        {},
        document.title,
        "/channel-configuration"
      );
    }
  }, [channels, loadingChannels]);

  /*
  |--------------------------------------------------------------------------
  | Connect Channel
  |--------------------------------------------------------------------------
  |
  | POST /channels/{channel_code}/connect
  |--------------------------------------------------------------------------
  */

  const handleConnect = async (channel) => {
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
      window.location.href = authorizationUrl;
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
  | Subscribe Gmail Account
  |--------------------------------------------------------------------------
  |
  | POST /channels/gmail/setup-watch
  |
  | Body:
  |
  | {
  |   "identifier": "email@gmail.com"
  | }
  |
  |--------------------------------------------------------------------------
  */

  const handleSubscribe = async (account) => {
    const identifier =
      account?.provider_identifier;

    if (!identifier) {
      setSetupError(
        "The Gmail account identifier is missing."
      );

      setShowErrorModal(true);

      return;
    }

    try {
      /*
       * Close OAuth popup if it is still open.
       */
      setShowOAuthSuccess(false);

      setSetupError("");
      setShowErrorModal(false);

      /*
       * Show loader.
       */
      setSettingUpChannel("gmail");

      console.log(
        "[Channel Configuration] Subscribing Gmail account:",
        identifier
      );

      const response = await fetch(
        `${API_BASE_URL}/channels/gmail/setup-watch`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            identifier,
          }),
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
       * --------------------------------------------------------------
       * ERROR
       * --------------------------------------------------------------
       */

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.detail ||
          data?.error ||
          `Unable to subscribe this Gmail account (${response.status}).`;

        console.error(
          "[Channel Configuration] setup-watch failed:",
          errorMessage
        );

        setSettingUpChannel(null);

        setSetupError(errorMessage);
        setShowErrorModal(true);

        return;
      }

      /*
       * --------------------------------------------------------------
       * SUCCESS
       * --------------------------------------------------------------
       *
       * Refresh /channels/all so that the new
       * messagesubscription value comes from backend.
       */

      await fetchChannels(false);

      /*
       * Stop loader.
       */
      setSettingUpChannel(null);

      console.log(
        "[Channel Configuration] Gmail subscription successful."
      );
    } catch (error) {
      console.error(
        "[Channel Configuration] setup-watch error:",
        error
      );

      setSettingUpChannel(null);

      setSetupError(
        error?.message ||
          "Something went wrong while subscribing this Gmail account. Please try again."
      );

      setShowErrorModal(true);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Disconnect Gmail Account
  |--------------------------------------------------------------------------
  |
  | POST /channels/{connection_id}/disconnect
  |--------------------------------------------------------------------------
  */

  const handleDisconnect = async (account) => {
    const connectionId = account?.id;

    if (!connectionId) {
      setSetupError(
        "The Gmail connection ID is missing."
      );

      setShowErrorModal(true);

      return;
    }

    try {
      setDisconnectingConnectionId(connectionId);

      setSetupError("");
      setShowErrorModal(false);

      console.log(
        "[Channel Configuration] Disconnecting Gmail connection:",
        connectionId
      );

      const response = await fetch(
        `${API_BASE_URL}/channels/${connectionId}/disconnect`,
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
        "[Channel Configuration] disconnect response:",
        response.status,
        data
      );

      if (!response.ok) {
        const errorMessage =
          data?.message ||
          data?.detail ||
          data?.error ||
          `Failed to disconnect Gmail account (${response.status}).`;

        setSetupError(errorMessage);
        setShowErrorModal(true);

        return;
      }

      /*
       * Refresh account list.
       */
      await fetchChannels(false);
    } catch (error) {
      console.error(
        "[Channel Configuration] disconnect error:",
        error
      );

      setSetupError(
        error?.message ||
          "Unable to disconnect this Gmail account. Please try again."
      );

      setShowErrorModal(true);
    } finally {
      setDisconnectingConnectionId(null);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Retry API
  |--------------------------------------------------------------------------
  */

  const handleRetrySetup = () => {
    setShowErrorModal(false);

    fetchChannels(true);
  };

  /*
  |--------------------------------------------------------------------------
  | Available Channel Codes
  |--------------------------------------------------------------------------
  */

  const availableChannelCodes = useMemo(() => {
    return new Set(
      channels
        .map((channel) =>
          channel?.code?.toLowerCase()
        )
        .filter(Boolean)
    );
  }, [channels]);

  /*
  |--------------------------------------------------------------------------
  | Gmail Channel
  |--------------------------------------------------------------------------
  */

  const gmailChannel = channels.find(
    (channel) =>
      channel?.code?.toLowerCase() === "gmail"
  );

  /*
  |--------------------------------------------------------------------------
  | Gmail Connected State
  |--------------------------------------------------------------------------
  */

  const isGmailConnected =
    connectedChannels.gmail === true;

  /*
  |--------------------------------------------------------------------------
  | Connected Gmail Accounts
  |--------------------------------------------------------------------------
  */

  const connectedGmailAccounts =
    Array.isArray(
      gmailChannel?.connected_accounts
    )
      ? gmailChannel.connected_accounts
      : [];

  /*
  |--------------------------------------------------------------------------
  | Other Channels
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
  | Loading Screen
  |--------------------------------------------------------------------------
  */

  if (loadingChannels) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-4"
        style={{
          backgroundColor: theme.pageBg,
          color: theme.textPrimary,
        }}
      >
        <div
          className="flex items-center gap-2.5 text-[13px]"
          style={{
            color: theme.textSecondary,
          }}
        >
          <RefreshCw
            size={17}
            className="animate-spin"
          />

          Loading channels...
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <div
        className="min-h-screen w-full"
        style={{
          backgroundColor: theme.pageBg,
          color: theme.textPrimary,
        }}
      >
        <div className="mx-auto w-full max-w-[1240px] px-4 py-6 sm:px-6 sm:py-7 lg:px-8">

          {/* ============================================================
              HEADER
          ============================================================ */}

          <div className="mb-7">
            <div className="mb-2 flex items-center gap-2 text-[13px]">
              <Settings2
                size={17}
                style={{
                  color: PRIMARY_COLOR,
                }}
              />

              <span
                className="font-medium"
                style={{
                  color: theme.textSecondary,
                }}
              >
                Settings
              </span>

              <ArrowRight
                size={13}
                style={{
                  color: theme.textSecondary,
                }}
              />

              <span
                className="font-medium"
                style={{
                  color: theme.textSecondary,
                }}
              >
                Channels
              </span>
            </div>

            <h1 className="text-[29px] font-semibold leading-tight tracking-tight sm:text-[30px]">
              Channel Configuration
            </h1>

            <p
              className="mt-2 max-w-[850px] text-[14px] leading-6 sm:text-[15px]"
              style={{
                color: theme.textSecondary,
              }}
            >
              Connect and manage the communication
              channels your team uses to interact with
              customers and leads.
            </p>
          </div>

          {/* ============================================================
              MAIN GRID
          ============================================================ */}

          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_330px]">

            {/* ==========================================================
                LEFT CONTENT
            ========================================================== */}

            <div>

              {/* ========================================================
                  GMAIL CARD
              ======================================================== */}

              <div
                className="overflow-hidden rounded-[16px] border"
                style={{
                  backgroundColor: theme.cardBg,
                  borderColor: theme.border,
                }}
              >

                {/* Gmail Header */}

                <div
                  className="flex items-center gap-3.5 border-b px-5 py-5 sm:px-[22px]"
                  style={{
                    borderColor: theme.border,
                  }}
                >
                  <div
                    className="flex h-[50px] w-[50px] shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor:
                        "rgba(148,163,184,0.10)",
                    }}
                  >
                    <Mail
                      size={24}
                      strokeWidth={2}
                      color={
                        isGmailConnected
                          ? PRIMARY_COLOR
                          : theme.textSecondary
                      }
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h2 className="text-[17px] font-semibold">
                        Gmail
                      </h2>

                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-[5px] text-[12px] font-medium"
                        style={
                          isGmailConnected
                            ? {
                                backgroundColor:
                                  `${PRIMARY_COLOR}12`,
                                color:
                                  PRIMARY_COLOR,
                              }
                            : {
                                backgroundColor:
                                  "rgba(148,163,184,0.12)",
                                color:
                                  theme.textSecondary,
                              }
                        }
                      >
                        {isGmailConnected ? (
                          <CheckCircle2 size={12} />
                        ) : (
                          <CircleAlert size={12} />
                        )}

                        {isGmailConnected
                          ? "Connected"
                          : "Not Connected"}
                      </span>
                    </div>

                    <p
                      className="mt-1 text-[13px] leading-5 sm:text-[14px]"
                      style={{
                        color:
                          theme.textSecondary,
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

                {/* ======================================================
                    SETUP LOADER
                ====================================================== */}

                {settingUpChannel === "gmail" ? (
                  <div className="p-5 sm:p-[22px]">
                    <div
                      className="flex min-h-[160px] flex-col items-center justify-center rounded-[13px] border px-5 py-8 text-center"
                      style={{
                        backgroundColor:
                          theme.mutedBg,
                        borderColor:
                          theme.border,
                      }}
                    >
                      <RefreshCw
                        size={27}
                        className="mb-3 animate-spin"
                        style={{
                          color:
                            PRIMARY_COLOR,
                        }}
                      />

                      <h3 className="text-[16px] font-semibold">
                        Setting up your account
                      </h3>

                      <p
                        className="mt-1.5 max-w-[420px] text-[12px] leading-5"
                        style={{
                          color:
                            theme.textSecondary,
                        }}
                      >
                        Your Gmail subscription is
                        being configured. We are
                        finishing the setup so your
                        CRM can receive emails.
                      </p>
                    </div>
                  </div>
                ) : !isGmailConnected ? (

                  /* ====================================================
                     NOT CONNECTED
                  ==================================================== */

                  <div className="p-5 sm:p-[22px]">

                    <div
                      className="rounded-[13px] border p-5"
                      style={{
                        backgroundColor:
                          theme.mutedBg,
                        borderColor:
                          theme.border,
                      }}
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[10px] border"
                          style={{
                            backgroundColor:
                              theme.cardBg,
                            borderColor:
                              theme.border,
                          }}
                        >
                          <GoogleLogo size={22} />
                        </div>

                        <div>
                          <h3 className="text-[15px] font-semibold">
                            Connect with Google
                          </h3>

                          <p
                            className="mt-1 text-[12px] leading-5"
                            style={{
                              color:
                                theme.textSecondary,
                            }}
                          >
                            Securely connect your
                            Gmail account using
                            Google OAuth. You don't
                            need to enter or share
                            your Gmail password.
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
                        className="mt-5 flex h-[46px] w-full items-center justify-center gap-2 rounded-[11px] border text-[14px] font-semibold shadow-sm transition hover:shadow disabled:cursor-not-allowed disabled:opacity-60"
                        style={{
                          backgroundColor:
                            theme.cardBg,
                          borderColor:
                            theme.border,
                          color:
                            theme.textPrimary,
                        }}
                      >
                        {connectingChannel ===
                        "gmail" ? (
                          <>
                            <RefreshCw
                              size={16}
                              className="animate-spin"
                              style={{
                                color:
                                  PRIMARY_COLOR,
                              }}
                            />

                            Connecting...
                          </>
                        ) : (
                          <>
                            <GoogleLogo
                              size={18}
                            />

                            Connect with Google
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-[18px] flex items-start gap-2 px-1">
                      <ShieldCheck
                        size={17}
                        className="mt-0.5 shrink-0"
                        style={{
                          color:
                            PRIMARY_COLOR,
                        }}
                      />

                      <p
                        className="text-[12px] leading-[1.5]"
                        style={{
                          color:
                            theme.textSecondary,
                        }}
                      >
                        Your Gmail password is
                        never shared with us.
                        Google securely handles
                        authentication and only the
                        permissions you approve
                        will be granted to the CRM.
                      </p>
                    </div>

                  </div>
                ) : (

                  /* ====================================================
                     CONNECTED STATE
                  ==================================================== */

                  <div className="p-5 sm:p-[22px]">

                    {/* ==================================================
                        CONNECTED EMAIL ACCOUNTS
                    ================================================== */}

                    <div>

                      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                          <h3 className="text-[14px] font-semibold">
                            Connected email accounts
                          </h3>

                          <p
                            className="mt-0.5 text-[12px]"
                            style={{
                              color:
                                theme.textSecondary,
                            }}
                          >
                            Gmail accounts connected
                            to your CRM.
                          </p>
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
                          className="inline-flex h-9 w-full items-center justify-center gap-1.5 rounded-lg border px-3 text-[12px] font-semibold transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                          style={{
                            borderColor:
                              PRIMARY_COLOR,
                            color:
                              PRIMARY_COLOR,
                            backgroundColor:
                              theme.cardBg,
                          }}
                        >
                          {connectingChannel ===
                          "gmail" ? (
                            <>
                              <RefreshCw
                                size={14}
                                className="animate-spin"
                              />
                              Connecting...
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              Connect another
                            </>
                          )}
                        </button>

                      </div>

                      {connectedGmailAccounts.length >
                      0 ? (
                        <div className="space-y-2">

                          {connectedGmailAccounts.map(
                            (account, index) => {

                              const isSubscribed =
                                account?.messagesubscription ===
                                true;

                              const isDisconnecting =
                                disconnectingConnectionId ===
                                account?.id;

                              return (
                                <div
                                  key={
                                    account?.id ??
                                    `${account?.provider_identifier}-${index}`
                                  }
                                  className="flex flex-col gap-3 rounded-[11px] border px-3.5 py-3 sm:flex-row sm:items-center"
                                  style={{
                                    backgroundColor:
                                      theme.mutedBg,
                                    borderColor:
                                      theme.border,
                                  }}
                                >

                                  {/* Account Icon */}

                                  <div
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                                    style={{
                                      backgroundColor:
                                        theme.cardBg,
                                    }}
                                  >
                                    <Mail
                                      size={17}
                                      style={{
                                        color:
                                          PRIMARY_COLOR,
                                      }}
                                    />
                                  </div>

                                  {/* Email */}

                                  <div className="min-w-0 flex-1">
                                    <p className="truncate text-[13px] font-medium">
                                      {account?.provider_identifier ||
                                        "Gmail account"}
                                    </p>

                                    <p
                                      className="mt-0.5 text-[11px]"
                                      style={{
                                        color:
                                          theme.textSecondary,
                                      }}
                                    >
                                      Connected
                                    </p>
                                  </div>

                                  {/* Actions */}

                                  <div className="flex w-full items-center justify-end gap-2 sm:w-auto">

                                    {/* Subscribe */}

                                    {isSubscribed ? (
                                      <span
                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-medium"
                                        style={{
                                          backgroundColor:
                                            `${PRIMARY_COLOR}12`,
                                          color:
                                            PRIMARY_COLOR,
                                        }}
                                      >
                                        <CheckCircle2
                                          size={13}
                                        />

                                        Subscribed
                                      </span>
                                    ) : (
                                      <button
                                        type="button"
                                        disabled={
                                          settingUpChannel ===
                                          "gmail"
                                        }
                                        onClick={() =>
                                          handleSubscribe(
                                            account
                                          )
                                        }
                                        className="inline-flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-semibold transition bg-blue-600 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                        style={{
                                          borderColor:
                                            PRIMARY_COLOR,
                                          color:
                                            "White",
                                        }}
                                      >
                                        <Plus
                                          size={13}
                                        />

                                        Subscribe
                                      </button>
                                    )}

                                    {/* Disconnect */}

                                    <button
                                      type="button"
                                      disabled={
                                        isDisconnecting
                                      }
                                      onClick={() =>
                                        handleDisconnect(
                                          account
                                        )
                                      }
                                      className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-slate-300 px-2.5 text-[11px] font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                                    >
                                      {isDisconnecting ? (
                                        <RefreshCw
                                          size={13}
                                          className="animate-spin"
                                        />
                                      ) : (
                                        <Unplug
                                          size={13}
                                        />
                                      )}

                                      {isDisconnecting
                                        ? "Disconnecting..."
                                        : "Disconnect"}
                                    </button>

                                  </div>
                                </div>
                              );
                            }
                          )}

                        </div>
                      ) : (
                        <div
                          className="rounded-[11px] border px-4 py-5 text-center text-[12px]"
                          style={{
                            backgroundColor:
                              theme.mutedBg,
                            borderColor:
                              theme.border,
                            color:
                              theme.textSecondary,
                          }}
                        >
                          No Gmail accounts are
                          connected yet.
                        </div>
                      )}

                    </div>

                  </div>
                )}

              </div>

              {/* ========================================================
                  OTHER CHANNELS
              ======================================================== */}

              <div className="mt-7">

                <h2 className="text-[18px] font-semibold">
                  Other Channels
                </h2>

                <p
                  className="mt-1.5 mb-4 text-[13px] leading-5"
                  style={{
                    color:
                      theme.textSecondary,
                  }}
                >
                  More communication channels can
                  be configured here.
                </p>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

                  {otherChannels.map((channel) => {
                    const Icon = channel.icon;

                    const isAvailable =
                      availableChannelCodes.has(
                        channel.code
                      );

                    return (
                      <div
                        key={channel.code}
                        className="min-h-[190px] rounded-[16px] border p-[18px]"
                        style={{
                          backgroundColor:
                            theme.cardBg,
                          borderColor:
                            theme.border,
                        }}
                      >

                        <div className="flex items-start justify-between">

                          <div
                            className="flex h-11 w-11 items-center justify-center rounded-[11px]"
                            style={{
                              backgroundColor:
                                theme.mutedBg,
                            }}
                          >
                            <Icon
                              size={21}
                              style={{
                                color:
                                  theme.textSecondary,
                              }}
                            />
                          </div>

                          <span
                            className="rounded-full px-2.5 py-1 text-[10px] font-medium"
                            style={{
                              backgroundColor:
                                theme.mutedBg,
                              color:
                                theme.textSecondary,
                            }}
                          >
                            {isAvailable
                              ? "Available"
                              : "Coming Soon"}
                          </span>

                        </div>

                        <h3 className="mt-[18px] text-[14px] font-semibold">
                          {channel.name}
                        </h3>

                        <p
                          className="mt-1.5 text-[12px] leading-[1.5]"
                          style={{
                            color:
                              theme.textSecondary,
                          }}
                        >
                          {channel.description}
                        </p>

                      </div>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* ==========================================================
                RIGHT SIDEBAR
            ========================================================== */}

            <div className="flex flex-col gap-5">

              {/* ========================================================
                  CONNECTION STATUS
              ======================================================== */}

              <div
                className="rounded-[16px] border p-5"
                style={{
                  backgroundColor:
                    theme.cardBg,
                  borderColor:
                    theme.border,
                }}
              >

                <div className="mb-4 flex items-center gap-2.5">

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[10px]"
                    style={{
                      backgroundColor:
                        `${PRIMARY_COLOR}12`,
                    }}
                  >
                    <ShieldCheck
                      size={20}
                      style={{
                        color:
                          PRIMARY_COLOR,
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="text-[15px] font-semibold">
                      Connection Status
                    </h3>

                    <p
                      className="mt-0.5 text-[11px]"
                      style={{
                        color:
                          theme.textSecondary,
                      }}
                    >
                      Current channel overview
                    </p>
                  </div>

                </div>

                {/* Gmail */}

                <div
                  className="mb-2 flex items-center justify-between rounded-[11px] px-3 py-3"
                  style={{
                    backgroundColor:
                      theme.mutedBg,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Mail
                      size={17}
                      style={{
                        color:
                          theme.textSecondary,
                      }}
                    />

                    <span className="text-[13px]">
                      Gmail
                    </span>
                  </div>

                  <span
                    className="text-[11px] font-medium"
                    style={{
                      color:
                        isGmailConnected
                          ? PRIMARY_COLOR
                          : theme.textSecondary,
                    }}
                  >
                    {isGmailConnected
                      ? "Connected"
                      : "Not connected"}
                  </span>
                </div>

                {/* WhatsApp */}

                <div
                  className="mb-2 flex items-center justify-between rounded-[11px] px-3 py-3"
                  style={{
                    backgroundColor:
                      theme.mutedBg,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <MessageCircle
                      size={17}
                      style={{
                        color:
                          theme.textSecondary,
                      }}
                    />

                    <span className="text-[13px]">
                      WhatsApp
                    </span>
                  </div>

                  <span
                    className="text-[11px]"
                    style={{
                      color:
                        theme.textSecondary,
                    }}
                  >
                    —
                  </span>
                </div>

                {/* Meta */}

                <div
                  className="flex items-center justify-between rounded-[11px] px-3 py-3"
                  style={{
                    backgroundColor:
                      theme.mutedBg,
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Globe2
                      size={17}
                      style={{
                        color:
                          theme.textSecondary,
                      }}
                    />

                    <span className="text-[13px]">
                      Meta
                    </span>
                  </div>

                  <span
                    className="text-[11px]"
                    style={{
                      color:
                        theme.textSecondary,
                    }}
                  >
                    —
                  </span>
                </div>

              </div>

              {/* ========================================================
                  ABOUT
              ======================================================== */}

              <div
                className="rounded-[16px] border p-5"
                style={{
                  backgroundColor:
                    theme.cardBg,
                  borderColor:
                    theme.border,
                }}
              >

                <h3 className="text-[15px] font-semibold">
                  About Channel Configuration
                </h3>

                <p
                  className="mt-2.5 text-[12px] leading-[1.6]"
                  style={{
                    color:
                      theme.textSecondary,
                  }}
                >
                  Connect your communication
                  channels to bring customer
                  conversations directly into your
                  CRM. Once connected, your team can
                  manage conversations, generate AI
                  responses, and track customer
                  interactions from one place.
                </p>

                <div
                  className="mt-3.5 flex items-start gap-2.5 rounded-[11px] p-3"
                  style={{
                    backgroundColor:
                      `${PRIMARY_COLOR}0b`,
                  }}
                >
                  <ShieldCheck
                    size={16}
                    className="mt-0.5 shrink-0"
                    style={{
                      color:
                        PRIMARY_COLOR,
                    }}
                  />

                  <p
                    className="text-[11px] leading-[1.5]"
                    style={{
                      color:
                        theme.textSecondary,
                    }}
                  >
                    Only administrators can
                    configure or disconnect
                    communication channels.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          OAUTH SUCCESS POPUP
      ================================================================ */}

      {showOAuthSuccess && (
        <div className="fixed inset-0 z-[9997] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-[3px]">

          <div
            className="w-full max-w-[410px] rounded-[16px] border p-5 shadow-2xl"
            style={{
              backgroundColor:
                theme.cardBg,
              borderColor:
                theme.border,
            }}
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-2.5">

                <div
                  className="flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      `${PRIMARY_COLOR}12`,
                  }}
                >
                  <CheckCircle2
                    size={19}
                    style={{
                      color:
                        PRIMARY_COLOR,
                    }}
                  />
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold">
                    Gmail connected
                  </h3>

                  <p
                    className="mt-0.5 text-[11px]"
                    style={{
                      color:
                        theme.textSecondary,
                    }}
                  >
                    Google authorization successful
                  </p>
                </div>

              </div>

              <button
                type="button"
                aria-label="Close"
                onClick={() =>
                  setShowOAuthSuccess(false)
                }
                className="rounded-md p-1 transition hover:bg-slate-100"
                style={{
                  color:
                    theme.textSecondary,
                }}
              >
                <X size={17} />
              </button>

            </div>

            <div
              className="mt-4 rounded-[11px] border px-3.5 py-3"
              style={{
                backgroundColor:
                  `${PRIMARY_COLOR}08`,
                borderColor:
                  `${PRIMARY_COLOR}25`,
              }}
            >
              <p
                className="text-[12px] leading-[1.55]"
                style={{
                  color:
                    theme.textPrimary,
                }}
              >
                Your Gmail account has been
                connected successfully. If you
                want emails and leads to be pushed
                into the CRM, click{" "}
                <strong>Subscribe</strong> for the
                Gmail account you want to use.
              </p>
            </div>

            <div className="mt-4 flex justify-end">

              <button
                type="button"
                onClick={() =>
                  setShowOAuthSuccess(false)
                }
                className="h-9 rounded-lg px-3.5 text-[12px] font-semibold text-white transition hover:opacity-90"
                style={{
                  backgroundColor:
                    PRIMARY_COLOR,
                }}
              >
                Got it
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ================================================================
          SETUP LOADER
      ================================================================ */}

      {settingUpChannel && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-[3px]">

          <div
            className="w-full max-w-[360px] rounded-[16px] p-7 text-center shadow-2xl"
            style={{
              backgroundColor:
                theme.cardBg,
            }}
          >

            <RefreshCw
              size={29}
              className="mx-auto mb-3 animate-spin"
              style={{
                color:
                  PRIMARY_COLOR,
              }}
            />

            <h3 className="text-[17px] font-semibold">
              Setting up your account
            </h3>

            <p
              className="mx-auto mt-1.5 max-w-[300px] text-[12px] leading-5"
              style={{
                color:
                  theme.textSecondary,
              }}
            >
              Your Gmail account has been
              connected. We are finishing the
              setup so your CRM can receive
              emails.
            </p>

          </div>
        </div>
      )}

      {/* ================================================================
          ERROR MODAL
      ================================================================ */}

      {showErrorModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-[3px]">

          <div
            className="w-full max-w-[390px] rounded-[16px] border p-5 shadow-2xl"
            style={{
              backgroundColor:
                theme.cardBg,
              borderColor:
                theme.border,
            }}
          >

            <div className="flex items-start justify-between gap-4">

              <div className="flex items-center gap-2.5">

                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50">
                  <CircleAlert
                    size={19}
                    className="text-red-600"
                  />
                </div>

                <div>
                  <h3 className="text-[15px] font-semibold">
                    Unable to complete request
                  </h3>

                  <p
                    className="mt-0.5 text-[11px]"
                    style={{
                      color:
                        theme.textSecondary,
                    }}
                  >
                    Channel configuration
                  </p>
                </div>

              </div>

              <button
                type="button"
                aria-label="Close error"
                onClick={() =>
                  setShowErrorModal(false)
                }
                className="rounded-md p-1 transition hover:bg-slate-100"
                style={{
                  color:
                    theme.textSecondary,
                }}
              >
                <X size={17} />
              </button>

            </div>

            <div className="mt-4 rounded-[10px] border border-red-200 bg-red-50 px-3 py-2.5 text-[12px] leading-[1.55] text-red-800">
              {setupError ||
                "Unable to complete the channel configuration."}
            </div>

            <div className="mt-4 flex justify-end gap-2">

              <button
                type="button"
                onClick={() =>
                  setShowErrorModal(false)
                }
                className="h-9 rounded-lg border px-3.5 text-[12px] font-medium transition hover:bg-slate-50"
                style={{
                  borderColor:
                    theme.border,
                  backgroundColor:
                    theme.cardBg,
                  color:
                    theme.textPrimary,
                }}
              >
                Close
              </button>

              <button
                type="button"
                onClick={
                  handleRetrySetup
                }
                className="inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-[12px] font-semibold text-white transition hover:opacity-90"
                style={{
                  backgroundColor:
                    PRIMARY_COLOR,
                }}
              >
                <RefreshCw size={13} />

                Try Again
              </button>

            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default ChannelConfiguration;