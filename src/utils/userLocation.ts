export const getUserLocation = (
  updateUserLocation: Function,
  userLocation: userLocationProps | null
) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (
          userLocation &&
          userLocation.latitude.toFixed(5) === latitude.toFixed(5) &&
          userLocation.longitude.toFixed(5) === longitude.toFixed(5)
        ) {
          // console.log("same place");
          return;
        }
        updateUserLocation({ latitude, longitude });
        localStorage.setItem(
          "currentLocation",
          JSON.stringify({ latitude, longitude })
        );
      },
      (error) => {
        console.error("Error get user location: ", error);
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser");
  }
};
