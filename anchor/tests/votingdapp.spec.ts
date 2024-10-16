import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import { PublicKey} from '@solana/web3.js'
import {startAnchor} from "solana-bankrun"
import { BankrunProvider } from 'anchor-bankrun'
import { Votingdapp } from '../target/types/votingdapp'; 

const IDL = require('../target/idl/votingdapp.json')

const votingAddress = new PublicKey("AsjZ3kWAUSQRNt2pZVeJkywhZ6gpLpHZmJjduPmKZDZZ");

describe('votingdapp', () => {
 
    let context, provider, votingProgram;
    beforeAll(async () => {
      context = await startAnchor("", [{name: "votingdapp", programId: votingAddress}], []);
      provider = new BankrunProvider(context);
      votingProgram = new Program<Votingdapp>(IDL, provider);
    });
  it('Initialize Votingdapp', async () => {
    await votingProgram.methods.initializePoll(
          new anchor.BN(1), 
          "test", 
          new anchor.BN(1662500000),
          new anchor.BN(1662500000 + 1000),
        ).rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)], votingAddress
    );
    const poll = await votingProgram.account.poll.fetch(pollAddress);
    console.log(poll);
    expect(poll.pollId.toNumber()).toBe(1);
    expect(poll.description).toBe("test");
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber());
  })

  it('Initialize Candidate', async () => {
    await votingProgram.methods.initializeCandidate(
          new anchor.BN(1), 
          "test", 
        ).rpc();    
    })

  // it('Initialize Vote', async () => {
  //     await votingProgram.methods.initializeCandidate(
  //           new anchor.BN(1), 
  //           "test", 
  //         ).rpc();    
  //     })
})
