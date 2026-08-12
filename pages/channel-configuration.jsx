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

  const [connectingChannel, setConnectingChannel] = useState(null);

  const [settingUpChannel, setSettingUpChannel] = useState(null);

  const [connectedChannels, setConnectedChannels] = useState({});

  const [setupError, setSetupError] = useState("");

  const [showErrorModal, setShowErrorModal] = useState(false);

  /*
  |--------------------------------------------------------------------------
  | Fetch All Channels
  |--------------------------------------------------------------------------
  |
  | GET /channels/all
  |
  */

  const fetchChannels = async () => {
    try {
      setLoadingChannels(true);

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
        return;
      }

      setChannels(data);

      /*
       * Initial connection state.
       *
       * If the user directly opens:
       *
       * /channel-configuration
       *
       * and /channels/all returns:
       *
       * connection_status: "connected"
       *
       * Gmail will immediately be shown as connected.
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
  | Get URL Parameters
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
  | Setup Channel After OAuth
  |--------------------------------------------------------------------------
  |
  | OAuth:
  |
  | /channel-configuration?channel=gmail&status=connected
  |
  | Then:
  |
  | POST /channels/gmail/setup-watch
  |
  */

  useEffect(() => {
    if (loadingChannels) {
      return;
    }

    if (!channels.length) {
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

    /*
     * Only execute after OAuth redirect.
     */

    if (
      !channelFromUrl ||
      status !== "connected"
    ) {
      return;
    }

    const setupKey =
      `channel_setup_${channelFromUrl.toLowerCase()}`;

    /*
     * Already completed.
     */

    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem(setupKey) === "completed"
    ) {
      return;
    }

    /*
     * Already running.
     */

    if (
      typeof window !== "undefined" &&
      sessionStorage.getItem(setupKey) === "running"
    ) {
      return;
    }

    const setupChannelAfterOAuth = async () => {
      try {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(
            setupKey,
            "running"
          );
        }

        /*
         * Find channel from /channels/all.
         */

        const matchedChannel = channels.find(
          (item) =>
            item?.code?.toLowerCase() ===
            channelFromUrl.toLowerCase()
        );

        if (!matchedChannel) {
          throw new Error(
            `The ${channelFromUrl} channel is not available for configuration.`
          );
        }

        const channelCode = matchedChannel.code;

        /*
         * SHOW LOADER
         */

        setSettingUpChannel(channelCode);

        console.log(
          `[Channel Configuration] Setting up ${channelCode}`
        );

        /*
         * POST /channels/{channel_code}/setup-watch
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
          "[Channel Configuration] setup-watch:",
          response.status,
          data
        );

        /*
         * SUCCESS
         */

        if (response.ok) {
          if (typeof window !== "undefined") {
            sessionStorage.setItem(
              setupKey,
              "completed"
            );
          }

          setConnectedChannels((previous) => ({
            ...previous,
            [channelCode.toLowerCase()]: true,
          }));

          setSettingUpChannel(null);

          /*
           * Remove OAuth query parameters.
           */

          if (typeof window !== "undefined") {
            window.history.replaceState(
              {},
              document.title,
              "/channel-configuration"
            );
          }

          return;
        }

        /*
         * BACKEND ERROR
         *
         * Do not throw here.
         * Show our custom popup.
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

        setSettingUpChannel(null);

        setSetupError(backendMessage);

        setShowErrorModal(true);

        if (typeof window !== "undefined") {
          sessionStorage.removeItem(setupKey);
        }
      } catch (error) {
        console.error(
          "[Channel Configuration] setup-watch error:",
          error
        );

        setSettingUpChannel(null);

        setSetupError(
          error?.message ||
            "Something went wrong while setting up your account. Please try again."
        );

        setShowErrorModal(true);

        if (typeof window !== "undefined") {
          sessionStorage.removeItem(setupKey);
        }
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

      /*
       * API ERROR
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
       * Authorization URL
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
  | Retry Setup
  |--------------------------------------------------------------------------
  */

  const handleRetrySetup = () => {
    setShowErrorModal(false);

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

    const setupKey =
      `channel_setup_${channelFromUrl.toLowerCase()}`;

    if (typeof window !== "undefined") {
      sessionStorage.removeItem(setupKey);
    }

    fetchChannels();
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
      <>
        <style jsx global>{`
          @keyframes channelSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}</style>

        <div
          style={{
            minHeight: "100vh",
            background: theme.pageBg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily:
              "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              color: theme.textSecondary,
              fontSize: "13px",
            }}
          >
            <RefreshCw
              size={17}
              style={{
                animation:
                  "channelSpin 0.8s linear infinite",
              }}
            />

            Loading channels...
          </div>
        </div>
      </>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <>
      <style jsx global>{`
        @keyframes channelSpin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        @keyframes channelFadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .channel-page {
          box-sizing: border-box;
        }

        .channel-page *,
        .channel-page *::before,
        .channel-page *::after {
          box-sizing: border-box;
        }

        .channel-main-grid {
          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            330px;
          gap: 24px;
          align-items: start;
        }

        .channel-sidebar {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .other-channel-grid {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .channel-header-title {
          font-size: 30px !important;
        }

        .channel-description {
          font-size: 15px !important;
        }

        .gmail-main-card {
          border-radius: 16px !important;
        }

        .gmail-header {
          padding: 20px 22px !important;
        }

        .gmail-body {
          padding: 22px !important;
        }

        .gmail-connect-panel {
          padding: 20px !important;
        }

        .gmail-google-button {
          height: 46px !important;
          font-size: 14px !important;
        }

        .gmail-security {
          margin-top: 18px !important;
        }

        .gmail-connected-box {
          padding: 16px !important;
        }

        .other-channel-card {
          padding: 18px !important;
          min-height: 190px !important;
        }

        .sidebar-card {
          padding: 20px !important;
          border-radius: 16px !important;
        }

        .sidebar-item {
          padding: 12px !important;
          border-radius: 11px !important;
        }

        .about-card {
          margin-top: 0 !important;
        }

        @media (max-width: 1100px) {
          .channel-main-grid {
            grid-template-columns: 1fr !important;
          }

          .channel-sidebar {
            display: grid;
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
            gap: 18px;
          }

          .about-card {
            margin-top: 0 !important;
          }
        }

        @media (max-width: 760px) {
          .channel-page {
            padding:
              22px 16px 40px !important;
          }

          .channel-header {
            margin-bottom: 24px !important;
          }

          .channel-header-title {
            font-size: 25px !important;
            line-height: 1.2 !important;
          }

          .channel-description {
            font-size: 14px !important;
            line-height: 1.5 !important;
          }

          .channel-main-grid {
            gap: 18px !important;
          }

          .channel-sidebar {
            display: flex !important;
            flex-direction: column !important;
            gap: 16px !important;
          }

          .other-channel-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          .gmail-header {
            padding: 17px !important;
          }

          .gmail-body {
            padding: 16px !important;
          }

          .gmail-connect-panel {
            padding: 16px !important;
          }

          .gmail-google-content {
            align-items: flex-start !important;
          }

          .gmail-google-icon {
            width: 44px !important;
            height: 44px !important;
          }

          .gmail-google-icon svg {
            width: 21px !important;
            height: 21px !important;
          }

          .gmail-google-title {
            font-size: 15px !important;
          }

          .gmail-google-description {
            font-size: 12px !important;
          }

          .gmail-google-button {
            height: 44px !important;
            font-size: 13px !important;
          }

          .gmail-security {
            font-size: 12px !important;
          }

          .gmail-connected-box {
            padding: 14px !important;
          }

          .gmail-connected-box-inner {
            align-items: flex-start !important;
          }

          .gmail-connected-title {
            font-size: 14px !important;
          }

          .gmail-connected-description {
            font-size: 12px !important;
          }

          .other-channel-card {
            min-height: auto !important;
            padding: 16px !important;
          }

          .other-channel-icon {
            width: 42px !important;
            height: 42px !important;
          }

          .other-channel-icon svg {
            width: 21px !important;
            height: 21px !important;
          }

          .other-channel-title {
            margin-top: 18px !important;
            font-size: 14px !important;
          }

          .other-channel-description {
            font-size: 12px !important;
          }

          .sidebar-card {
            padding: 17px !important;
          }

          .sidebar-heading {
            font-size: 15px !important;
          }

          .sidebar-subheading {
            font-size: 11px !important;
          }

          .sidebar-item-text {
            font-size: 13px !important;
          }

          .sidebar-item-status {
            font-size: 11px !important;
          }

          .about-text {
            font-size: 12px !important;
          }

          .about-note {
            font-size: 11px !important;
          }
        }

        @media (max-width: 420px) {
          .channel-page {
            padding-left: 12px !important;
            padding-right: 12px !important;
          }

          .channel-header-title {
            font-size: 23px !important;
          }

          .breadcrumb {
            font-size: 12px !important;
          }

          .gmail-header-content {
            gap: 11px !important;
          }

          .gmail-icon-box {
            width: 42px !important;
            height: 42px !important;
          }

          .gmail-icon-box svg {
            width: 20px !important;
            height: 20px !important;
          }

          .gmail-title {
            font-size: 15px !important;
          }

          .gmail-status {
            font-size: 11px !important;
            padding: 4px 8px !important;
          }
        }
      `}</style>

      <div
        className="channel-page"
        style={{
          minHeight: "100vh",
          background: theme.pageBg,
          color: theme.textPrimary,
          padding: "24px 20px 50px",
          fontFamily:
            "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "1240px",
            margin: "0 auto",
          }}
        >
          {/* ============================================================
              HEADER
          ============================================================ */}

          <div
            className="channel-header"
            style={{
              marginBottom: "28px",
            }}
          >
            <div
              className="breadcrumb"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                color: theme.textSecondary,
                fontSize: "13px",
                marginBottom: "10px",
              }}
            >
              <Settings2
                size={15}
                color="#ff6600"
              />

              <span>Settings</span>

              <ArrowRight size={13} />

              <span>Channels</span>
            </div>

            <h1
              className="channel-header-title"
              style={{
                margin: 0,
                lineHeight: 1.2,
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              Channel Configuration
            </h1>

            <p
              className="channel-description"
              style={{
                margin: "8px 0 0",
                maxWidth: "850px",
                lineHeight: 1.5,
                color: theme.textSecondary,
              }}
            >
              Connect and manage the communication channels
              your team uses to interact with customers and
              leads.
            </p>
          </div>

          {/* ============================================================
              MAIN LAYOUT
          ============================================================ */}

          <div className="channel-main-grid">
            {/* ==========================================================
                LEFT CONTENT
            ========================================================== */}

            <div>
              {/* ========================================================
                  GMAIL CARD
              ======================================================== */}

              <div
                className="gmail-main-card"
                style={{
                  background: theme.cardBg,
                  border: `1px solid ${theme.border}`,
                  overflow: "hidden",
                }}
              >
                {/* Gmail Header */}

                <div
                  className="gmail-header"
                  style={{
                    borderBottom:
                      `1px solid ${theme.border}`,
                  }}
                >
                  <div
                    className="gmail-header-content"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "13px",
                    }}
                  >
                    {/* Gmail Icon */}

                    <div
                      className="gmail-icon-box"
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "11px",
                        background: "#fff1e8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Mail
                        size={22}
                        color="#ff6600"
                        strokeWidth={2}
                      />
                    </div>

                    {/* Gmail Heading */}

                    <div
                      style={{
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          flexWrap: "wrap",
                        }}
                      >
                        <h2
                          className="gmail-title"
                          style={{
                            margin: 0,
                            fontSize: "17px",
                            fontWeight: 650,
                          }}
                        >
                          Gmail
                        </h2>

                        <div
                          className="gmail-status"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "4px",
                            padding: "5px 9px",
                            borderRadius: "999px",
                            background:
                              isGmailConnected
                                ? "#ecfdf3"
                                : "#f1f3f5",
                            color:
                              isGmailConnected
                                ? "#15803d"
                                : theme.textSecondary,
                            fontSize: "12px",
                            fontWeight: 500,
                          }}
                        >
                          {isGmailConnected ? (
                            <CheckCircle2 size={13} />
                          ) : (
                            <CircleAlert size={13} />
                          )}

                          {isGmailConnected
                            ? "Connected"
                            : "Not Connected"}
                        </div>
                      </div>

                      <p
                        style={{
                          margin: "5px 0 0",
                          color: theme.textSecondary,
                          fontSize: "13px",
                          lineHeight: 1.45,
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
                </div>

                {/* ======================================================
                    SETTING UP LOADER
                ====================================================== */}

                {settingUpChannel === "gmail" ? (
                  <div className="gmail-body">
                    <div
                      style={{
                        background: theme.mutedBg,
                        border:
                          `1px solid ${theme.border}`,
                        borderRadius: "13px",
                        padding: "34px 20px",
                        minHeight: "160px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        animation:
                          "channelFadeIn 0.25s ease-out",
                      }}
                    >
                      <RefreshCw
                        size={26}
                        color="#ff6600"
                        style={{
                          animation:
                            "channelSpin 0.8s linear infinite",
                          marginBottom: "13px",
                        }}
                      />

                      <h3
                        style={{
                          margin: 0,
                          fontSize: "16px",
                          fontWeight: 650,
                        }}
                      >
                        Setting up your account
                      </h3>

                      <p
                        style={{
                          margin: "6px 0 0",
                          maxWidth: "420px",
                          fontSize: "12px",
                          lineHeight: 1.5,
                          color: theme.textSecondary,
                        }}
                      >
                        Your Gmail account has been
                        connected. We are finishing the
                        setup so your CRM can receive
                        emails.
                      </p>
                    </div>
                  </div>
                ) : !isGmailConnected ? (
                  <>
                    {/* ==================================================
                        GOOGLE CONNECT PANEL
                    ================================================== */}

                    <div className="gmail-body">
                      <div
                        className="gmail-connect-panel"
                        style={{
                          background: theme.mutedBg,
                          border:
                            `1px solid ${theme.border}`,
                          borderRadius: "13px",
                        }}
                      >
                        <div
                          className="gmail-google-content"
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "13px",
                            marginBottom: "17px",
                          }}
                        >
                          <div
                            className="gmail-google-icon"
                            style={{
                              width: "46px",
                              height: "46px",
                              borderRadius: "11px",
                              background: theme.cardBg,
                              border:
                                `1px solid ${theme.border}`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                            }}
                          >
                            <GoogleLogo size={22} />
                          </div>

                          <div>
                            <h3
                              className="gmail-google-title"
                              style={{
                                margin: 0,
                                fontSize: "15px",
                                fontWeight: 650,
                              }}
                            >
                              Connect with Google
                            </h3>

                            <p
                              className="gmail-google-description"
                              style={{
                                margin: "4px 0 0",
                                fontSize: "12px",
                                lineHeight: 1.5,
                                color:
                                  theme.textSecondary,
                              }}
                            >
                              Securely connect your Gmail
                              account using Google OAuth.
                              You don't need to enter or
                              share your Gmail password.
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="gmail-google-button"
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
                            borderRadius: "11px",
                            border:
                              `1px solid ${theme.border}`,
                            background: theme.cardBg,
                            color: theme.textPrimary,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "9px",
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
                                size={16}
                                style={{
                                  animation:
                                    "channelSpin 0.8s linear infinite",
                                }}
                              />

                              Connecting...
                            </>
                          ) : (
                            <>
                              <GoogleLogo size={18} />

                              Connect with Google
                            </>
                          )}
                        </button>
                      </div>

                      {/* Security Information */}

                      <div
                        className="gmail-security"
                        style={{
                          display: "flex",
                          alignItems:
                            "flex-start",
                          gap: "9px",
                          padding: "0 3px",
                        }}
                      >
                        <ShieldCheck
                          size={17}
                          color="#ff6600"
                          style={{
                            flexShrink: 0,
                            marginTop: "1px",
                          }}
                        />

                        <p
                          style={{
                            margin: 0,
                            color:
                              theme.textSecondary,
                            fontSize: "12px",
                            lineHeight: 1.5,
                          }}
                        >
                          Your Gmail password is never
                          shared with us. Google securely
                          handles authentication and only
                          the permissions you approve will
                          be granted to the CRM.
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  /* ======================================================
                     CONNECTED STATE
                  ====================================================== */

                  <div className="gmail-body">
                    <div
                      className="gmail-connected-box"
                      style={{
                        borderRadius: "13px",
                        background: "#ecfdf3",
                        border:
                          "1px solid #bbf7d0",
                      }}
                    >
                      <div
                        className="gmail-connected-box-inner"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "11px",
                        }}
                      >
                        <CheckCircle2
                          size={23}
                          color="#16a34a"
                          style={{
                            flexShrink: 0,
                          }}
                        />

                        <div>
                          <div
                            className="gmail-connected-title"
                            style={{
                              fontWeight: 650,
                              color: "#166534",
                              fontSize: "14px",
                            }}
                          >
                            Gmail connected successfully
                          </div>

                          <div
                            className="gmail-connected-description"
                            style={{
                              marginTop: "3px",
                              fontSize: "12px",
                              lineHeight: 1.45,
                              color: "#15803d",
                            }}
                          >
                            Your Gmail account is ready to
                            use with the CRM.
                          </div>
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
                  marginTop: "28px",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "18px",
                    fontWeight: 650,
                  }}
                >
                  Other Channels
                </h2>

                <p
                  style={{
                    margin: "5px 0 15px",
                    color: theme.textSecondary,
                    fontSize: "13px",
                    lineHeight: 1.5,
                  }}
                >
                  More communication channels can be
                  configured here.
                </p>

                <div className="other-channel-grid">
                  {otherChannels.map((channel) => {
                    const Icon = channel.icon;

                    const isAvailable =
                      availableChannelCodes.has(
                        channel.code
                      );

                    return (
                      <div
                        key={channel.code}
                        className="other-channel-card"
                        style={{
                          background:
                            theme.cardBg,
                          border:
                            `1px solid ${theme.border}`,
                          borderRadius: "14px",
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
                            className="other-channel-icon"
                            style={{
                              width: "44px",
                              height: "44px",
                              borderRadius: "11px",
                              background:
                                theme.mutedBg,
                              display: "flex",
                              alignItems: "center",
                              justifyContent:
                                "center",
                            }}
                          >
                            <Icon
                              size={22}
                              color="#64748b"
                            />
                          </div>

                          <span
                            style={{
                              padding: "4px 9px",
                              borderRadius: "999px",
                              background:
                                isAvailable
                                  ? "#ecfdf3"
                                  : theme.mutedBg,
                              color:
                                isAvailable
                                  ? "#15803d"
                                  : theme.textSecondary,
                              fontSize: "10px",
                              fontWeight: 500,
                            }}
                          >
                            {isAvailable
                              ? "Available"
                              : "Coming Soon"}
                          </span>
                        </div>

                        <h3
                          className="other-channel-title"
                          style={{
                            margin:
                              "19px 0 6px",
                            fontSize: "14px",
                            fontWeight: 650,
                          }}
                        >
                          {channel.name}
                        </h3>

                        <p
                          className="other-channel-description"
                          style={{
                            margin: 0,
                            color:
                              theme.textSecondary,
                            fontSize: "12px",
                            lineHeight: 1.5,
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

            <div className="channel-sidebar">
              {/* ========================================================
                  CONNECTION STATUS
              ======================================================== */}

              <div
                className="sidebar-card"
                style={{
                  background: theme.cardBg,
                  border:
                    `1px solid ${theme.border}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "11px",
                    marginBottom: "17px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "10px",
                      background: "#fff1e8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck
                      size={20}
                      color="#ff6600"
                    />
                  </div>

                  <div>
                    <h3
                      className="sidebar-heading"
                      style={{
                        margin: 0,
                        fontSize: "15px",
                        fontWeight: 650,
                      }}
                    >
                      Connection Status
                    </h3>

                    <p
                      className="sidebar-subheading"
                      style={{
                        margin: "2px 0 0",
                        color:
                          theme.textSecondary,
                        fontSize: "11px",
                      }}
                    >
                      Current channel overview
                    </p>
                  </div>
                </div>

                {/* Gmail */}

                <div
                  className="sidebar-item  text-[15px]"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    background:
                      theme.mutedBg,
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <Mail
                      size={17}
                      color="#64748b"
                    />

                    <span className="sidebar-item-text">
                      Gmail
                    </span>
                  </div>

                  <span
                    className="sidebar-item-status text-[13px]"
                    style={{
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
                  className="sidebar-item text-[15px]"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    background:
                      theme.mutedBg,
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <MessageCircle
                      size={17}
                      color="#64748b"
                    />

                    <span className="sidebar-item-text">
                      WhatsApp
                    </span>
                  </div>

                  <span
                    className="sidebar-item-status"
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
                  className="sidebar-item text-[15px] "
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",
                    background:
                      theme.mutedBg,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                    }}
                  >
                    <Globe2
                      size={17}
                      color="#64748b"
                    />

                    <span className="sidebar-item-text">
                      Meta
                    </span>
                  </div>

                  <span
                    className="sidebar-item-status"
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
                className="sidebar-card about-card"
                style={{
                  background: theme.cardBg,
                  border:
                    `1px solid ${theme.border}`,
                }}
              >
                <h3
                  className="sidebar-heading"
                  style={{
                    margin: "0 0 11px",
                    fontSize: "15px",
                    fontWeight: 650,
                  }}
                >
                  About Channel Configuration
                </h3>

                <p
                  className="about-text"
                  style={{
                    margin: 0,
                    color:
                      theme.textSecondary,
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Connect your communication channels
                  to bring customer conversations
                  directly into your CRM. Once connected,
                  your team can manage conversations,
                  generate AI responses, and track
                  customer interactions from one place.
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems:
                      "flex-start",
                    gap: "9px",
                    marginTop: "15px",
                    padding: "12px",
                    borderRadius: "11px",
                    background: "#fff7ed",
                  }}
                >
                  <ShieldCheck
                    size={16}
                    color="#ff6600"
                    style={{
                      flexShrink: 0,
                      marginTop: "1px",
                    }}
                  />

                  <p
                    className="about-note"
                    style={{
                      margin: 0,
                      color:
                        theme.textSecondary,
                      fontSize: "11px",
                      lineHeight: 1.5,
                    }}
                  >
                    Only administrators can configure
                    or disconnect communication
                    channels.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================
          SETUP LOADER
      ================================================================ */}

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
            padding: "16px",
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              width: "360px",
              maxWidth:
                "calc(100vw - 32px)",
              background:
                theme.cardBg,
              borderRadius: "16px",
              padding: "28px",
              textAlign: "center",
              boxShadow:
                "0 25px 70px rgba(0,0,0,0.2)",
              animation:
                "channelFadeIn 0.2s ease-out",
            }}
          >
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border:
                  "4px solid #e5e7eb",
                borderTopColor:
                  "#ff6600",
                margin:
                  "0 auto 18px",
                animation:
                  "channelSpin 0.8s linear infinite",
              }}
            />

            <h3
              style={{
                margin: "0 0 7px",
                fontSize: "17px",
                fontWeight: 650,
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
                color:
                  theme.textSecondary,
                fontSize: "12px",
                lineHeight: 1.5,
              }}
            >
              Please wait while we finish
              configuring your account.
            </p>
          </div>
        </div>
      )}

      {/* ================================================================
          ERROR MODAL
      ================================================================ */}

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
            padding: "16px",
            backdropFilter:
              "blur(4px)",
          }}
          onClick={() =>
            setShowErrorModal(false)
          }
        >
          <div
            style={{
              width: "420px",
              maxWidth: "100%",
              background:
                theme.cardBg,
              border:
                `1px solid ${theme.border}`,
              borderRadius: "16px",
              padding: "22px",
              boxShadow:
                "0 25px 70px rgba(0,0,0,0.25)",
              animation:
                "channelFadeIn 0.2s ease-out",
            }}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* Modal Header */}

            <div
              style={{
                display: "flex",
                alignItems:
                  "flex-start",
                justifyContent:
                  "space-between",
                gap: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems:
                    "center",
                  gap: "11px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "10px",
                    background:
                      "#fef2f2",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    flexShrink: 0,
                  }}
                >
                  <CircleAlert
                    size={20}
                    color="#dc2626"
                  />
                </div>

                <div>
                  <h3
                    style={{
                      margin: 0,
                      fontSize: "15px",
                      fontWeight: 650,
                      color:
                        theme.textPrimary,
                    }}
                  >
                    Something went wrong
                  </h3>

                  <p
                    style={{
                      margin:
                        "3px 0 0",
                      fontSize: "11px",
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
                onClick={() =>
                  setShowErrorModal(false)
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  cursor: "pointer",
                  padding: "3px",
                  color:
                    theme.textSecondary,
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Error Message */}

            <div
              style={{
                marginTop: "17px",
                padding:
                  "12px 13px",
                borderRadius: "10px",
                background:
                  "#fef2f2",
                border:
                  "1px solid #fecaca",
                color: "#991b1b",
                fontSize: "12px",
                lineHeight: 1.55,
                wordBreak:
                  "break-word",
              }}
            >
              {setupError ||
                "Unable to complete the channel configuration."}
            </div>

            {/* Buttons */}

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "8px",
                marginTop: "18px",
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
                  height: "37px",
                  padding:
                    "0 14px",
                  borderRadius:
                    "8px",
                  border:
                    `1px solid ${theme.border}`,
                  background:
                    theme.cardBg,
                  color:
                    theme.textPrimary,
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                }}
              >
                Close
              </button>

              {getChannelFromUrl()
                ?.status ===
                "connected" && (
                <button
                  type="button"
                  onClick={
                    handleRetrySetup
                  }
                  style={{
                    height: "37px",
                    padding:
                      "0 14px",
                    borderRadius:
                      "8px",
                    border: "none",
                    background:
                      "#ff6600",
                    color:
                      "#ffffff",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer",
                    display:
                      "inline-flex",
                    alignItems:
                      "center",
                    gap: "6px",
                  }}
                >
                  <RefreshCw
                    size={13}
                  />

                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelConfiguration;