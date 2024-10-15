import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import { PublicKey} from '@solana/web3.js'
import {startAnchor} from "solana-bankrun"
import { BankrunProvider } from 'anchor-bankrun'

const IDL = require('../target/idl/votingdapp.json')

const votingAddress = new PublicKey("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

describe('votingdapp', () => {
 
  it('Initialize Votingdapp', async () => {
    const context = await startAnchor("", [{name: "votingdapp", programId: votingAddress}], []);
    const provider = new BankrunProvider(context);
    
    const votingProgram = new Program(IDL, provider);

    await votingProgram.methods.initializePoll(
          new anchor.BN(1), 
          "test", 
          new anchor.BN(1662500000),
          new anchor.BN(1662500000 + 1000),
        ).rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)], votingAddress
    );
    // const poll = await votingProgram.account.poll.fetch(pollAddress);
    console.log(pollAddress.toString());
  })
})
