use anchor_lang::prelude::*;

declare_id!("EVWTGHSsPjDCwnefkvBpcrqPAJvpiYdW9onrK9qNYqwL");

#[program]
pub mod anchor_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
