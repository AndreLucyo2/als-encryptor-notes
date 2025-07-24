import { Plugin, Notice, TFolder } from "obsidian";
import { deriveKey, encryptText, decryptText } from "./crypto-utils";
import { EncryptedFolderSettings } from "./types";
import { EncryptedFolderSettingTab } from "./ui-settings";
import { PromptModal } from "./ui-promptModal";
import { getTranslation, EncryptedFolderTranslation } from "./translations";

const DEFAULT_SETTINGS: EncryptedFolderSettings = {
	folderPath: "",
	backupEmail: "",
};

export default class EncryptedFolderPlugin extends Plugin {
	settings: EncryptedFolderSettings;

	getTranslation(): EncryptedFolderTranslation {
		// Detecta idioma do Obsidian usando vault.getConfig('locale') se disponível
		let obsidianLocale = "en";
		const vaultAny = this.app.vault as unknown as { getConfig?: (key: string) => string };
		if (typeof vaultAny.getConfig === "function") {
			obsidianLocale = vaultAny.getConfig("locale") || "en";
		}
		return getTranslation(obsidianLocale);
	}

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new EncryptedFolderSettingTab(this.app, this));
		const translation = this.getTranslation();
		new Notice(translation.pluginLoaded);

		this.registerEvent(
			this.app.workspace.on("file-menu", (menu, file) => {
				if (!(file instanceof TFolder)) return;

				const configuredFolder = this.settings.folderPath.replace(/\/$/, "");
				const clickedFolder = file.path.replace(/\/$/, "");

				if (configuredFolder !== clickedFolder) return;

				menu.addItem((item) => {
					item.setTitle(this.getTranslation().encryptMenu)
						.setIcon("lock")
						.onClick(async () => {
							const password = await this.promptPassword(this.getTranslation().promptEncrypt);
							if (password) await this.encryptFolder(password);
						});
				});

				menu.addItem((item) => {
					item.setTitle(this.getTranslation().decryptMenu)
						.setIcon("unlock")
						.onClick(async () => {
							const password = await this.promptPassword(this.getTranslation().promptDecrypt);
							if (password) await this.decryptFolder(password);
						});
				});
			})
		);
	}

	async promptPassword(promptText: string): Promise<string | null> {
		return await new Promise((resolve) => {
			const modal = new PromptModal(this.app, promptText, resolve);
			modal.open();
		});
	}

	async encryptFolder(password: string) {
		const translation = this.getTranslation();
		if (!this.settings.folderPath || !password) {
			new Notice(translation.folderOrPasswordMissing);
			return;
		}

		const folder = this.settings.folderPath.replace(/\/$/, "");

		const files = this.app.vault.getMarkdownFiles()
			.filter(file => file.path.startsWith(`${folder}/`));

		if (files.length === 0) {
			new Notice(translation.noMarkdownFound);
			return;
		}

		const key = await deriveKey(password);

		for (const file of files) {
			const content = await this.app.vault.read(file);
			const alreadyEncrypted = content.startsWith("ENCRYPTED::");
			if (alreadyEncrypted) continue;

			const encrypted = await encryptText(content, key);
			const wrapped = `ENCRYPTED::${encrypted}`;
			await this.app.vault.modify(file, wrapped);
		}

		new Notice(translation.encryptSuccess.replace("{count}", files.length.toString()));

		// Enviar backup da senha por email (mailto) se backupEmail estiver preenchido
		if (this.settings.backupEmail) {
			const { sendPasswordByMailto } = await import("./send-email");
			sendPasswordByMailto(this.settings.backupEmail, password);
			new Notice(translation.emailClientOpened);
		}
	}

	async decryptFolder(password: string) {
		const translation = this.getTranslation();
		if (!this.settings.folderPath || !password) {
			new Notice(translation.folderOrPasswordMissing);
			return;
		}

		const folder = this.settings.folderPath.replace(/\/$/, "");

		const files = this.app.vault.getMarkdownFiles()
			.filter(file => file.path.startsWith(`${folder}/`));

		if (files.length === 0) {
			new Notice(translation.noMarkdownFound);
			return;
		}

		const key = await deriveKey(password);

		try {
			for (const file of files) {
				const content = await this.app.vault.read(file);
				if (!content.startsWith("ENCRYPTED::")) continue;

				const encrypted = content.slice("ENCRYPTED::".length);
				const decrypted = await decryptText(encrypted, key);
				await this.app.vault.modify(file, decrypted);
			}

			new Notice(translation.decryptSuccess.replace("{count}", files.length.toString()));
		} catch (err) {
			console.error(err);
			new Notice(translation.decryptError);
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
