import { Router } from "express";
import { NFTsController, createNft } from "../controllers/shop.controller.js";
import {
  addAuctionNFTFavorite,
  addNFTFavorite,
  checkIsFav,
} from "../controllers/favorite.controller.js";

const routerNFTs = Router();

routerNFTs.post("/Nfts", NFTsController);
routerNFTs.post("/addNFTFavorite", addNFTFavorite);
routerNFTs.post("/addAuctionNFTFavorite", addAuctionNFTFavorite);
routerNFTs.post("/checkIsFav", checkIsFav);
routerNFTs.post("/createNFT", createNft);
export { routerNFTs };
