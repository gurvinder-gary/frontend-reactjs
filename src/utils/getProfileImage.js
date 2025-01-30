const API_BASE_URL = process.env.REACT_APP_API_BASE_URL_WITHOUT_API;

export const getProfileImage = (profileImage) => {
  if (!profileImage) {
    return "https://keedag.sportskeeda.com/user-pic/373414-1713615484-200.jpg"; // Default image
  }

  return profileImage.startsWith("https") ? profileImage : `${API_BASE_URL}${profileImage}`;
};
