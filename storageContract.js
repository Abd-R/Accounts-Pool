const ethers = require(`ethers`);
const fs = require(`fs`);
require(`dotenv`).config();

async function storeNumber(ACCOUNT, NUMBER) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL)
        const wallet = new ethers.Wallet(
            ACCOUNT.PvtKey,
            provider
        )
        const abi = fs.readFileSync("./contract/abi.json", "utf-8")
        const address = "0x3CCc71Dfd302768f4Bc18b09195fd337d6a11071"
        const storage = new ethers.Contract(address, abi, wallet)
        const txResponse = await storage.store(NUMBER);
        const txReciept = await txResponse.wait(1);
        return ({
            "Public Key": txResponse.from,
            "Contract Address": address,
            "Tx Hash": txReciept.transactionHash,
            Nonce: parseInt(txResponse.nonce),
        })
    } catch (error) {
        return new Error(error)
    }
}

async function getNumber(ACCOUNT) {
    try {
        console.log("Calling Blockchain")
        const provider = new ethers.providers.JsonRpcProvider(process.env.GOERLI_RPC_URL)
        const wallet = new ethers.Wallet(
            ACCOUNT.PvtKey,
            provider
        )
        const abi = fs.readFileSync("./contract/abi.json", "utf-8")
        const address = "0x3CCc71Dfd302768f4Bc18b09195fd337d6a11071"
        const storage = new ethers.Contract(address, abi, wallet)
        const updatedFavNum = await storage.callStatic.retrieve();
        return ({
            "Public Key": ACCOUNT.PubKey,
            "Contract Address": address,
            "Retrieved Number": parseInt(updatedFavNum.toString())
        })
    } catch (error) {
        return new Error(error)
    }
}

module.exports = {
    storeNumber,
    getNumber
}