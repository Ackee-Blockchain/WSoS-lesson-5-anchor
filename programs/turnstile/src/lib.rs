use anchor_lang::prelude::*;

declare_id!("7jfewpZYcNFarCUdbo8owLn25r48NDKy93qiYjMn6pmZ");

// write your business logic here
#[program]
pub mod turnstile {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.locked = true;
        Ok(())
    }

    #[allow(unused_variables)]
    pub fn coin(ctx: Context<UpdateState>, dummy_arg: String) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.locked = false;
        Ok(())
    }

    pub fn push(ctx: Context<UpdateState>) -> Result<()> {
        let state = &mut ctx.accounts.state;
        state.locked = true;
        Ok(())
    }
}

// validate incoming accounts here
#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 1
    )]
    //Account container that checks ownership on deserialization.
    pub state: Account<'info, State>,
    #[account(mut)]
    //Type validating that the account signed the transaction
    pub user: Signer<'info>,
    //Type validating that the account is owned by the system program
    pub system_program: Program<'info, System>,
}

// validate incoming accounts here
#[derive(Accounts)]
pub struct UpdateState<'info> {
    #[account(mut)]
    pub state: Account<'info, State>,
}

#[account]
pub struct State {
    pub locked: bool,
}
