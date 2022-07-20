import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram } from "@solana/web3.js";
import { Turnstile } from "../target/types/turnstile";
import { expect } from 'chai';

describe("turnstile", () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Turnstile as Program<Turnstile>;
  const state = anchor.web3.Keypair.generate();
  const user = (program.provider as anchor.AnchorProvider).wallet;

  it("Is initialized!", async () => {

    await program.methods
      .initialize()
      .accounts({
        state: state.publicKey,
        user: user.publicKey,
        systemProgram: SystemProgram.programId,
      })
      .signers([state])
      .rpc();

    let turnstileState = await program.account.state.fetch(state.publicKey);
    expect(turnstileState.locked).to.equal(true);
  });

  it("Coin!", async () => {
    await program.methods
      .coin()
      .accounts({
        state: state.publicKey,
      })
      .signers([])
      .rpc();

    let turnstileState = await program.account.state.fetch(state.publicKey);
    expect(turnstileState.locked).to.equal(false);
  });

  it("Push!", async () => {
    await program.methods
      .push()
      .accounts({
        state: state.publicKey,
      })
      .signers([])
      .rpc();

    let turnstileState = await program.account.state.fetch(state.publicKey);
    expect(turnstileState.locked).to.equal(true);
  });
});
