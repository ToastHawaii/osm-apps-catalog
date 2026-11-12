import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY_PREFIX = "externalLinkClicked_";

export function useExternalLinkTracking(appId: number) {
  const [showDonationBanner, setShowDonationBanner] = useState(false);

  const markExternalLinkClicked = useCallback(() => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${appId}`, "true");
    setShowDonationBanner(true);
  }, [appId]);

  const hideDonationBanner = useCallback(() => {
    setShowDonationBanner(false);
  }, []);

  // Check if external link was clicked for this app on component mount
  useEffect(() => {
    const wasClicked = localStorage.getItem(`${STORAGE_KEY_PREFIX}${appId}`);
    setShowDonationBanner(wasClicked === "true");
  }, [appId]);

  return {
    showDonationBanner,
    markExternalLinkClicked,
    hideDonationBanner,
  };
}
