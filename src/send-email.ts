export function sendPasswordByMailto(email: string, password: string) {
	const subject = encodeURIComponent("Backup of your Obsidian Secure Notes password");
	const body = encodeURIComponent(
		`Here is the backup of your password for the plugin "Crypto Secure Notes":\n\n${password}\n\nKeep this email in a safe place and delete it as soon as possible.\nNever share your password with others.`);
	window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}
