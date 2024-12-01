import { useWallet } from "@solana/wallet-adapter-react";
import { ModeToggle } from "../toggle";
import { WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";

export default function Navbar() {
    const { connected } = useWallet();

    return (
        <div className="flex justify-center round w-full border-b shadow-sm rounded-md backdrop-filter backdrop-blur-lg opacity-100 ">
            <div className="flex justify-between items-center w-full p-3 bg-gray-50 dark:bg-black">
                <div className=" flex items-center   md:gap-4 md:ml-4 text-white">
                    <div className="h-6 w-6 md:h-10 md:w-10">
                    <img className=" rounded-full" src="https://s3.coinmarketcap.com/static-gravity/image/5cc0b99a8dd84fbfa4e150d84b5531f2.png"/>
                    </div>
                    <h1 className="text-lg md:text-2xl font-bold text-black dark:text-white"><a href="/">LaunchX</a></h1>
                </div>
                <div className="gap-2  md:mr-4 flex md:gap-4 items-center">
                    {connected ? (
                        <WalletDisconnectButton className="custom-disconnect-btn" />
                    ) : (
                        <WalletMultiButton className="custom-connect-btn" />
                    )}
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
