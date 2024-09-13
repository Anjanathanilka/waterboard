import { Avatar } from "@mui/material";

const ProfileAvatar = ({ user }) => {
  const name = user?.data?.UserName;
  const googleProfilePic = user?.data?.picture;
  const avatarProps = googleProfilePic
    ? {
        src: googleProfilePic,
      }
    : {
        sx: {
          bgcolor: (theme) => theme.palette.secondary.main,
          color: "#000",
          border: (theme) => "1px solid " + theme.palette.secondary[700],
        },
        children: `${
          name.split(" ").length > 1
            ? name.split(" ")[0][0] + name.split(" ")[1][0]
            : name.split(" ")[0][0]
        }`,
      };

  return <Avatar alt="" {...avatarProps} />;
};

export default ProfileAvatar;
