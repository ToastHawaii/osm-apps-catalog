import { useState, useEffect, useCallback } from "react";

const StorageKeyPrefix = "downloadClicked_";

import React, { createContext, useContext } from "react";

interface DownloadTrackingContextValue {
  showSupportPanel: boolean;
  markDownloadClicked: () => void;
  hideSupportPanel: () => void;
}

export function useDownloadTrackingInternal(appId: number) {
  const [showSupportPanel, setShowSupportPanel] = useState(false);

  const markDownloadClicked = useCallback(() => {
    localStorage.setItem(`${StorageKeyPrefix}${appId}`, "true");
    setShowSupportPanel(true);
  }, [appId]);

  const hideSupportPanel = useCallback(() => {
    localStorage.removeItem(`${StorageKeyPrefix}${appId}`);
    setShowSupportPanel(false);
  }, []);

  // Check if external link was clicked for this app on component mount
  useEffect(() => {
    const wasClicked = localStorage.getItem(`${StorageKeyPrefix}${appId}`);
    setShowSupportPanel(wasClicked === "true");
  }, [appId]);

  return {
    showSupportPanel,
    markDownloadClicked,
    hideSupportPanel,
  };
}

const DownloadTrackingContext = createContext<
  DownloadTrackingContextValue | undefined
>(undefined);

interface DownloadTrackingProviderProps {
  appId: number;
  children: React.ReactNode;
}

export function DownloadTrackingProvider({
  appId,
  children,
}: DownloadTrackingProviderProps) {
  const { showSupportPanel, markDownloadClicked, hideSupportPanel } =
    useDownloadTrackingInternal(appId);

  return (
    <DownloadTrackingContext.Provider
      value={{
        showSupportPanel,
        markDownloadClicked,
        hideSupportPanel,
      }}
    >
      {children}
    </DownloadTrackingContext.Provider>
  );
}

export function useDownloadTracking() {
  const context = useContext(DownloadTrackingContext);
  if (context === undefined) {
    throw new Error(
      "useDownloadTracking must be used within an DownloadTrackingProvider",
    );
  }
  return context;
}
