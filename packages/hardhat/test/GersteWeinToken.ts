import { mine, time, loadFixture, setBalance, impersonateAccount } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { BigNumber } from "ethers";


const USDCPOLYGON = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174";
const USDTPOLYGON = "0xc2132D05D31c914a87C6611C10748AEb04B58e8F";
const LINKTOKEN = "0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39"
const RICHADDRESS = "0x3507e4978e0Eb83315D20dF86CA0b976c0E40CcB";
const LINKRICHADDRESS = "0x55e4d16f9c3041EfF17Ca32850662f3e9Dddbce7"

/**
 * constants of amounts
 */
const AMOUNTTOMINT: BigNumber = BigNumber.from(100);
const AMOUNTTOAPPROVE: BigNumber = BigNumber.from(99999);
const AMOUNTTOSEND: BigNumber = BigNumber.from(50);
const AMOUNTOSWAP: BigNumber = BigNumber.from(200);
const AMOUNTOSWAP75: BigNumber = BigNumber.from(75);
const LOSTAMOUNT: BigNumber = BigNumber.from(50);


/**
 * testing begins here
 */
describe("GersteWeinToken", function () {

    async function deployGersteWeinToken() {
        await setBalance(RICHADDRESS, 100n ** 18n);
        await setBalance(LINKRICHADDRESS, 100n ** 18n);

        const GersteWeinToken = await ethers.getContractFactory("GersteWeinToken");
        const gersteweintoken = await GersteWeinToken.deploy();
        return { gersteweintoken }
    }

    async function deploySetGersteWeinToken() {
        const [owner, admin, otherUser] = await ethers.getSigners();
        await setBalance(RICHADDRESS, 100n ** 18n);
        await setBalance(LINKRICHADDRESS, 100n ** 18n);

        const GersteWeinToken = await ethers.getContractFactory("GersteWeinToken");
        const gersteweintoken = await GersteWeinToken.deploy();
        const USDcontract = await ethers.getContractAt("ERC20", USDCPOLYGON, owner);

        expect(await gersteweintoken.setUSDcoin(USDCPOLYGON)).to.emit(gersteweintoken, "USDcoinSet").withArgs(USDCPOLYGON);
        expect(await gersteweintoken.USDcoin()).to.be.equal(USDCPOLYGON);

        expect(await gersteweintoken.setNewAdmin(admin.address))
            .to.emit(gersteweintoken, "AdminChanged").withArgs(admin.address);

        expect(await gersteweintoken.admin()).to.be.equal(admin.address);

        return { gersteweintoken, USDcontract }
    }

    async function minted100toRICHADDRESS() {
        const [owner, admin, otherUser] = await ethers.getSigners();
        await setBalance(RICHADDRESS, 100n ** 18n);
        await setBalance(LINKRICHADDRESS, 100n ** 18n);

        const GersteWeinToken = await ethers.getContractFactory("GersteWeinToken");
        const gersteweintoken = await GersteWeinToken.deploy();
        const USDcontract = await ethers.getContractAt("ERC20", USDCPOLYGON, owner);

        expect(await gersteweintoken.setUSDcoin(USDCPOLYGON)).to.emit(gersteweintoken, "USDcoinSet").withArgs(USDCPOLYGON);
        expect(await gersteweintoken.USDcoin()).to.be.equal(USDCPOLYGON);

        expect(await gersteweintoken.setNewAdmin(admin.address))
            .to.emit(gersteweintoken, "AdminChanged").withArgs(admin.address);

        expect(await gersteweintoken.admin()).to.be.equal(admin.address);

        await impersonateAccount(RICHADDRESS);
        const impersonatedRich = await ethers.getSigner(RICHADDRESS);

        await USDcontract.connect(impersonatedRich).approve(gersteweintoken.address, AMOUNTTOAPPROVE);
        expect(await USDcontract.allowance(RICHADDRESS, gersteweintoken.address)).to.be.equal(AMOUNTTOAPPROVE);

        await expect(await gersteweintoken.connect(impersonatedRich).mintMeSome(AMOUNTTOMINT))
            .to.changeTokenBalance(gersteweintoken, RICHADDRESS, AMOUNTTOMINT);

        expect(await gersteweintoken.totalSupply()).to.be.equal(AMOUNTTOMINT);
        expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOMINT);

        return { gersteweintoken, USDcontract, impersonatedRich }
    }

    async function minted100toRICHADDRESSandSentLink() {
        const [owner, admin, otherUser] = await ethers.getSigners();
        await setBalance(RICHADDRESS, 100n ** 18n);

        const GersteWeinToken = await ethers.getContractFactory("GersteWeinToken");
        const gersteweintoken = await GersteWeinToken.deploy();
        const USDcontract = await ethers.getContractAt("ERC20", USDCPOLYGON, owner);
        const LINKcontract = await ethers.getContractAt("ERC20", LINKTOKEN, owner);


        expect(await gersteweintoken.setUSDcoin(USDCPOLYGON)).to.emit(gersteweintoken, "USDcoinSet").withArgs(USDCPOLYGON);
        expect(await gersteweintoken.USDcoin()).to.be.equal(USDCPOLYGON);

        expect(await gersteweintoken.setNewAdmin(admin.address))
            .to.emit(gersteweintoken, "AdminChanged").withArgs(admin.address);

        expect(await gersteweintoken.admin()).to.be.equal(admin.address);

        await impersonateAccount(RICHADDRESS);
        const impersonatedRich = await ethers.getSigner(RICHADDRESS);

        await USDcontract.connect(impersonatedRich).approve(gersteweintoken.address, AMOUNTTOAPPROVE);
        expect(await USDcontract.allowance(RICHADDRESS, gersteweintoken.address)).to.be.equal(AMOUNTTOAPPROVE);

        await expect(await gersteweintoken.connect(impersonatedRich).mintMeSome(AMOUNTTOMINT))
            .to.changeTokenBalance(gersteweintoken, RICHADDRESS, AMOUNTTOMINT);

        expect(await gersteweintoken.totalSupply()).to.be.equal(AMOUNTTOMINT);
        expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOMINT);

        //await stopImpersonatingAccount(RICHADDRESS);
        await impersonateAccount(LINKRICHADDRESS);
        const impersonatedLinkRich = await ethers.getSigner(LINKRICHADDRESS);

        expect(await LINKcontract.connect(impersonatedLinkRich).transfer(RICHADDRESS, AMOUNTTOSEND))
        expect(await LINKcontract.balanceOf(RICHADDRESS)).to.be.equal(AMOUNTTOSEND)

        return { gersteweintoken, USDcontract, LINKcontract, impersonatedRich }
    }

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            const [owner] = await ethers.getSigners();
            const { gersteweintoken } = await loadFixture(deployGersteWeinToken);
            expect(await gersteweintoken.owner()).to.equal(owner.address);
        });

        it("Should change the admin and work", async function () {
            const [owner, admin] = await ethers.getSigners();
            const { gersteweintoken } = await loadFixture(deployGersteWeinToken);

            //let currentAdmin = await gersteweintoken.admin();
            expect(await gersteweintoken.admin()).to.equal(owner.address);

            expect(await gersteweintoken.setNewAdmin(admin.address)).to.emit(gersteweintoken, "AdminChanged");

            //let newAdmin = await gersteweintoken.admin()
            expect(await gersteweintoken.admin()).to.equal(admin.address);
        });

        it("Should return correct number of decimals ( 6 )", async function () {
            const [owner, admin] = await ethers.getSigners();
            const { gersteweintoken } = await loadFixture(deployGersteWeinToken);

            expect(await gersteweintoken.decimals()).to.be.equal(6);
        })

        it("Should revert when changing the admin role because is another account calling", async function () {
            const [owner, admin, another] = await ethers.getSigners();
            const { gersteweintoken } = await loadFixture(deployGersteWeinToken);

            let currentAdmin = await gersteweintoken.admin();
            expect(currentAdmin).to.equal(owner.address);

            await expect(gersteweintoken.connect(another).setNewAdmin(admin.address)).to.be.revertedWith("No sos el duenno papu");
        });

        it("Set the USDC contract address, revert before timer expires and then change it again", async function () {
            const [owner, admin] = await ethers.getSigners();
            const { gersteweintoken } = await loadFixture(deployGersteWeinToken);

            expect(await gersteweintoken.setUSDcoin(USDCPOLYGON)).to.emit(gersteweintoken, "USDcoinSet")
            expect(await gersteweintoken.USDcoin()).to.be.equal(USDCPOLYGON);
            expect(await gersteweintoken.blockTime()).to.be.equal(await time.latestBlock());

            await expect(gersteweintoken.setUSDcoin(USDTPOLYGON)).to.be.revertedWith("Hay que esperar");

            await mine(30000);

            expect(await gersteweintoken.setUSDcoin(USDTPOLYGON)).to.emit(gersteweintoken, "USDcoinSet")
            expect(await gersteweintoken.USDcoin()).to.be.equal(USDTPOLYGON);
        });
    });

    describe("Minting", function () {
        it("Should revert because the user does not have USD to interact", async function () {
            const { gersteweintoken, USDcontract } = await loadFixture(deploySetGersteWeinToken);

            await expect(gersteweintoken.mintMeSome(100)).to.be.revertedWith("No tenes USD suficiente");
        });

        it("Should revert because the USD contract is not approved", async function () {
            const { gersteweintoken, USDcontract } = await loadFixture(deploySetGersteWeinToken);

            await impersonateAccount(RICHADDRESS);
            const impersonatedRich = await ethers.getSigner(RICHADDRESS);

            await expect(gersteweintoken.connect(impersonatedRich).mintMeSome(AMOUNTTOMINT))
                .to.be.revertedWith("ERC20: transfer amount exceeds allowance");
        });

        it("Should mint +100 GersteWeinToken and add to the total supply", async function () {
            const { gersteweintoken, USDcontract } = await loadFixture(deploySetGersteWeinToken);

            await impersonateAccount(RICHADDRESS);
            const impersonatedRich = await ethers.getSigner(RICHADDRESS);

            await USDcontract.connect(impersonatedRich).approve(gersteweintoken.address, AMOUNTTOAPPROVE);
            expect(await USDcontract.allowance(RICHADDRESS, gersteweintoken.address)).to.be.equal(AMOUNTTOAPPROVE);

            await expect(await gersteweintoken.connect(impersonatedRich).mintMeSome(AMOUNTTOMINT))
                .to.changeTokenBalance(gersteweintoken, RICHADDRESS, AMOUNTTOMINT);
            expect(await gersteweintoken.totalSupply()).to.be.equal(AMOUNTTOMINT);
            expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOMINT);
        });

        it("Should revert because there is no sufficient amount to mint", async function () {

        });

        it("Should emit an event matching the minting info", async function () {
            const { gersteweintoken, USDcontract } = await loadFixture(deploySetGersteWeinToken);

            await impersonateAccount(RICHADDRESS);
            const impersonatedRich = await ethers.getSigner(RICHADDRESS);

            await USDcontract.connect(impersonatedRich).approve(gersteweintoken.address, AMOUNTTOAPPROVE);
            expect(await USDcontract.allowance(RICHADDRESS, gersteweintoken.address)).to.be.equal(AMOUNTTOAPPROVE);

            expect(await gersteweintoken.connect(impersonatedRich).mintMeSome(AMOUNTTOMINT))
                .to.emit(gersteweintoken, "SwappedCoins").withArgs(RICHADDRESS, AMOUNTTOMINT);
        });

    });

    describe("Swapping tokens", function () {

        it("Should swap the same amount and emit an event", async function () {
            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);

            expect(await gersteweintoken.connect(impersonatedRich).swapMeSome(AMOUNTTOMINT)).to.emit(gersteweintoken, "SwappedCoins")
                .withArgs(RICHADDRESS, AMOUNTTOMINT);

            expect(await gersteweintoken.balanceOf(RICHADDRESS)).to.be.equal(0);
            expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.equal(0);
        });

        it("Should revert if the amount to swap is more than what the user has in the wallet", async function () {
            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);

            await expect(gersteweintoken.connect(impersonatedRich).swapMeSome(AMOUNTOSWAP))
                .to.be.revertedWith("No tenes GersteWeinToken suficiente");
        });

        it("Should send the tokens to another user and then perform a swap", async function () {
            const [owner, admin, anotherUser] = await ethers.getSigners();
            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);

            expect(await gersteweintoken.connect(impersonatedRich).transfer(anotherUser.address, AMOUNTTOSEND))
                .to.emit(gersteweintoken, "Transfer").withArgs(impersonatedRich.address, anotherUser.address, AMOUNTTOSEND);

            expect(await gersteweintoken.balanceOf(anotherUser.address)).to.be.equal(AMOUNTTOSEND);

            expect(await gersteweintoken.connect(anotherUser).swapMeSome(AMOUNTTOSEND))
                .to.emit(gersteweintoken, "SwappedCoins").withArgs(anotherUser.address, AMOUNTTOMINT);

            //expect(await USDcontract.balanceOf(anotherUser.address)).to.be.equal(amountToSend);
            expect(await gersteweintoken.balanceOf(anotherUser.address)).to.be.equal(0);

        })
    });

    describe("Recover lost tokens", function () {
        it("Should send some random token to the contract and recover it", async function () {
            const [owner, admin, anotherUser] = await ethers.getSigners();

            const { gersteweintoken, USDcontract, LINKcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESSandSentLink);

            expect(await LINKcontract.connect(impersonatedRich).transfer(gersteweintoken.address, AMOUNTTOSEND))
                .to.emit(gersteweintoken, "Transfer").withArgs(impersonatedRich.address, gersteweintoken.address, AMOUNTTOSEND);

            expect(await LINKcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOSEND);

            expect(await gersteweintoken.recoverLostToken(LINKTOKEN, AMOUNTTOSEND))
                .to.emit(gersteweintoken, "TokenRecovery").withArgs(LINKTOKEN, AMOUNTTOSEND);

            expect(await LINKcontract.balanceOf(gersteweintoken.address)).to.be.equal(0);
        });

        it("Should send some random token to the contract and revert because is not the admin", async function () {
            const [owner, admin, anotherUser] = await ethers.getSigners();

            const { gersteweintoken, USDcontract, LINKcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESSandSentLink);

            expect(await LINKcontract.connect(impersonatedRich).transfer(gersteweintoken.address, AMOUNTTOSEND))
                .to.emit(gersteweintoken, "Transfer").withArgs(impersonatedRich.address, gersteweintoken.address, AMOUNTTOSEND);

            expect(await LINKcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOSEND);

            await expect(gersteweintoken.connect(anotherUser).recoverLostToken(LINKTOKEN, AMOUNTTOSEND))
                .to.revertedWith("No sos admin guachin");
        });

    });

    describe("Recover lost USD", async function () {
        it("Should send the same USDcoin and recover the difference with the owner account", async function () {
            const [owner, admin] = await ethers.getSigners();

            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);


            await expect(USDcontract.connect(impersonatedRich).transfer(gersteweintoken.address, LOSTAMOUNT))
                .to.emit(USDcontract, "Transfer").withArgs(RICHADDRESS, gersteweintoken.address, LOSTAMOUNT);

            expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.greaterThan(AMOUNTTOMINT);

            await expect(await gersteweintoken.recoverLostUSD())
                .to.emit(gersteweintoken, "TokenRecovery").withArgs(USDCPOLYGON, LOSTAMOUNT);

            expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOMINT);
        });

        it("Should send the same USDcoin and recover the difference with the admin account", async function () {
            const [owner, admin] = await ethers.getSigners();

            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);


            await expect(USDcontract.connect(impersonatedRich).transfer(gersteweintoken.address, LOSTAMOUNT))
                .to.emit(USDcontract, "Transfer").withArgs(RICHADDRESS, gersteweintoken.address, LOSTAMOUNT);

            expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.greaterThan(AMOUNTTOMINT);

            await expect(await gersteweintoken.connect(admin).recoverLostUSD())
                .to.emit(gersteweintoken, "TokenRecovery").withArgs(USDCPOLYGON, LOSTAMOUNT);

            expect(await USDcontract.balanceOf(gersteweintoken.address)).to.be.equal(AMOUNTTOMINT);
        });

        it("Should send the same USDcoin and revert because is not the admin", async function () {
            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);

            await expect(USDcontract.connect(impersonatedRich).transfer(gersteweintoken.address, LOSTAMOUNT))
                .to.emit(USDcontract, "Transfer").withArgs(RICHADDRESS, gersteweintoken.address, LOSTAMOUNT);

            await expect(gersteweintoken.connect(impersonatedRich).recoverLostUSD())
                .to.revertedWith("No sos admin guachin");
        });

        it("Should mint some usd, swap other, get sent some USDcoin and recover the difference", async function () {
            const [owner, admin] = await ethers.getSigners();

            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);

            expect(await gersteweintoken.connect(impersonatedRich).swapMeSome(AMOUNTOSWAP75))
                .to.emit(gersteweintoken, "SwappedCoins").withArgs(impersonatedRich.address, AMOUNTOSWAP75);

            expect(await USDcontract.connect(impersonatedRich).transfer(gersteweintoken.address, LOSTAMOUNT))
                .to.emit(USDcontract, "Transfer").withArgs(RICHADDRESS, gersteweintoken.address, LOSTAMOUNT);

            await expect(await gersteweintoken.connect(admin).recoverLostUSD())
                .to.emit(gersteweintoken, "TokenRecovery").withArgs(USDCPOLYGON, LOSTAMOUNT);

        });

        it("Should revert because there is no stuck USD in the contract", async function () {
            const { gersteweintoken, USDcontract, impersonatedRich } = await loadFixture(minted100toRICHADDRESS);

            await expect(gersteweintoken.recoverLostUSD()).to.revertedWith("No hay USD atrapado");
        });
    });
});

