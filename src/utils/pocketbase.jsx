import PocketBase from "pocketbase";

const pb = new PocketBase('https://pb.marvsman.com/');
pb.autoCancellation(false);
export default pb;