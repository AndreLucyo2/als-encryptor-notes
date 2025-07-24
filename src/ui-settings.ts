import { App, PluginSettingTab, Setting, Notice } from "obsidian";
import EncryptedFolderPlugin from "./main";
import { sendPasswordByMailto } from "./send-email";
import { getTranslation } from "./translations";

import type { EncryptedFolderTranslation } from "./translations";
export type SupportedLang = "en" | "pt-br" | "pt-BR" | "es";
export type TranslationObject = EncryptedFolderTranslation;

export class EncryptedFolderSettingTab extends PluginSettingTab {
	plugin: EncryptedFolderPlugin;

	constructor(app: App, plugin: EncryptedFolderPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// Detecta idioma do Obsidian usando vault.getConfig('locale') se disponível
		let obsidianLocale = "en";
		const vaultAny = this.app.vault as unknown as { getConfig?: (key: string) => string };
		if (typeof vaultAny.getConfig === "function") {
			obsidianLocale = vaultAny.getConfig("locale") || "en";
		}
		const translation: TranslationObject = getTranslation(obsidianLocale);

		containerEl.createEl("h1", { text: translation.title });

		// Bloco de alerta para o usuário
		const warningBlock = document.createElement("div");
		warningBlock.style.background = "#fff8c6";
		warningBlock.style.border = "1px solid #e0b000";
		warningBlock.style.padding = "1em";
		warningBlock.style.marginBottom = "1em";
		warningBlock.style.borderRadius = "6px";
		warningBlock.innerHTML = `<span style='color:#c00000; font-weight:bold;'>${translation.attention}</span><br><span style='color:#c00000;'>${translation.warningBlock}</span>`;
		containerEl.appendChild(warningBlock);

		containerEl.createEl("h1", { text: translation.configTitle });
		containerEl.createEl("p", { text: translation.configDesc });

		// Bloco de instruções sobre criptografia de arquivos
		const fileInfoBlock = document.createElement("div");
		fileInfoBlock.style.background = "#f7f7e0";
		fileInfoBlock.style.color = "#a08000";
		fileInfoBlock.style.padding = "0.7em";
		fileInfoBlock.style.margin = "0.5em 0 1em 0";
		fileInfoBlock.style.borderRadius = "6px";
		fileInfoBlock.style.fontSize = "0.98em";
		fileInfoBlock.innerHTML = translation.fileInfoBlock;
		containerEl.appendChild(fileInfoBlock);

		new Setting(containerEl)
			.setName(translation.folderPath)
			.setDesc(translation.folderPathDesc)
			.addText(text =>
				text
					.setPlaceholder(translation.folderPathDesc)
					.setValue(this.plugin.settings.folderPath)
					.onChange(async (value) => {
						this.plugin.settings.folderPath = value.trim();
						await this.plugin.saveSettings();
					})
			);

		let password = "";

		new Setting(containerEl)
			.setName(translation.password)
			.setDesc(translation.passwordDesc)
			.addText(text =>
				text
					.setPlaceholder(translation.passwordPlacHol)
					.onChange((value) => {
						password = value.trim();
					})
			);

		new Setting(containerEl)
			.addButton(btn => btn
				.setButtonText(translation.encryptBtn)
				.setCta()
				.onClick(async () => {
					await this.plugin.encryptFolder(password);
				})
			);

		new Setting(containerEl)
			.addButton(btn => btn
				.setButtonText(translation.decryptBtn)
				.onClick(async () => {
					await this.plugin.decryptFolder(password);
				})
			);

		const lineBlock = document.createElement("hr");
		lineBlock.style.marginBottom = "1em";
		containerEl.appendChild(lineBlock);

		const infoBlock = document.createElement("div");
		infoBlock.style.marginBottom = "1em";
		infoBlock.innerHTML = translation.infoBlock;
		containerEl.appendChild(infoBlock);

		new Setting(containerEl)
			.setName(translation.backupEmail)
			.setDesc(translation.backupEmailDesc)
			.addText(text => text
				.setPlaceholder(translation.backupEmailDesc)
				.setValue(this.plugin.settings.backupEmail)
				.onChange(async (value) => {
					this.plugin.settings.backupEmail = value;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName(translation.backupBtn)
			.setDesc(translation.backupBtnDesc)
			.addButton(button => button
				.setButtonText(translation.backupBtn)
				.setCta()
				.onClick(() => {
					const email = this.plugin.settings.backupEmail;
					if (email && password) {
						sendPasswordByMailto(email, password);
						new Notice(translation.backupNotice);
					} else {
						new Notice(translation.backupNoticeError);
					}
				})
			);

		const footerBlock = document.createElement("div");
		footerBlock.style.background = "#222";
		footerBlock.style.color = "#fff";
		footerBlock.style.textAlign = "center";
		footerBlock.style.padding = "1.5em 0 1em 0";
		footerBlock.style.marginTop = "2em";
		footerBlock.style.borderRadius = "8px";
		footerBlock.innerHTML = translation.footer;
		containerEl.appendChild(footerBlock);
	}
}
