// lib/validators.ts

export function validateSolanaAddress(address: string): boolean {
    // Simple regex for Solana wallet address validation
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressRegex.test(address);
}
