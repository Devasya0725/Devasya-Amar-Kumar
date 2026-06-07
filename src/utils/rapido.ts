/**
 * Rapido Booking Deep Linking with Store/Web fallbacks
 * Targets Pir Mitha, Jammu (Monica Electricals)
 */

export const RAPIDO_COORDINATES = {
  latitude: 32.7266,
  longitude: 74.8636,
  address: "Monica Electricals, Pir Mitha, Jammu"
};

export const launchRapidoApp = () => {
  // Mobile app URL scheme for Rapido
  const deepLink = 'rapido://';
  const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.rapido.passenger';
  const appStoreUrl = 'https://apps.apple.com/in/app/rapido-bike-taxi-auto-cab/id1195209702';

  const start = Date.now();
  
  // Attempt to open the custom protocol on mobile devices
  window.location.href = deepLink;

  // If application is not present or protocol not supported, head to app stores in 1.5 seconds
  setTimeout(() => {
    if (Date.now() - start < 1850) {
      if (/android/i.test(navigator.userAgent)) {
        window.open(playStoreUrl, '_blank');
      } else if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        window.open(appStoreUrl, '_blank');
      } else {
        // Desktop or other devices can visit the official Rapido site
        window.open('https://www.rapido.bike/', '_blank');
      }
    }
  }, 1500);
};
