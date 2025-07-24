export async function deriveKey(password: string): Promise<CryptoKey> {
	const enc = new TextEncoder();
	const salt = enc.encode("obsidian-encrypted-folder-salt");
	const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);

	return crypto.subtle.deriveKey(
		{
			name: "PBKDF2",
			salt: salt,
			iterations: 100000,
			hash: "SHA-256"
		},
		baseKey,
		{ name: "AES-GCM", length: 256 },
		false,
		["encrypt", "decrypt"]
	);
}

export async function encryptText(text: string, key: CryptoKey): Promise<string> {
	const enc = new TextEncoder();
	const iv = crypto.getRandomValues(new Uint8Array(12));
	const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(text));

	const buffer = new Uint8Array(iv.byteLength + encrypted.byteLength);
	buffer.set(iv, 0);
	buffer.set(new Uint8Array(encrypted), iv.byteLength);

	return btoa(String.fromCharCode(...buffer));
}

export async function decryptText(cipher: string, key: CryptoKey): Promise<string> {
	const raw = Uint8Array.from(atob(cipher), c => c.charCodeAt(0));
	const iv = raw.slice(0, 12);
	const data = raw.slice(12);

	const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, data);
	return new TextDecoder().decode(decrypted);
}
