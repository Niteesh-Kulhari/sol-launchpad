import React, { useEffect, useState } from "react";
import { Label } from "../componenets/label";
import { Input } from "../componenets/input";
import { cn } from "@/lib/utils";
import {
  createInitializeMetadataPointerInstruction,
  createInitializeMintInstruction,
  ExtensionType,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import {
  Keypair,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


export default function SignupFormDemo() {
  const [name, setName] = useState<string>();
  const [symbol, setSymbol] = useState<string>();
  const [imgUrl, setImgUrl] = useState<string>();
  // To be implemented
  //const [initialSupply, setInitialSupply] = useState<string>();
  //const [transactionResult, setTransactionResult] = useState<string | null>(null);
  const [tokens, setTokens] = useState<
  { name: string; symbol: string; imgUrl: string; mintAddress: string; transactionResult: string }[]
>([]);
  const { connection } = useConnection();
  const wallet = useWallet();

  useEffect(() => {
    const storedTokens = localStorage.getItem("tokens");
    if (storedTokens) {
      setTokens(JSON.parse(storedTokens));
    }
  }, []);

  // Save tokens to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }, [tokens]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  async function createToken() {
    if (!wallet.publicKey) {
      console.error("Wallet is not connected.");
      return;
    }
    // This is rent exemption without metadata
    // const lamports = await getMinimumBalanceForRentExemptMint(connection);
    const mintKeypair = Keypair.generate();
    const metadata = {
      mint: mintKeypair.publicKey,
      name: name ?? "",
      symbol: symbol ?? "",
      uri: imgUrl ?? "",
      additionalMetadata: [],
    };

    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;
    //Rent exemption with metadata
    const lamports = await connection.getMinimumBalanceForRentExemption(
       mintLen + metadataLen
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        mintKeypair.publicKey,
        wallet.publicKey,
        mintKeypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMintInstruction(
        mintKeypair.publicKey,
        9,
        wallet.publicKey,
        null,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: mintKeypair.publicKey,
        metadata: mintKeypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
    );


    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(mintKeypair);


    try {
      const txResult = await wallet.sendTransaction(transaction, connection);
      const newToken = {
        name: name || "Unnamed Token",
        symbol: symbol || "N/A",
        imgUrl: imgUrl || "N/A",
        mintAddress: mintKeypair.publicKey.toBase58(),
        transactionResult: txResult,
      };

      setTokens((prevTokens) => [...prevTokens, newToken]);
      console.log("Transaction Result:", txResult);
    } catch (error) {
      console.error("Failed to create token:", error);
    }

    //await sendAndConfirmTransaction(connection, transaction, [payer, mintKeypair], confirmOptions);
  }
  return (
    <div className="max-w-6xl w-full mx-auto mt-14 rounded-none md:rounded-2xl p-4 md:p-8 shadow-input outline outline-offset-1 outline-1 outline-black/20 dark:outline-white/30 bg-white dark:bg-black shadow-sm shadow-cyan-100 dark:shadow-slate-700">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Solana Token Launchpad
      </h2>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Fill the form with relevant iformation to launch your token
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">Token Name</Label>
            <Input
              id="firstname"
              placeholder="Name of your token"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="symbol">Symbol</Label>
          <Input
            id="symbol"
            placeholder="Symbol for your token"
            type="text"
            onChange={(e) => setSymbol(e.target.value)}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="imageurl">Image Url</Label>
          <Input
            id="imageurl"
            placeholder="Your token image url"
            type="text"
            onChange={(e) => setImgUrl(e.target.value)}
          />
        </LabelInputContainer>
        {/* <LabelInputContainer className="mb-8">
          <Label htmlFor="initialSupply">Initial Supply</Label>
          <Input
            id="initialSupply"
            placeholder="Initial supply for your coin"
            type="text"
            onChange={(e) => setInitialSupply(e.target.value)}
          />
        </LabelInputContainer> */}

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          
          onClick={createToken}
        >
          Create Token &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        {/* <div className="flex flex-col space-y-4">
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div> */}
      </form>
      <div className="mt-10">
        <h3 className="font-bold text-lg text-neutral-800 dark:text-neutral-200">Created Tokens</h3>
        <Accordion type="single" collapsible>
          {tokens.map((token, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{token.name || `Token ${index + 1}`}</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  <p>
                    <strong>Symbol:</strong> {token.symbol}
                  </p>
                  <p>
                    <strong>Image URL:</strong>{" "}
                    <a href={token.imgUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                      {token.imgUrl}
                    </a>
                  </p>
                  <p>
                    <strong>Mint Address:</strong> {token.mintAddress}
                  </p>
                  <p>
                    <strong>Transaction Result:</strong>{" "}
                    <a
                      href={`https://explorer.solana.com/tx/${token.transactionResult}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View on Explorer
                    </a>
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
