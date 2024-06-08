import { Users } from "../../database/models.js";
import { config } from "../../config/config.js";
const checkIsFav = async (req, res) => {
  const { ethUser, image } = req.body; // Assuming image is passed as a parameter
  try {
    const isNftExist = await Users.findOne({ userEthAddress: ethUser });
    if (isNftExist) {
      const { FavoriteNFTs, FavoriteAuctionNfts } = isNftExist;
      const isFav =
        FavoriteNFTs.some((nft) => nft.image === image) ||
        FavoriteAuctionNfts.some((nft) => nft.image === image);
      return res.status(200).json({
        isExist: true,
        isFav,
        message: "NFT exists 👍",
      });
    } else {
      return res.status(200).json({
        isExist: false,
        message: "NFT not exists 👍",
      });
    }
  } catch (error) {
    console.error("Error in checkIsFav:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const addNFTFavorite = async (req, res) => {
  const { EthUser, NFTData } = req.body;
  try {
    const isNftExist = await Users.findOne({ FavoriteNFTs: NFTData });
    console.log(isNftExist);
    if (isNftExist) {
      const r = await Users.updateOne(
        { userEthAddress: EthUser },
        { $pull: { FavoriteNFTs: NFTData } },
        { upsert: true }
      );
      console.log(r);
      return res.status(200).json({
        success: true,
        message: "NFT removed from Favorite Section 👍",
      });
    } else {
      const result = await Users.updateOne(
        { userEthAddress: EthUser },
        { $addToSet: { FavoriteNFTs: NFTData } },
        { new: true }
      );
      console.log(result);
      return res.status(200).json({
        success: true,
        message: "NFT added in Favorite Section 🎉",
      });
    }
  } catch (error) {
    console.error("Error in addNFTFavorite:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const addAuctionNFTFavorite = async (req, res) => {
  const { EthUser, NFTData } = req.body;
  try {
    const isNftExist = await Users.findOne({ FavoriteAuctionNfts: NFTData });
    console.log(isNftExist);
    if (isNftExist) {
      const r = await Users.updateOne(
        { userEthAddress: EthUser },
        { $pull: { FavoriteAuctionNfts: NFTData } },
        { upsert: true }
      );
      console.log(r);
      return res.status(200).json({
        success: true,
        message: "Auction NFT removed from Favorite Section 👍",
      });
    } else {
      const result = await Users.updateOne(
        { userEthAddress: EthUser },
        { $addToSet: { FavoriteAuctionNfts: NFTData } },
        { new: true }
      );
      console.log(result);
      return res.status(200).json({
        success: true,
        message: "Auction NFT added in Favorite Section 🎉",
      });
    }
  } catch (error) {
    console.error("Error in addNFTFavorite:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const addCollectionFavorite = async (req, res) => {
  const { EthUser, CollectionData } = req.body;
  try {
    const result = await Users.updateOne(
      { userEthAddress: EthUser },
      { $addToSet: { FavoriteCollections: CollectionData } },
      { upsert: true }
    );

    if (result.modifiedCount === 1) {
      return res.status(200).json({
        success: true,
        message: "Collection added in Favorite Section 🎉",
      });
    } else {
      await Users.updateOne(
        { userEthAddress: EthUser },
        { $pull: { FavoriteCollections: CollectionData } },
        { upsert: true }
      );
      return res.status(200).json({
        success: true,
        message: "Collection removed from Favorite Section 👍",
      });
    }
  } catch (error) {
    console.error("Error in addCollectionFavorite:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export {
  addNFTFavorite,
  addCollectionFavorite,
  checkIsFav,
  addAuctionNFTFavorite,
};
