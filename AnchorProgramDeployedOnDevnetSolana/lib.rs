use anchor_lang::prelude::*;

declare_id!("aEEs3sYsTisWLNGYcUhiHLRQ7Km1jG8W4R1Qw1BGdGc");

#[program]
pub mod my_payment_contract {
    use super::*;

    pub fn store_payment(
        ctx: Context<StorePayment>,
        repository_id: String,
        transaction_signature: String,
        payment_type: PaymentType,
    ) -> Result<()> {
        let payment_account = &mut ctx.accounts.payment_account;

        payment_account.user_address = *ctx.accounts.user.key;
        payment_account.repository_id = repository_id;
        payment_account.transaction_signature = transaction_signature;
        payment_account.payment_type = payment_type;

        Ok(())
    }

    pub fn fetch_payments(
        ctx: Context<FetchPayments>,
        _repository_id: Option<String>,
        _transaction_signature: Option<String>,
        _payment_type: Option<PaymentType>,
    ) -> Result<Payment> {
        let payment_account = &ctx.accounts.payment_account;

        Ok(payment_account.clone().into_inner())
    }
}

#[derive(Accounts)]
#[instruction(repository_id: String)]
pub struct StorePayment<'info> {
    #[account(
        init,
        payer = user,
        space = Payment::LEN,
        seeds = [b"payment", user.key().as_ref(), repository_id.as_bytes()],
        bump
    )]
    pub payment_account: Account<'info, Payment>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FetchPayments<'info> {
    #[account(mut)]
    pub payment_account: Account<'info, Payment>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Payment {
    pub user_address: Pubkey,
    pub repository_id: String,
    pub transaction_signature: String,
    pub payment_type: PaymentType,
}

#[derive(AnchorDeserialize, AnchorSerialize, Clone, PartialEq)]
pub enum PaymentType {
    Sent,
    Received,
}

impl Payment {
    const LEN: usize = 8 + // discriminator
        32 +  // user_address (32 bytes)
        4 +   // repository_id length
        32 +  // repository_id (max 32 bytes)
        4 +   // transaction_signature length
        32 +  // transaction_signature (max 32 bytes)
        1;    // payment_type enum (Sent or Received)
}
