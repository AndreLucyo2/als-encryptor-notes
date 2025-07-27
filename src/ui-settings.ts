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

		// Bloco de alerta para o usuário (fundo amarelo claro)
		const warningBlock = containerEl.createDiv({ cls: "warning-block" });
		warningBlock.setText(`${translation.attention} ${translation.warningBlock}`);

		containerEl.createEl("h1", { text: translation.configTitle });
		containerEl.createEl("p", { text: translation.configDesc });

		// Bloco de instruções sobre criptografia de arquivos
		const fileInfoBlock = containerEl.createDiv({ cls: "file-info-block" });
		fileInfoBlock.setText(translation.fileInfoBlock);

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

		const lineBlock = containerEl.createEl("hr");
		lineBlock.style.marginBottom = "1em";

		// Info block
		const infoBlock = containerEl.createDiv({ cls: "file-info-block" });
		infoBlock.style.marginBottom = "1em";
		infoBlock.setText(translation.infoBlock);

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

		// Footer block
		const footerBlock = containerEl.createDiv({ cls: "footer-block" });
		footerBlock.setText(translation.footer);
	}
}
