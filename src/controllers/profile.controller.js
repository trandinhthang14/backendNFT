import { Users } from "../../database/models.js";
import { config } from "../../config/config.js";

const setProfilePhoto = async (req, res) => {
  const { EthUser } = req.body;
  if (!req?.file) {
    return res.status(400).json({ message: "Image not found" });
  }
  const ImageLink = `/images/${req?.file?.filename}`;
  console.log(ImageLink);
  try {
    const filter = { userEthAddress: EthUser };
    const update = {
      $set: {
        userProfile: ImageLink,
        userEthAddress: EthUser,
        // createdAt: Date.now(),
      },
    };

    const options = { new: true };

    const result = await Users.updateOne(filter, update, options);

    if (result) {
      return res.status(200).json({
        success: true,
        message: "Profile avatar uploaded successfully! 🎉",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Profile avatar updated successfully! 🎉",
      });
    }
  } catch (error) {
    console.error("Error in setProfilePhoto:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const setProfileDetails = async (req, res) => {
  const { data } = req.body;
  try {
    const result = await Users.updateOne(
      { userEthAddress: data.userEthAddress },
      data,
      { new: true }
    );
    if (result) {
      return res.status(200).json({
        success: true,
        message: "Profile details uploaded successfully! 🎉",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Profile details updated successfully! 🎉",
      });
    }
  } catch (error) {
    console.error("Error in setProfileDetails:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProfileByEthAddress = async (req, res) => {
  const { EthUser } = req.body;
  try {
    if (EthUser && EthUser !== "0x0000000000000000000000000000000000000000") {
      const result = await Users.findOne(
        {
          userEthAddress: EthUser,
        },
        { userName: 1, userProfile: 1, _id: 0 }
      );
      console.log(result);
      if (result) {
        return res.status(200).json(result);
      } else {
        const result = await Users.create({
          userEthAddress: EthUser,
        });
        return res.status(200).json(result);
      }
    } else {
      return res.status(200).json({ message: "not saved" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProfileDetailsByEthAddress = async (req, res) => {
  const { EthUser } = req.body;
  try {
    const result = await Users.findOne({
      userEthAddress: EthUser,
    });
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

const getTopCreators = async (req, res) => {
  const { limit } = req.body;
  try {
    const result = await Users.find(
      {},
      {
        userEthAddress: 1,
        userProfile: 1,
        userName: 1,
      }
    ).limit(limit);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in getTopCreators:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const getProfileFavoriteByEthAddress = async (req, res) => {
  const { EthUser } = req.body;
  try {
    const result = await Users.findOne(
      {
        userEthAddress: EthUser,
      },
      { FavoriteNFTs: 1, FavoriteAuctionNfts: 1, createdAt: 1 }
    );

    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
};

export {
  getTopCreators,
  setProfilePhoto,
  setProfileDetails,
  getProfileByEthAddress,
  getProfileDetailsByEthAddress,
  getProfileFavoriteByEthAddress,
};
